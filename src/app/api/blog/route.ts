// import { getDate } from "@utils/util";
import { getDate } from "@utils/util";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
// const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "force-static";

export async function GET(request: NextRequest) {
  // const paths = `${process.cwd()}/public/posts/blog.json`;
  const paths = `/public/posts/blog.json`;
  const json = await fs.readFile(paths, "utf8");
  return NextResponse.json(JSON.parse(json));
}

const basePaths = `${process.cwd()}/public/posts/`;

const getPostInfo = () => {
  const date = getDate();
  const create = `${date.split("-")[0]}년 ${date.split("-")[1]}월 ${
    date.split("-")[2]
  }일`;

  const result = {
    id: `${Math.random().toString(36).substring(2, 11)}`,
    seq: 0,
    title: "",
    content: "",
    description: "",
    summary: "",
    thumbnail: "/image/2023/10/06/Nextjs-logo.png",
    create,
  };

  return result;
};


export async function POST(request: NextRequest) {
  let read;
  const data = await request.json();
  let postInfo: Record<string, string | number> = getPostInfo();
  const path = `${basePaths}blog.json`;
  
  const date = getDate().split("-");
  const dirPath = `${basePaths}${date[0]}/${date[1]}`;
  const filePath = `${dirPath}/${date[2]}.mdx`;

  for(const key in data) {
    postInfo[key] = data[key];
  }

  postInfo["content"] = filePath.split("public")[1];

  try {
    read = await fs.readFile(path, "utf8");
    const jsonRead = JSON.parse(read);
    postInfo.seq = jsonRead.length;
    jsonRead.push(postInfo);
    if (postInfo.title.toString().trim() !== "") {
      await fs.writeFile(path, JSON.stringify(jsonRead));
    }
  } catch (error) {
    if (postInfo.title.toString().trim() !== "") {
      await fs.writeFile(path, JSON.stringify([postInfo]));
    }
  }

  return NextResponse.json({ json: postInfo });
}

export { dynamic };
