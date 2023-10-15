"use client";

import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function PostContent({content}: {content: string}) {
  return (
    <MarkdownPreview
      className="w-full mt-[100px] !bg-transparent"
      source={content}
    />
  );
}
