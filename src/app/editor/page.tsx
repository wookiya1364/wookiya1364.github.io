import EditorComponent from "components/editor/page";
import React from "react";

export default function Editor() {
  return (
    <>{process.env.NODE_ENV === "production" ? null : <EditorComponent />}</>
  );
}
