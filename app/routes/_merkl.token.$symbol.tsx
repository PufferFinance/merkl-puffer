import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Container } from "dappkit";
import { useMemo } from "react";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";
import Tag, { type TagType } from "src/components/element/Tag";
import config from "../../merkl.config";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const { data: tokens, ...res } = await api.v4.token.get({ query: { symbol } });
  const { data: chains } = await api.v4.chain.get({ query: {} });

  if (!tokens?.length) throw new Error("Unknown token");

  return json({ tokens, chains });
}

export default function Index() {
  const { tokens, chains } = useLoaderData<typeof loader>();
  const token = tokens?.[0];

  const tags = useMemo(() => {
    return tokens.map(
      t =>
        ({
          type: "tokenChain",
          value: { ...t, chain: chains?.find(c => c.id === t.chainId) },
        }) satisfies TagType<"tokenChain">,
    );
  }, [tokens, chains]);

  return (
    <Container>
      <Heading
        icons={[{ src: tokens.find(t => t.icon && t.icon !== "")?.icon }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={
          <>
            {token.name}{" "}
            <span className="font-mono text-main-8">({token.symbol})</span>
          </>
        }
        description={`Deposit or earn ${token.symbol} on ${config.appName}.`}
        tabs={[
          {
            label: "Opportunities",
            link: `/token/${token.symbol?.toLowerCase()}`,
          },
        ]}
        tags={tags.map(tag => (
          <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
        ))}>
        <Outlet />
      </Heading>
    </Container>
  );
}
