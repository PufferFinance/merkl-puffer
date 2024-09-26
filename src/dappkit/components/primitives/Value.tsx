import { mergeClass } from "dappkit/utils/css";
import { Component, Styled } from "dappkit/utils/types";
import { tv } from "tailwind-variants";

export const valueStyles = tv({
  base: "text-main-11 font-default font-normal",
  variants: {
    look: {
      base: "text-main-11",
      soft: "text-main-11",
      bold: "text-secondary-12",
      tint: "text-accent-12",
      hype: "text-accent-11",
    },
    size: {
      xs: "text-xs rounded",
      sm: "text-sm rounded-sm",
      md: "text-md rounded-md",
      lg: "text-lg rounded-lg",
      xl: "text-xl rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
    look: "base",
  },
});

export type ValueProps = Component<Styled<typeof valueStyles>, HTMLDivElement>;

export default function Value({ look, size, value, className, ...props }: ValueProps) {
  return <div className={mergeClass(valueStyles({ size, look }))} {...props} />;
}
