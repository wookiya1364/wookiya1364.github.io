import { cn } from "components/util/cn";
import React from "react";

export interface LinkProps extends React.ObjectHTMLAttributes<HTMLDivElement> {
  as?: TLabel;
}

const Link = React.forwardRef<HTMLDivElement, LinkProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "p";
    return (
      <Component className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Link.displayName = "Link";

export { Link };