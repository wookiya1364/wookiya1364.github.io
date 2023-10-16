import { Row } from "@atom/row";
import { Column } from "@atom/column";
import { findID, getAllPost, pipe } from "@utils/util";
import { FieldSet } from "@atom/field";
import LinkIcon from "public/link";
import TwitterIcon from "public/twitter";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


export const metadata: Metadata = {
  title: "우기's Journal | Post",
  description: "우기's Journal 포스트 입니다.",
};


// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   console.log(params);
//   const allPosts = (await getAllPost()) as unknown as TBlog[];
//   const post = pipe(findID(params))(allPosts) as TBlog;
//   return {
//     title: post?.title,
//     description: post?.description,
//     // metadataBase: new URL(process.env.BLOG_HOST?.toString()!),
//     icons: [post?.thumbnail],
//     openGraph: {
//       images: [post?.thumbnail],
//     },
//   };
// }


// export async function generateStaticParams() {
//   return (await getAllPost()) as unknown as TBlog[];
// }

const ShareSNS = ({ post }: { post?: TBlog }) => {
  return (
    <Row as="div" className="absolute top-[5rem] w-4/5">
      <FieldSet fieldTitle="공유하기" className="w-full border-1">
        <Row className="w-full p-[10px] justify-between">
          <LinkIcon />
          <TwitterIcon title={post?.title || ""} />
        </Row>
      </FieldSet>
    </Row>
  );
};

const AsideIndex = ({ children }: { children: React.ReactNode }) => {
  return (
    <Column
      as="aside"
      className="sticky top-0 bottom-0 left-0 hidden h-screen lg:w-[30%] lg:flex"
    >
      {children}
      <Column className="absolute top-0 right-0 bottom-0"></Column>
    </Column>
  );
};

export default async function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const allPosts = (await getAllPost()) as unknown as TBlog[];
  // const post = pipe(findID(params))(allPosts) as TBlog;
  // console.log(post);

  // console.log(process.env.BLOG_HOST);
  // console.log(post.content);
  // const content = await fetch(`${process.env.BLOG_HOST}${post.content}`).then(
  //   (res) => res.text()
  // );

  // console.log(content);

  return (
    <Column as="main" className="justify-start items-center">
      <Row className="w-full max-w-[1920px]">
        {children}
      </Row>
    </Column>
  );
}
