"use client";

import { Button } from "@atom/button";
import { FieldSet } from "@atom/field";
import { Row } from "@atom/row";
import { Textarea } from "@atom/textarea";
import { useCallback, useEffect, useRef } from "react";

const writePost = async (
  rest: Omit<TBlog, "id" | "content" | "create" | "seq">
) => {
  const param = {
    title: rest.title,
    summary: rest.summary,
    thumbnail: rest.thumbnail,
  };

  await fetch(`/api/blog`, {
    method: "POST",
    body: JSON.stringify(param),
  });

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

  const setFieldValue = useCallback((name: string, value: string) => {
    localStorage.setItem(name, value);
  }, []);
  const getFieldValue = useCallback((name: string) => {
    if (localStorage !== undefined) {
      return localStorage.getItem(name) || "";
    }
    return "";
  }, []);

  useEffect(() => {
    titleRef.current!.value = getFieldValue("title");
    summaryRef.current!.value = getFieldValue("summary");
    thumbnailRef.current!.value = getFieldValue("thumbnail");
  }, [getFieldValue]);

  return (
    <FieldSet fieldTitle={"블로그"} className="w-full items-start">
      <Row className="w-full p-[1rem]">
        <Textarea
          ref={titleRef}
          type="title"
          placeholder="제목을 입력하세요."
          onChange={() => {
            setFieldValue("title", titleRef.current?.value!);
          }}
        />
        <Button
          className="outline outline-1 p-2 w-[70px]"
          tabIndex={-1}
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
          className="text-[1.3rem] break-keep"
          onChange={() => {
            setFieldValue("summary", summaryRef.current?.value!);
          }}
        />
        {/* <Textarea
          ref={descriptionRef}
          type="description"
          placeholder="설명을 입력하세요."
          className="text-[1.3rem]"
          onChange={() => {
            localStorage.setItem("description", descriptionRef.current?.value!);
          }}
        /> */}
        <Textarea
          ref={thumbnailRef}
          type="thumbnail"
          placeholder="썸네일 경로를 입력하세요."
          className="text-[1.3rem]"
          onChange={() => {
            setFieldValue("thumbnail", thumbnailRef.current?.value!);
          }}
        />
      </Row>
    </FieldSet>
  );
}
