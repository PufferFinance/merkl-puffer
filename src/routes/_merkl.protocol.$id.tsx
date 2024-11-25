import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Container } from "dappkit";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const { data: protocol } = await api.v4.protocols({ id: id ?? "" }).get();

  if (!protocol) throw new Error("Unsupported Protocol");

  return json({ protocol });
}

export default function Index() {
  const { protocol } = useLoaderData<typeof loader>();

  return (
    <Container>
      <Heading
        icons={[{ src: protocol?.icon }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={protocol?.name}
        description={"Protocol"}
        tabs={[
          {
            label: "Opportunities",
            link: `/protocol/${protocol.name?.toLowerCase()}`,
          },
        ]}>
        <Outlet />
      </Heading>
    </Container>
  );
}