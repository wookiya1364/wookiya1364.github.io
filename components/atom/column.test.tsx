import { fireEvent, render, screen } from "@testing-library/react";
import { MouseEvent } from "react";
import { Column } from "./column";

describe("Column", () => {
  const columnText = "테스트";

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("Column as DIV", () => {
    render(<Column>{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("DIV");
  });

  it("Column as SECTION", () => {
    render(<Column as="section">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("SECTION");
  });
  
  it("Column as ARTICLE", () => {
    render(<Column as="article">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("ARTICLE");
  });

  it("Column as ASIDE", () => {
    render(<Column as="aside">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("ASIDE");
  });

  it("Column as FOOTER", () => {
    render(<Column as="footer">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("FOOTER");
  });

  it("Column as HEADER", () => {
    render(<Column as="header">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("HEADER");
  });

  it("Column as MAIN", () => {
    render(<Column as="main">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("MAIN");
  });

  it("Column as NAV", () => {
    render(<Column as="nav">{columnText}</Column>);
    const column = screen.getByText(columnText);
    expect(column.nodeName).toBe("NAV");
  });

  it("Column Click Color Change", () => {
    render(
      <Column className="bg-black" onClick={handleClick}>
        {columnText}
      </Column>
    );
    const column = screen.getByText(columnText);
    fireEvent.click(column);
    expect(column.classList.value).toContain("bg-red");
  });
});
