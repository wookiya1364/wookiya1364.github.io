"use client";
import { Button } from "@atom/button";
import { Column } from "@atom/column";
import { Label } from "@atom/label";
import { Row } from "@atom/row";
import { cn } from "components/util/cn";
import Image from "next/image";
import React from "react";

type ItemProps = TDefaultProps & {
  item: TBlog;
};

interface ItemlistProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainer;
}

const Itemlist = React.forwardRef<HTMLDivElement, ItemlistProps>(
  ({ children, as, className, ...props }, ref) => {
    const render = as || "article";
    return (
      <Column
        {...props}
        as={render}
        className={cn("w-full p-[15px]", className)}
        ref={ref}
        role="Itemlist"
        aria-orientation="horizontal"
        aria-label="Itemlist"
      >
        {children}
      </Column>
    );
  }
);

const ItemImage = ({ children, className, item }: ItemProps) => {
  if (item.id === "(...)blog") {
    return null;
  }
  return (
    <Column className={cn("cursor-pointer", className)}>
      <Column
        className={`w-full overflow-hidden min-h-[270px] max-h-[270px] justify-center px-8 bg-white`}
      >
        <Column
          className={`
          w-full h-screen justify-center
          scale-100 transition-all duration-500
          hover:duration-500 hover:ease-linear hover:scale-110 hover:transition-all
          `}
        >
          <Image
            className={cn(`w-auto h-auto max-h-[270px]`)}
            priority={true}
            src={item.thumbnail}
            alt={item.title}
            width={250}
            height={170}
          />
        </Column>
      </Column>
      {children}
    </Column>
  );
};

const ItemDate = ({ item, className }: ItemProps) => {
  return (
    <Row className={cn(`w-full justify-center`, className)}>
      <Image
        src={"/image/calendar.png"}
        className="bg-transparent"
        alt="생성일자"
        width={18}
        height={18}
      ></Image>
      <Label className="mt-[5px] ml-[10px]" as="p">
        {item.create}
      </Label>
    </Row>
  );
};
const ItemDescript = ({ className, item }: ItemProps) => {
  return (
    <Column className={cn("w-full overflow-auto block", className)}>
      <Column className="w-full items-start px-[1rem] border-t-[1px]">
        {/* <Button
          className={cn(
            "w-full overflow-auto bg-lime-400 hover:bg-teal-400 border-y-[1px] rounded-[4px] font-bold text-[1.2rem] text-black",
            className
          )}
        >
          {"들어가기"}
        </Button> */}
        <Label as="h1" className="w-full text-[1.5rem]">
          {item.title}
        </Label>
        <Label className="mt-[10px] break-keep content-color" as="p">
          {item.summary}
        </Label>
      </Column>
      <ItemDate item={item} className="border-t-[1px] content-color" />
    </Column>
  );
};

Itemlist.displayName = "Itemlist";

export { Itemlist, ItemImage, ItemDescript, ItemDate };
