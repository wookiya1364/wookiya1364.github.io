import { cn } from "components/util/cn";
import React from "react";

export interface ColumnProps
  extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TContainer;
  label?: string;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, children, as, label, ...props }, ref) => {
    const Component = as || "div";
    const ariaLabel = label || "";
    return (
      <Component
        className={cn("flex flex-col items-center", className)}
        aria-label={ariaLabel}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Column.displayName = "Column";

export { Column };
