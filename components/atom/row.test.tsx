import { fireEvent, render, screen } from "@testing-library/react";
import { MouseEvent } from "react";
import { Row } from "./row";

describe("Row", () => {
  const rowText = "테스트";

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-black");
    e.currentTarget.classList.add("bg-red");
  };

  it("Row as DIV", () => {
    render(<Row>{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("DIV");
  });

  it("Row as SECTION", () => {
    render(<Row as="section">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("SECTION");
  });

  it("Row as ARTICLE", () => {
    render(<Row as="article">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("ARTICLE");
  });

  it("Row as ASIDE", () => {
    render(<Row as="aside">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("ASIDE");
  });

  it("Row as FOOTER", () => {
    render(<Row as="footer">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("FOOTER");
  });

  it("Row as HEADER", () => {
    render(<Row as="header">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("HEADER");
  });

  it("Row as MAIN", () => {
    render(<Row as="main">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("MAIN");
  });

  it("Row as NAV", () => {
    render(<Row as="nav">{rowText}</Row>);
    const row = screen.getByText(rowText);
    expect(row.nodeName).toBe("NAV");
  });

  it("Row Click Color Change", () => {
    render(
      <Row className="bg-black" onClick={handleClick}>
        {rowText}
      </Row>
    );
    const row = screen.getByText(rowText);
    fireEvent.click(row);
    expect(row.classList.value).toContain("bg-red");
  });
});
