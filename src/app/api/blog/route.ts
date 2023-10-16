import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";

export async function GET(request: NextRequest) {
  const paths = `${process.cwd()}/public/posts/blog.json`;
  const json = await fs.readFile(paths, "utf8");
  return NextResponse.json(JSON.parse(json));
}
export { dynamic };
