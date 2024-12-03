import { Outlet } from "@remix-run/react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "Ri24HoursFill" }]}
      title={"Protocols"}
      breadcrumbs={[{ link: "/protocol", name: "Protocols" }]}
      description={"Protocols"}>
      <Outlet />
    </Hero>
  );
}
