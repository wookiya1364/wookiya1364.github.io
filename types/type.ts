type KeyValue = {
  [key: string]: string | number | boolean | null | undefined;
};

type TDefaultProps = {
  className?: string;
  children?: React.ReactNode;
};

type TContainer =
  | "div"
  | "section"
  | "main"
  | "article"
  | "header"
  | "footer"
  | "aside"
  | "nav";
type TLabel = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
type TButton = "button" | "span";

type TLink = { text: string; href: string };
type TKeyValue = {
  [key: string]: string | number;
};
type TDynamicRoute = {
  params: TID;
};
type TID = {
  id: string;
};
type TBlog = {
  id: string;
  seq: string;
  title: string;
  content: string;
  description?: string;
  summary: string;
  thumbnail: string;
  create: string;
};
