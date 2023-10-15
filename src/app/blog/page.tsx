import { Row } from "@atom/row";
import { Itemlist } from "@molecule/Itemlist";
import Link from "next/link";
import { Column } from "@atom/column";
import PostPage from "./post";
import { getAllPost } from "@utils/util";

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

export default async function Blog() {
  const allPosts = (await getAllPost()) as unknown as TBlog[];

  return (
    <Column as="article">
      {/* <BlogSection /> */}
      <Itemlist
        as="section"
        className="justify-items-center justify-center grid grid-flow-dense gap-y-20 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {allPosts.map((post, idx: number) => {
          return post.seq === 0 ? null : <PostPage key={idx} post={post} />;
        })}
      </Itemlist>
    </Column>
  );
}
