import { cn } from "components/util/cn";
import React from "react";

export interface ColumnProps
  extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainer;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "div";
    return (
      <Component className={cn("flex flex-col items-center", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Column.displayName = "Column";

export { Column };
