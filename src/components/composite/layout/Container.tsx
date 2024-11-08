import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <div className="px-lg mx-auto w-full max-w-[1280px] h-full">{children}</div>;
}
