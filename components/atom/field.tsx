import { cn } from "components/util/cn";
import React from "react";

export interface FieldSetProps
  extends React.ObjectHTMLAttributes<HTMLFieldSetElement> {
    fieldTitle: string;
  }

const FieldSet = React.forwardRef<HTMLFieldSetElement, FieldSetProps>(
  ({ className, children, fieldTitle, ...props }, ref) => {
    const Component = "fieldset";
    return (
      <Component
        className={cn("flex flex-col items-center field-container", className)}
        ref={ref}
        {...props}
      >
        <legend className="px-[5px] text-[1rem] font-bold">{fieldTitle}</legend>
        {children}
      </Component>
    );
  }
);
FieldSet.displayName = "FieldSet";

export { FieldSet };
