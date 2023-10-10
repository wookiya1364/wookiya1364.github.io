import { Row } from "@atom/row";
import { ItemDate, ItemImage } from "@molecule/Itemlist";
import { blogs } from "@blog/blog";
import { Column } from "@atom/column";
import { HOST, findID, pipe } from "@utils/util";
import { Label } from "@atom/label";
import { FieldSet } from "@atom/field";
import LinkIcon from "public/link";
import TwitterIcon from "public/twitter";
import type { Metadata, ResolvingMetadata } from "next";
import Progress from "@molecule/progress";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = pipe(findID(params))(blogs) as TBlog;

  return {
    title: post.title,
    description: post.description,
    metadataBase: new URL(HOST!.toString()),
    icons: [post.thumbnail],
    openGraph: {
      images: [post.thumbnail],
    },
  };
}

export async function generateStaticParams() {
  return blogs;
}

const ShareSNS = ({post}: {post: TBlog}) => {
  return (
    <Row as="div" className="absolute top-[5rem] w-4/5">
      <FieldSet fieldTitle="공유하기" className="w-full border-1">
        <Row className="w-full p-[10px] justify-between">
          <LinkIcon />
          <TwitterIcon title={post.title}/>
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

export default async function BlogDetail({ params }: TDynamicRoute) {
  const post = pipe(findID(params))(blogs) as TBlog;
  const content = await fetch(`${process.env.BLOG_HOST}${post.content}`).then(res => res.text());
  return (
    <Column as="main" className="justify-start items-start">
      <Progress />
      <Row className="w-full">
        <Column as="article" className="w-full lg:w-[70%] px-12">
          <Label as="h1" className="text-[3rem] font-bold">
            {post.title}
          </Label>
          <ItemDate item={post} className="my-[1rem]" />
          <ItemImage item={post} className="w-4/5" />
          <Column
            className="w-full mt-8 break-keep items-start"
            dangerouslySetInnerHTML={{ __html: content }}
          ></Column>
        </Column>
        <AsideIndex>
          <ShareSNS post={post}/>
        </AsideIndex>
      </Row>
    </Column>
  );
}
