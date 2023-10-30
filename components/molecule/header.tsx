"use client";
import { Column } from "@atom/column";
import Modal from "@atom/modal";
import { Row } from "@atom/row";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

let lastScrollY = 0;

const LinkWrapper = ({ links }: { links: TLink[] }) => {
  return links.map((link, idx) => (
    <Link
      key={`${link.text}_${idx}`}
      href={link.href}
      className="flex justify-center w-full ml-[20px] mt-[20px] lg:mt-[0px] border-b text-[3rem] lg:text-[1rem]"
    >
      {link.text}
    </Link>
  ));
};

const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Row
      className={`my-0 mr-0 ml-auto justify-between lg:hidden`}
      onClick={onClick}
    >
      <svg
        className="cursor-pointer field-fill-color"
        width="30px"
        height="30px"
        viewBox="0 0 24 24"
      >
        <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path>
      </svg>
    </Row>
  );
};

export default function Header() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const links: TLink[] = [
    { text: "About", href: "/about" },
    { text: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isVisible = scrollTop < lastScrollY || scrollTop <= 0;
      setIsHeaderVisible(isVisible); // 스크롤이 맨 위에 도달하면 헤더를 보이게 함
      lastScrollY = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <Row
        ref={headerRef}
        as="header"
        className={`
      w-full py-[0.6rem] px-6 overflow-auto border-b-[1px] lg:px-[6rem]
      sticky top-0 bottom-0 left-0 right-0 z-[1] bg-[var(--background-color)]
      header ${isHeaderVisible ? "show" : ""}`}
      >
        <Row>
          <Link href={"/"} className="font-bold text-[2rem]" aria-label="우기's Journal">
            {"우기's Journal"}
          </Link>
        </Row>
        <Row className="my-0 mr-0 ml-auto justify-around hidden lg:flex">
          <LinkWrapper links={links} />
        </Row>
        <MenuButton onClick={toggleSidebar} />
      </Row>

      {sidebarOpen ? (
        <Modal toggleSidebar={toggleSidebar}>
          <Column onClick={toggleSidebar} className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
            <LinkWrapper links={links} />
          </Column>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
