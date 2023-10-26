"use client";

import { Row } from "@atom/row";
import { Itemlist } from "@molecule/Itemlist";
import Link from "next/link";
import { Column } from "@atom/column";
import PostPage from "./post";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getBlog } from "@utils/util";

const BlogSection = () => {
  const nav = ["react", "next.js"];
  return (
    <Row as="aside">
      {nav.map((i) => (
        <Link href={i} key={i} scroll={false}>
          {i}
        </Link>
      ))}
    </Row>
  );
};

export default function CopyBlog() {
  const searchParams = useSearchParams();
  const id = useMemo(() => {
    return { id: searchParams.get("id") as string };
  }, [searchParams]);
  const [posts, setPosts] = useState<TBlog[]>([]);

  useEffect(() => {
    const initialize = async () => {
      const blog = await getBlog();
      setPosts(blog.sort((a:any, b:any) => parseInt(b.seq) - parseInt(a.seq)));
    };
    initialize();
  }, [id]);

  return (
    <Column as="article">
      {/* <BlogSection /> */}
      <Itemlist
        as="section"
        className="justify-items-center justify-center grid grid-flow-dense gap-y-20 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {posts.map((post, idx: number) => (
          <PostPage key={idx} post={post} />
        ))}
      </Itemlist>
    </Column>
  );
}
