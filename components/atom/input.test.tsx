import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { Input, InputProps } from "./input";

function TestInput(props: InputProps) {
  const [value, setValue] = useState("");
  return <Input defaultValue={value} {...props}></Input>;
}

const setup = (props?: InputProps) => {
  const inputLabel = "input-label";
  const utils = render(<TestInput {...props} />);
  const element: HTMLInputElement = screen.getByLabelText(inputLabel);
  return {
    element,
    ...utils,
  };
};

describe("Input", () => {

  it("Input Change Event", () => {
    const { element } = setup({
      onChange: (e) => {
        element.value = e.currentTarget.value;
      },
    });
    fireEvent.change(element, { target: { value: "change~" } });
    expect(element.value).toBe("change~");
  });
  
});
