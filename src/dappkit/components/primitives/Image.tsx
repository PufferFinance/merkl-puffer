import * as Avatar from "@radix-ui/react-avatar";
import { mergeClass } from "../../utils/css";
import type { Component } from "../../utils/types";

export type ImageProps = Component<
  {
    fallback?: string;
  },
  HTMLImageElement
>;

export default function Image({ fallback, className, ...props }: ImageProps) {
  return (
    <Avatar.Root className={mergeClass(className)}>
      <Avatar.Image {...props} style={{...props.style, width: "100%", height: "100%"}} />
      <Avatar.Fallback className="bg-main-10 h-full w-full text-auto justify-center flex items-center rounded-md p-sm" delayMs={100}>
        {fallback}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
