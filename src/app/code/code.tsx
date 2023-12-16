"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Row } from "@atom/row";
import { Column } from "@atom/column";
import useClipBoard from "@utils/useClipboard";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { mentions } from "@uiw/codemirror-extensions-mentions";
import PostDescript from "./descript";
import { macroMention } from "../constants/macros";

type TRehypeRewriteNode = {
  type: string;
  tagName: string;
  children: [];
  properties: {};
};

export default function Code() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isCopy, setCopy] = useClipBoard();

  const updateMarkdown = useCallback((textContent: string) => {
    localStorage.setItem("markdownContent", textContent);
    setMarkdownContent(textContent);
  }, []);

  const handleEditorCreate = (view: EditorView, state: EditorState) => {
    view.dom.addEventListener("beforeinput", (event: InputEvent) => {
      const cursorPos = view.state.selection.main.head;
      const lineText = view.state.doc.lineAt(cursorPos).text;
      if (lineText.match(/^\d+\.$/) && cursorPos === lineText.length) {
        view.dispatch({ changes: { insert: " ", from: cursorPos } });
        event.preventDefault();
      }
    });
  };

  useEffect(() => {
    setMarkdownContent(localStorage.getItem("markdownContent") || "");
  }, [markdownContent]);

  return (
    <Column className="w-full p-5 items-start h-[90vh]">
      <Row className="w-full h-full">
        <Column className="w-1/2 h-[inherit]">
          <PostDescript />
          <CodeMirror
            className="w-full h-[90vh] overflow-auto"
            theme={vscodeDark}
            value={markdownContent}
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
              mentions(macroMention),
            ]}
            onCreateEditor={handleEditorCreate}
            onChange={updateMarkdown}
          />
        </Column>
        <Row className="w-[3%]"></Row>
        <MarkdownPreview
          className="w-[47%] h-[inherit] overflow-auto"
          source={markdownContent}
          rehypeRewrite={(node, index, parent) => {
            const rehypeNode = node as TRehypeRewriteNode;
            const rehypeParent = node as TRehypeRewriteNode;
            if (
              rehypeNode.tagName === "a" &&
              parent &&
              /^h(1|2|3|4|5|6)/.test(rehypeParent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
        />
      </Row>
    </Column>
  );
}
