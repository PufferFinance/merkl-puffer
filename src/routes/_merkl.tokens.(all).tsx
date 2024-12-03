import { Outlet } from "@remix-run/react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "RiCoinFill" }]}
      title={"Tokens"}
      breadcrumbs={[{ link: "/tokens", name: "Tokens" }]}
      description={"Tokens indexed by Merkl"}>
      <Outlet />
    </Hero>
  );
}
