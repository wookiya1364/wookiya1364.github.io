import { Row } from "@atom/row";
import { Column } from "@atom/column";

export default async function PostLayout({
  children,
}: Omit<TDefaultProps, "className">) {
  return (
    <Column as="main" className="justify-start items-center">
      <Row className="w-full max-w-[1920px]">{children}</Row>
    </Column>
  );
}
