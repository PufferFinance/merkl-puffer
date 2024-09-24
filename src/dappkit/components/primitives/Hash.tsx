import { useMemo } from "react";
import Text, { TextProps } from "./Text";
import { mergeClass } from "dappkit/utils/css";

export type HashProps = Omit<TextProps, "children"> & { format: "full" | "short" | "prefix"; children: string };

export default function Hash({ format, children: hash, className, ...props }: HashProps) {
  const formatted: string = useMemo(() => {
    switch (format) {
      case "prefix":
        return hash.slice(0, 6);
      case "short":
        return `${hash.substring(0, 6)}...${hash.substring(hash.length, hash.length - 4)}`;
      default:
        return hash;
    }
  }, [hash, format]);

  return <Text {...props} className={mergeClass("hover:underline cursor-pointer", className)}>{formatted}</Text>;
}
