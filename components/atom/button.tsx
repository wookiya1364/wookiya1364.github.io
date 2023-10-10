import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: TButton;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, as, ...props }, ref) => {
    const Component = as || "button";
    return (
      <Component className={className} ref={ref} {...props}>
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button };
