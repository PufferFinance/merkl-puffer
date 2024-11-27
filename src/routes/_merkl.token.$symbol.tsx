import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Container } from "dappkit";
import { useMemo } from "react";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";
import Tag, { type TagType } from "src/components/element/Tag";
import { chainIdOrder } from "src/constants/chain";
import config from "../../merkl.config";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const { data: tokens } = await api.v4.tokens.index.get({ query: { symbol } });
  const { data: chains } = await api.v4.chains.index.get({ query: {} });

  if (!tokens?.length) throw new Error("Unknown token");

  return json({ tokens, chains });
}

export default function Index() {
  const { tokens, chains } = useLoaderData<typeof loader>();
  const token = tokens?.[0];

  const tags = useMemo(() => {
    return tokens
      .sort(({ chainId: a }, { chainId: b }) => {
        const order = chainIdOrder;

        if (order.indexOf(b) === -1) return -1;
        if (order.indexOf(b) === -1 && order.indexOf(a) === -1) return 0;
        if (order.indexOf(a) === -1) return 1;
        return order.indexOf(b) - order.indexOf(a);
      })
      .map(
        (t) =>
          ({
            type: "tokenChain",
            value: { ...t, chain: chains?.find((c) => c.id === t.chainId) },
          } satisfies TagType<"tokenChain">)
      );
  }, [tokens, chains]);

  return (
    <Container>
      <Heading
        icons={[{ src: tokens.find((t) => t.icon && t.icon !== "")?.icon }]}
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
        tags={tags.map((tag) => (
          <Tag
            key={`${tag.type}_${tag.value?.address ?? tag.value}`}
            {...tag}
            size="lg"
          />
        ))}
      >
        <Outlet />
      </Heading>
    </Container>
  );
}
