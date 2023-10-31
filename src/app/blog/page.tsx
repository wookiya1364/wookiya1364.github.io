import { Itemlist } from "@molecule/Itemlist";
import { Column } from "@atom/column";
import PostPage from "./post";
import { getBlog } from "@utils/util";
import BlogBanner from "@molecule/banner";

// const BlogSection = () => {
//   const nav = ["react", "next.js"];
//   return (
//     <Row as="aside">
//       {nav.map((i) => (
//         <Link href={i} key={i} scroll={false}>
//           {i}
//         </Link>
//       ))}
//     </Row>
//   );
// };

export default async function Blog() {
  const posts: TBlog[] = await getBlog();

  return (
    <Column as="article">
      <BlogBanner
        title={"IT SECTION"}
        descript={`IT에 관련된 포스트를 작성하는 곳이에요.
주로 Frontend를 다루며,
간단한 주제부터 실무에서 겪은 경험까지 포스팅 될 거에요.`}
        src={"/image/nb.webp"}
      />
      <Itemlist
        as="section"
        className="w-[95%] justify-items-center justify-center grid grid-flow-dense gap-y-20 gap-x-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {posts.map((post, idx: number) => (
          <PostPage key={`${post.seq}_${idx}`} post={post} />
        ))}
      </Itemlist>
    </Column>
  );
}
