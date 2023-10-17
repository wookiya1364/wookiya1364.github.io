import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";
import { MouseEvent } from "react";
import { FieldSet, FieldSetProps } from "./field";
import React from "react";

const defaultTitle = "필드타이틀";
const defaultButtonText = "버튼";

const getButton = (element: HTMLFieldSetElement) =>
  [...element.children].find(
    (i) => i.nodeName === "BUTTON"
  ) as HTMLButtonElement;

function TestFieldSet(props: FieldSetProps) {
  return <FieldSet {...props}>{props.children}</FieldSet>;
}

const setup = (props?: FieldSetProps) => {
  const fieldSetTitle = props?.fieldTitle || defaultTitle;
  const ariaLabel = props?.label || "fieldset";
  const utils = render(
    <TestFieldSet fieldTitle={fieldSetTitle} aria-label={ariaLabel} {...props}>
      {props?.children}
    </TestFieldSet>
  );
  const element: HTMLFieldSetElement = screen.getByLabelText(ariaLabel);
  return {
    element,
    ...utils,
  };
};

describe("FieldSet Rendering", () => {
  it("find title", () => {
    const { element } = setup();
    expect(element.textContent).toBe(defaultTitle);
  });

  it("children Rendering", () => {
    const { element } = setup({
      children: <Button>{defaultButtonText}</Button>,
    });
    expect(getButton(element).textContent).toBe(defaultButtonText);
  });
});

describe("FieldSet Event", () => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("children[Button] Click for Color Change", () => {
    const { element } = setup({
      children: <Button onClick={handleClick} className="bg-black"></Button>,
    });
    const button = getButton(element);
    fireEvent.click(button);
    expect(button.classList.value).toContain("bg-red");
  });
});
