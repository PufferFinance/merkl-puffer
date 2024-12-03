import { Outlet } from "@remix-run/react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "RiExchange2Line" }]}
      title={"Chains"}
      breadcrumbs={[{ link: "/chains", name: "Chains" }]}
      description={"Chains integrated by Merkl"}>
      <Outlet />
    </Hero>
  );
}
