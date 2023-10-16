"use client";

import { Row } from "@atom/row";
import { ItemDate, ItemImage } from "@molecule/Itemlist";
import { Column } from "@atom/column";
import { findID, getAllPost, pipe } from "@utils/util";
import { Label } from "@atom/label";
import { FieldSet } from "@atom/field";
import LinkIcon from "public/link";
import TwitterIcon from "public/twitter";
import PostContent from "./post_content";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const ShareSNS = ({ post }: { post: TBlog }) => {
  return (
    <Row as="div" className="absolute top-[5rem] w-4/5">
      <FieldSet fieldTitle="공유하기" className="w-full border-1">
        <Row className="w-full p-[10px] justify-between">
          <LinkIcon />
          <TwitterIcon title={post.title} />
        </Row>
      </FieldSet>
    </Row>
  );
};

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
                <Link key={idx} href={href} className="hover:underline mt-[1rem] text-[1.5rem] break-keep">{item}</Link>
              )
            })
          }
        </Column>
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
      {/* <Column className="absolute top-0 right-0 bottom-0"></Column> */}
    </Column>
  );
};

export default function PostContainer() {
  const searchParams = useSearchParams();
  const id = useMemo(() => {
    return { id: searchParams.get("id") as string };
  }, [searchParams]);

  const [post, setPost] = useState<TBlog>({
    id: "",
    seq: "",
    title: "",
    content: "",
    description: "",
    summary: "",
    thumbnail: "",
    create: "",
  });
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    const host =
      process.env.NODE_ENV === "production"
        ? "https://wookiya1364.github.io/"
        : "http://localhost:3000/";
    const fetchPosts = async () => {
      const posts = await getAllPost();
      const post = pipe(findID(id))(posts) as TBlog;
      const content = await fetch(`${host}${post.content}`).then((res) =>
        res.text()
      );
      setContent(content);
      setPost(post);
    };

    fetchPosts();
  }, [id]);

  return (
    <Fragment>
      <Column as="article" className="w-full lg:w-[70%] px-12">
        <Label as="h1" className="text-[3rem] font-bold">
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
