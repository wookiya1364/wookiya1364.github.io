import { getDate } from "@utils/util";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "force-static";
// const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";
// const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "force-dynamic";
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

/*
export async function GET(request: NextRequest) {
  let read;
  let postInfo: Record<string, string | number> = getPostInfo();
  const { searchParams } = new URL(request.url);

  for (const key of searchParams.keys()) {
    postInfo[key] = searchParams.get(key)!.trim();
  }

  const path = `${basePaths}blog.json`;
  try {
    read = await fs.readFile(path, "utf8");
    const jsonRead = JSON.parse(read);
    postInfo.seq = jsonRead.length;
    jsonRead.push(postInfo);
    // console.log(postInfo)
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
*/

export async function POST(request: NextRequest) {
  const data = await request.json();
  const date = getDate().split("-");
  const dirPath = `${basePaths}${date[0]}/${date[1]}`;
  const filePath = `${dirPath}/${date[2]}.mdx`;
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, data);

  return NextResponse.json({ msg: "success" });
}
export { dynamic };
