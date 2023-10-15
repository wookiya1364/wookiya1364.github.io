import { cn } from "components/util/cn";
import React, { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <input className={cn("font-medium", className)} ref={ref} {...props}>
        {children}
      </input>
    );
  }
);

Input.displayName = "Input";

export { Input };
