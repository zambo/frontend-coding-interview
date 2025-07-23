import React from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function Container<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Tag = as || "div";
  return (
    <Tag className={cn("max-w-2xl container mx-auto p-4", className)} {...rest}>
      {children}
    </Tag>
  );
}

export { Container };
