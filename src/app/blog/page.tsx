import { Row } from "@atom/row";
import { ItemDescript, ItemImage, Itemlist } from "@molecule/Itemlist";
import Link from "next/link";
import { blogs } from "@blog/blog";
import { Column } from "@atom/column";

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
  return (
    <Column as="article">
      {/* <BlogSection /> */}
      <Itemlist
        as="section"
        className="justify-items-center justify-center grid grid-flow-dense gap-y-20 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {blogs.map((blog, idx: number) =>
          blog.id === "(...)blog" ? null : (
            <Link
              key={idx}
              href={`blog/${blog.id}`}
              className="w-full"
              scroll={false}
            >
              <ItemImage item={blog} className="border-[1px]">
                <ItemDescript item={blog}/>
              </ItemImage>
            </Link>
          )
        )}
      </Itemlist>
    </Column>
  );
}
