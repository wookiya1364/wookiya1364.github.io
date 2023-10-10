import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Wooki",
  description: "개인 블로그 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
