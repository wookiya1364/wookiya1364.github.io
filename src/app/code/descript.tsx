"use client";

import { Button } from "@atom/button";
import { FieldSet } from "@atom/field";
import { Row } from "@atom/row";
import { Textarea } from "@atom/textarea";
import useClipBoard from "@utils/useClipboard";
import { useRef } from "react";

const writePost = async (rest: Omit<TBlog, "id" | "content" | "create" | "seq">) => {
  await fetch(
    `/api/code?title=${rest.title}
    &summary=${rest.summary}
    &description=${rest.description}
    &thumbnail=${rest.thumbnail}`,
    {
      method: "GET",
    }
  );

  await fetch(`/api/code`, {
    method: "POST",
    body: JSON.stringify(localStorage.getItem("markdownContent")),
  });
};

export default function PostDescript() {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const thumbnailRef = useRef<HTMLTextAreaElement>(null);
  const [isCopy, setCopy] = useClipBoard();

  return (
    <FieldSet fieldTitle={"블로그"} className="w-full items-start">
      <Row className="w-full p-[1rem]">
        <Textarea
          ref={titleRef}
          type="title"
          placeholder="제목을 입력하세요."
          onChange={() => {
            localStorage.setItem("title", titleRef.current?.value!);
          }}
        />
        <Button
          className="outline outline-1 p-2 w-[70px]"
          onClick={async () => {
            const param = {
              title: titleRef.current?.value!,
              summary: summaryRef.current?.value!,
              description: descriptionRef.current?.value!,
              thumbnail: thumbnailRef.current?.value!,
            };
            await writePost(param);
          }}
        >
          등록
        </Button>
      </Row>
      <Row className="w-full mb-[20px] border-b-[0.7rem]" />
      <Row className="w-full">
        <Textarea
          ref={summaryRef}
          type="summary"
          placeholder="요약을 입력하세요."
          className="text-[1.3rem]"
          onChange={() => {
            localStorage.setItem("summary", summaryRef.current?.value!);
          }}
        />
        <Textarea
          ref={descriptionRef}
          type="description"
          placeholder="설명을 입력하세요."
          className="text-[1.3rem]"
          onChange={() => {
            localStorage.setItem("description", descriptionRef.current?.value!);
          }}
        />
        <Textarea
          ref={thumbnailRef}
          type="thumbnail"
          placeholder="썸네일 경로를 입력하세요."
          className="text-[1.3rem]"
          onChange={() => {
            localStorage.setItem("thumbnail", thumbnailRef.current?.value!);
          }}
        />
      </Row>
    </FieldSet>
  );
}
