"use client";

import { Row } from "@atom/row";
import { Itemlist } from "@molecule/Itemlist";
import Link from "next/link";
import { Column } from "@atom/column";
import PostPage from "./post";
import { getAllPost } from "@utils/util";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

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

export default function Blog() {
  const searchParams = useSearchParams();
  const id = useMemo(() => {
    return { id: searchParams.get("id") as string };
  }, [searchParams]);
  const [posts, setPosts] = useState<TBlog[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPost();
      posts.sort((a, b) => parseInt(b.seq) - parseInt(a.seq))
      setPosts(posts);
    };

    fetchPosts();
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
