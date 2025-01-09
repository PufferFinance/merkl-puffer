import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { I18n } from "src/I18n";
import Hero from "src/components/composite/Hero";

export const meta: MetaFunction = () => {
  return [{ title: "Puffer" }];
};

export default function Index() {
  return (
    <Hero
      icons={[{ remix: "RiPlanetFill" }]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={I18n.trad.get.pages.opportunities.title}
      description={I18n.trad.get.pages.opportunities.description}>
      <Outlet />
    </Hero>
  );
}
