import React from "react";
import Code from "./code";

export default function CodePage() {
  return (
    <>{process.env.NODE_ENV === "production" ? null : <Code />}</>
  );
}
