import { Column } from "@atom/column";
import { Label } from "@atom/label";
import Image from "next/image";
import { Fragment } from "react";

type TBanner = {
  title?: string;
  descript?: string;
  src: string;
};

export default function BlogBanner({ title, descript, src }: TBanner) {
  return (
    <Fragment>
      <Column
        as="section"
        className="relative w-full h-full max-w-[1380px] overflow-hidden"
      >
        <Column className="absolute bg-black w-full h-[inherit] z-[1] opacity-50" />
        <Column className="absolute w-full h-full">
          <Label
            as="h1"
            className="absolute top-[20%] left-[10%] w-full text-[7vw] md:text-[7vw] xl:text-[5vw] text-white z-[2] pt-3 px-6 select-none"
          >
            {title}
          </Label>
          <Label
            as="p"
            className="absolute top-[45%] left-[10%] w-full text-[2.5vw] md:text-[2vw] xl:text-[1.2vw] text-white z-[2] pt-3 px-6 select-none whitespace-pre-wrap"
          >
            {descript}
          </Label>
        </Column>
        <Image
          src={src}
          alt="notebook"
          sizes="100vw"
          quality={100}
          fill={true}
          className="!relative object-fill"
          priority={true}
        />
      </Column>
    </Fragment>
  );
}
