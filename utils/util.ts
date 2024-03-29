import { toast } from "react-toastify";

/**
 * pipe 함수, 함수를 체이닝하고 결과를 출력한다.
 * @param fns
 * @returns
 */
const pipe = <T, U extends T>(...functions: ((arg: T) => U)[]) => {
  return (result: U) => {
    for (const func of functions) {
      result = func(result);
    }
    return result as U;
  };
};

const findID = (params: TID): TBlog[] | any => {
  return (args: TBlog[]) => {
    return args.find((i) => i.id === params.id);
  };
};

const commaFunc = (item: number | string) => {
  return `${item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const toastSuccess = (msg: string) => {
  toast.success(msg, {
    autoClose: 1500,
  });
};

const shareTwitter = (text: string, url: string) => {
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
};

const shareFacebook = (text: string, url: string) => {
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
};

const validateEmptyKeys = (obj: KeyValue) => {
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
      return false;
    }
  }
  return true;
};

const getDate = () => `${new Date().toISOString().split("T")[0]}`;

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://wookiya1364.github.io/"
    : "http://localhost:3000/";

async function getBlog(): Promise<TBlog[]> {
  const url = `${HOST}posts/blog.json`;
  return await fetch(url, {
    method: "GET",
    // cache: "force-cache",
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .then((res) =>
      res.sort((a: any, b: any) => parseInt(b.seq) - parseInt(a.seq))
    );
}

async function getPost(param: any) {
  const blog: TBlog[] = await getBlog();
  const targetPost = blog.find((item) => item.seq == "0");
  const segment =
    param?.props?.childProp?.segment?.split("?")[1] ||
    JSON.stringify(targetPost);
  const childID = JSON.parse(segment);
  const post = pipe(findID(childID))(blog) as TBlog;
  const content = await fetch(`${HOST}${post.content}`, {
    method: "GET",
    next: { revalidate: 10 },
  }).then((res) => res.text());
  return content;
}

// async function getAllPost(): Promise<TBlog[]> {
//   const url = `${HOST}api/blog`;
//   console.log(url);
//   const result = await fetch(url, {
//     method: "GET",
//     cache: "force-cache",
//   }).then((res) => res.json());
//   return result;
// }

export {
  pipe,
  commaFunc,
  findID,
  toastSuccess,
  shareTwitter,
  shareFacebook,
  validateEmptyKeys,
  getBlog,
  getPost,
  // getAllPost,
  getDate,
  HOST,
};
