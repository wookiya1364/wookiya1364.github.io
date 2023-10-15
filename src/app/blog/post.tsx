import { ItemDescript, ItemImage } from "@molecule/Itemlist";
import Link from "next/link";

type TPost = { post: TBlog };
export default function PostPage({ post }: TPost) {
  return (
    <Link href={`blog/${post.id}`} className="w-full" scroll={false}>
      <ItemImage item={post} className="border-[1px]">
        <ItemDescript item={post} />
      </ItemImage>
    </Link>
  );
}
