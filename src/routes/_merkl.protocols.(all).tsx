import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Hero from "src/components/composite/Hero";

export const meta: MetaFunction = () => {
  return [{ title: "Protocols on Merkl" }];
};

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "RiContactsBook2Line" }]}
      title={"Protocols"}
      breadcrumbs={[{ link: "/protocols", name: "Protocols" }]}
      description={"Protocols integrated by Merkl"}>
      <Outlet />
    </Hero>
  );
}
