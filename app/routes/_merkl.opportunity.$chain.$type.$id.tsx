import type { Opportunity } from "@angleprotocol/merkl-api";
import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { Meta, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";

import { Container } from "dappkit";
import Tag from "src/components/element/Tag";
import { getChainId } from "src/config/chains";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({
  params: { id, type, chain },
}: LoaderFunctionArgs) {
  const chainId = getChainId(chain ?? "");

  if (!chainId || !id || !type) throw "";

  const { data: opportunity, ...res } = await api.v4
    .opportunity({ chainId })({ type })({ id })
    .get();

  if (!opportunity) throw "";

  return json(opportunity);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.error) return [{ title: "404 on Merkl" }];
  return [{ title: `${data?.name} on Merkl` }];
};

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { chain, id } = useParams();

  const { tags, description, link } = useOpportunity(opportunity as Opportunity);

  return (
    <Container>
      <Meta />
      <Heading
        icons={opportunity.tokens.map((t) => ({ src: t.icon }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={opportunity.name}
        description={description}
        tabs={[
          { label: "Overview", link },
          { label: "Leaderboard", link: `${link}/leaderboard` },
          { label: "Analytics", link: `${link}/analytics` },
        ]}
        tags={tags.map((tag) => (
          <Tag
            key={`${tag.type}_${tag.value?.address ?? tag.value}`}
            {...tag}
            size="sm"
            look="bold"
          />
        ))}
      >
        <Outlet />
      </Heading>
    </Container>
  );
}
