import type { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="px-[2rem] md:px-[3rem] lg:px-[4rem] xl:px-[5rem] w-full max-w-[1650px]">
      {children}
    </div>
  );
}
