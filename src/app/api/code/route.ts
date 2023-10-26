import { getDate } from "@utils/util";
import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

// const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "force-static";
const basePaths = `${process.cwd()}/public/posts/`;

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
