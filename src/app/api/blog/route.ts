import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";

export async function GET(request: NextRequest) {
  console.log(request);
  console.log("paths");
  const paths = `${process.cwd()}/public/posts/blog.json`;
  console.log(paths);
  const json = await fs.readFile(paths, "utf8");
  console.log("json");
  console.log(json);
  // return NextResponse.json(json);
  // return NextResponse.json(JSON.stringify(json));
  return NextResponse.json(JSON.parse(json));
}
export { dynamic };
