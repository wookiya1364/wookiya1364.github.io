import { cn } from "components/util/cn";
import React from "react";

export interface RowProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainer;
  label?: string;
}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, children, as, label, ...props }, ref) => {
    const Component = as || "div";
    const ariaLabel = label || "";
    return (
      <Component
        className={cn("flex flex-row items-center", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Row.displayName = "Row";

export { Row };
