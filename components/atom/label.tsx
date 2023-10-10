import { cn } from "components/util/cn";
import React from "react";

export interface LabelProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TLabel;
}

const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "p";
    return (
      <Component className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Label.displayName = "Label";

export { Label };
