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

const getDate = () => `${new Date().toISOString().split("T")[0]}`;

const HOST = process.env.BLOG_HOST;

async function getAllPost(): Promise<TBlog[]> {
  const host = process.env.NODE_ENV === "production" ? "https://wookiya1364.github.io/" : "http://localhost:3000/";
  console.log("\n");
  console.log(host)
  const url = `${host}api/blog`;
  console.log(url);
  const result = await fetch(url, {
    method: "GET",
    cache: "force-cache"
  }).then((res) => res.json());
  debugger;
  // .then((res) => res.json());
  console.log("result")
  console.log(result)
  return result;
}

export {
  pipe,
  commaFunc,
  findID,
  toastSuccess,
  shareTwitter,
  shareFacebook,
  getAllPost,
  getDate,
  HOST,
};
