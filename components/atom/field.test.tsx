import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./button";
import { MouseEvent } from "react";
import { FieldSet } from "./field";

describe("Button", () => {
  const fieldSetTitle = "필드타이틀";
  const fieldSetButtonText = "버튼";

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("FieldSet Rendering", () => {
    render(<FieldSet label="fieldset" fieldTitle={fieldSetTitle}></FieldSet>);
    const fieldSet = screen.getByLabelText("fieldset");
    expect(fieldSet.textContent).toBe(fieldSetTitle);
  });

  it("FieldSet in Button Rendering", () => {
    render(
      <FieldSet label="fieldset" fieldTitle={fieldSetTitle}>
        <Button>{fieldSetButtonText}</Button>
      </FieldSet>
    );
    const fieldSet = screen.getByLabelText("fieldset");
    const button = [...fieldSet.children].find(i => i.nodeName === "BUTTON");
    expect(button?.textContent).toBe(fieldSetButtonText);
  });

  it("FieldSet in Button Click for Color Change", () => {
    render(
      <FieldSet label="fieldset" fieldTitle={fieldSetTitle}>
        <Button onClick={handleClick} color="bg-black">
          {fieldSetButtonText}</Button>
      </FieldSet>
    );
    const button = screen.getByText(fieldSetButtonText);
    fireEvent.click(button);
    expect(button.classList.value).toContain("bg-red");
  });
});
