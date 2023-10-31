"use client";

import { ItemDescript, ItemImage } from "@molecule/Itemlist";
import Link from "next/link";

type TPost = { post: TBlog };
export default function PostPage({ post }: TPost) {
  return (
    <Link
      href={`post/${post.id}`}
      onClick={() => {
        localStorage.setItem("blogID", post?.id)!;
      }}
      className="w-full h-full"
      scroll={false}
    >
      <ItemImage item={post} className="h-full border-[1px]">
        <ItemDescript item={post} />
      </ItemImage>
    </Link>
  );
}
