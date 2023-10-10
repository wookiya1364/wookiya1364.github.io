"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { Column } from "./column";

export default function Modal({
  toggleSidebar,
  children,
}: {
  toggleSidebar: any;
  children: React.ReactNode;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef(null);

  const onDismiss = useCallback(() => {
    toggleSidebar((prev: boolean) => !prev);
  }, [toggleSidebar]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onKeyDown]);

  return (
    <Column
      as="section"
      ref={overlay}
      className="fixed overflow-auto z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 backdrop-blur"
      onClick={onClick}
    >
      <Column
        ref={wrapper}
        className="absolute items-end w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6"
      >
        {children}
      </Column>
    </Column>
  );
}
