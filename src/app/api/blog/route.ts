import { promises as fs } from "fs";
const dynamic = process.env.NODE_ENV === "production" ? "force-static" : "auto";

export async function GET(request: Request) {
  const paths = `${process.cwd()}/public/posts/blog.json`;
  const json = await fs.readFile(paths, "utf8");
  return Response.json(JSON.parse(json));
}
export { dynamic };
