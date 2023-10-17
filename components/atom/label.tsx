import { cn } from "components/util/cn";
import React from "react";

export interface LabelProps extends React.ObjectHTMLAttributes<HTMLParagraphElement> {
  as?: TLabel;
  label?: string;
}

const Label = React.forwardRef<HTMLParagraphElement, LabelProps>(
  ({ className, children, as, label, ...props }, ref) => {
    const Component = as || "p";
    const ariaLabel = label || "label-label";
    return (
      <Component className={cn("font-medium", className)} aria-label={ariaLabel} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Label.displayName = "Label";

export { Label };
