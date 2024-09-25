import type { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
  return <div className="px-lg mx-auto max-w-[1280px] h-full">{children}</div>;
}
