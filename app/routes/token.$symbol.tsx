import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const { data: tokens, ...res } = await api.v4.token.get({ query: { symbol } });

  if (!tokens?.length) throw new Error("Unknown token");

  return json({ tokens });
}

export default function Index() {
  const { tokens } = useLoaderData<typeof loader>();
  const token = tokens?.[0];

  return (
    <Page>
      <Heading
        icons={[token?.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={token.name}
        description={"Token"}
        tabs={[{ label: "Opportunities", link: `/token/${token.symbol?.toLowerCase()}` }]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
