"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/markdown.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/css/plugins/code_view.min.css";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import { Row } from "@atom/row";
import { Column } from "@atom/column";
import { Button } from "@atom/button";
import useClipBoard from "@utils/useClipboard";
import { HOST, toastSuccess } from "@utils/util";
import { Label } from "@atom/label";
import { blogs } from "@blog/blog";

export default function EditorComponent() {
  const editorRef = useRef(null);
  const [model, setModel] = useState("");
  const [isCopy, setCopy] = useClipBoard();
  const [blogId, setBlogId] = useState<string>("");

  const handleClickCopy = useCallback(() => {
    const parser = new DOMParser();
    const content = blogs.find((blog) => blog.id === blogId);

    // // 정규표현식 패턴
    const indexRegexPattern =
      /<li[^>]*><strong[^>]*><span style="font-size: 30px;">(.*?)<\/span><\/strong><\/li>/gi;
    const indexReplace =
      '<li><strong><a href="#$1" style="font-size: 30px; background-color: tomato; color: white;">$1</a></strong></li>';

    const regex =
      /<ul\s+style="list-style-type:\s*circle;"><li><strong><a[^>]*>(.*?)<\/a><\/strong><\/li><\/ul>/gi;
    const regexReplace = `<ul style="list-style-type: circle;"><li><span id="$1" style="font-size: 30px; background-color: tomato; color: white;">$1</span></li></ul>`;

    const copyedPost =
      localStorage
        .getItem("saveHTML")
        ?.replaceAll(indexRegexPattern, indexReplace)
        ?.replaceAll(regex, regexReplace) || "";

    const doc = parser.parseFromString(copyedPost, "text/html");
    const imgList = doc.querySelectorAll("img");
    imgList.forEach((img, idx) => {
      img.src = `${location.origin}/${content?.src[idx]!}`;
    });

    setCopy(doc.body.innerHTML);
    toastSuccess("블로그 내용을 복사했어요.");
  }, [blogId, setCopy]);

  useEffect(() => {
    const content = blogs.find((blog) => blog.id === blogId);
    document.querySelectorAll("img").forEach((img, idx) => {
      img.src = `${location.origin}/${content?.src[idx]!}`;
    });
    localStorage.getItem("saveHTML")
      ? setModel(localStorage.getItem("saveHTML")!)
      : null;
  }, [blogId]);

  return (
    <Column>
      <Row className="w-full justify-center bg-[var(--background-color)]">
        <input
        className="text-black"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setBlogId(e.currentTarget.value);
            }
          }}
          placeholder="blog id를 입력해주세요"
        ></input>
        <Button onClick={handleClickCopy}>
          <Label className="outline outline-1 p-5">복사하기</Label>
        </Button>
      </Row>
      <Row id="editor" ref={editorRef} className="w-full px-12">
        <FroalaEditor
          tag="textarea"
          model={model}
          onModelChange={(e: string) => setModel(e)}
          config={{
            events: {
              function() {},
              "save.before": function (html: string) {
                localStorage.setItem("saveHTML", html);
              },
            },
          }}
        />
      </Row>
    </Column>
  );
}
