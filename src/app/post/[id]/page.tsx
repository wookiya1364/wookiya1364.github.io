import { Row } from "@atom/row";
import { Column } from "@atom/column";
import { FieldSet } from "@atom/field";
import LinkIcon from "public/link";
import TwitterIcon from "public/twitter";
import type { Metadata, ResolvingMetadata } from "next";
import { HOST, findID, getBlog, getPost, pipe } from "@utils/util";
import { Label } from "@atom/label";
import { ItemDate, ItemImage } from "@molecule/Itemlist";
import { Fragment } from "react";
import PostContent from "../post_content";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const posts = await getBlog();
  const post = posts.find(item => item.id == params.id);

  return {
    title: post?.title,
    description: post?.description,
    metadataBase: new URL(HOST),
    icons: [post?.thumbnail!],
    openGraph: {
      images: [post?.thumbnail!],
    },
  };
}

export async function generateStaticParams() {
  const blog = await getBlog();
  return blog;
}

const IndexViewer = ({ content }: { content: string }) => {
  const pattern = /\[.*?\]\(#\S+\)/g;
  const matches = content.match(pattern);

  return (
    <Row as="div" className="absolute top-[15rem] w-4/5">
      <FieldSet fieldTitle="목차" className="w-full border-1">
        <Column className="w-full p-[10px] justify-between items-start">
          {
            matches?.map((item,idx) => {
              item = item.replaceAll("(", "").replaceAll(")", "");
              const href = item.split("]")[1];
              item = item.split("]")[0].replaceAll("[", "");
              
              return (
                <Link key={`${idx}${Math.random()}`} href={href} className="hover:underline mt-[1rem] text-[1.5rem] break-keep">{item}</Link>
              )
            })
          }
        </Column>
      </FieldSet>
    </Row>
  );
};

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

type TParams = {
  params: {id: string}
}
export default async function PostContainer({params} : TParams) {
  const blog = await getBlog();
  const post = pipe(findID(params))(blog) as TBlog;
  const content = await fetch(`${HOST}${post.content}`).then((res) =>
    res.text()
  );

  return (
    <Fragment>
      <Column as="article" className="w-full lg:w-[70%] px-12">
        <Label as="h1" className="text-[3rem] font-bold" aria-label={post.title}>
          {post.title}
        </Label>
        <ItemDate item={post} className="my-[1rem]" />
        <ItemImage item={post} className="w-4/5" />
        <PostContent content={content} />
      </Column>
      <AsideIndex>
        <ShareSNS post={post} />
        <IndexViewer content={content} />
      </AsideIndex>
    </Fragment>
  );
}