import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { ProtocolService } from "src/api/services/protocol.service";
import Hero from "src/components/composite/Hero";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const protocol = await ProtocolService.get({ id: id ?? "" });

  return json({ protocol });
}

export default function Index() {
  const { protocol } = useLoaderData<typeof loader>();

  return (
    <Hero
      icons={[{ src: protocol?.icon }]}
      title={protocol?.name}
      breadcrumbs={[
        { link: "/protocol", name: "Protocols" },
        { link: `/protocol/${protocol.name}`, name: protocol.name },
      ]}
      description={"Protocol"}
      tabs={[
        {
          label: "Opportunities",
          link: `/protocol/${protocol.name?.toLowerCase()}`,
        },
      ]}>
      <Outlet />
    </Hero>
  );
}
