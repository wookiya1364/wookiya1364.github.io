import { Column } from "@atom/column";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "우기's Journal | Blog",
  description: "우기's Journal 깃허브 블로그 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column>
      {children}
    </Column>
  );
}
