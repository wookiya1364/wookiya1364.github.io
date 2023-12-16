type Macro = {
  displayLabel: string;
  label: string;
  apply: string;
};

export const macroMention: Macro[] = [
  {
    displayLabel: "개행",
    label: `@개행`,
    apply: `<br/>`,
  },
  {
    displayLabel: "문단 전환",
    label: `@문단전환`,
    apply: `<br/><br/><br/>`,
  },
  {
    displayLabel: "목차",
    label: `@목차`,
    apply: `[목차](#id)
# id`,
  },
  {
    displayLabel: "목차ID",
    label: "@목차ID",
    apply: `<span id=""></span>`,
  },
  {
    displayLabel: "컬러강조",
    label: "@컬러강조",
    apply: `<span style="color:white; background-color:green; padding: 0px 5px; border-radius:100px;"></span>`,
  },
  {
    displayLabel: "코드주석",
    label: `@코드주석`,
    apply: `\`\`\`jsx showLineNumbers
\`\`\``,
  },
  {
    displayLabel: "테이블",
    label: "@테이블",
    apply: `|||
|---|---|
|||`,
  },
  {
    displayLabel: "링크",
    label: "@링크",
    apply: `[](url)`,
  },
  {
    displayLabel: "인용 또는 notice",
    label: "@인용",
    apply: `>`,
  },
];
