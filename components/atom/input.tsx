import { cn } from "components/util/cn";
import React, { HTMLProps } from "react";

export interface InputProps extends React.ObjectHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, label, ...props }, ref) => {
    const ariaLabel = label || "input-label";
    return (
      <input
        className={cn("font-medium", className)}
        aria-label={ariaLabel}
        ref={ref}
        {...props}
      >
        {children}
      </input>
    );
  }
);

Input.displayName = "Input";

export { Input };
