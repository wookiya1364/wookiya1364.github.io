import Header from "@molecule/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Wooki",
  description: "개인 블로그 입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
