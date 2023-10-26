import { getDate } from "@utils/util";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

// const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "force-static";
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
  const data = await request.json();
  console.log(data);
  // const date = getDate().split("-");
  // const dirPath = `${basePaths}${date[0]}/${date[1]}`;
  // const filePath = `${dirPath}/${date[2]}.mdx`;
  // await fs.mkdir(dirPath, { recursive: true });
  // await fs.writeFile(filePath, data);

  return NextResponse.json({ msg: "success" });
}
export { dynamic };
