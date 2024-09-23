import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
	return <div className="mx-auto max-w-[1280px]">{children}</div>;
}
