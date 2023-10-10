"use client";

import { Row } from "@atom/row";
import React, { useEffect, useRef, useState } from "react";

// let progress: HTMLDivElement | undefined;

// const rAF = (e:any) => {
//     console.log(e);
//   if (progress === undefined) {
//     const element: HTMLDivElement = document.querySelector(".bg-orange-400")!;
//     progress = element;
// }

// let size = parseInt(progress.style.width) + 1;
//   progress.style.width = `${size}px`;
//   const uid = requestAnimationFrame(rAF);
//   if (size > 1000) {
//     cancelAnimationFrame(uid);
//   }
// };

export default function Progress() {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const options = {
        root: null, // viewport를 기준으로 Intersection을 계산합니다.
        rootMargin: '0px', // 추가 여백 없음
        threshold: 0.5, // 요소의 50%가 화면 안에 들어올 때 콜백 실행
      };
  
      const handleIntersect = (entries: any[]) => {
        entries.forEach((entry: { isIntersecting: any; intersectionRatio: number; }) => {
          // 화면 안에 들어온 경우
          console.log(entry)
          if (entry.isIntersecting) {
            setProgress(entry.intersectionRatio * 100);
          }
        });
      };
  
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(progressRef.current!);
  
      return () => {
        observer.disconnect(); // 컴포넌트가 언마운트될 때 옵저버 해제
      };
  }, []);
  return (
    <Row
      className="sticky top-[4.3rem] bottom-0 left-0 right-0 h-[2px] bg-orange-400"
      style={{ width: "0px" }}
    >
      <progress ref={progressRef} max={1}/>
    </Row>
  );
}
