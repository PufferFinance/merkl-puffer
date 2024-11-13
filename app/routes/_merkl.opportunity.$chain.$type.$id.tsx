import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";

import { Container } from "dappkit";
import Tag from "src/components/element/Tag";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  
  if (!chainId || !id || !type) throw "";

  const { data: chains, ...resChain } = await api.v4.chains.get({ query: { search: chainId } });
  const chain = chains?.[0];


  console.log("chain", chains, resChain);
  
  if (!chain) throw "";

  console.log("BEFORE");
  
  const { data: opportunity, ...res } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();
  console.log(res);
  

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

  const { tags, description, link } = useOpportunity(opportunity);

  return (
    <Container>
      <Meta />
      <Heading
        icons={opportunity.tokens.map(t => ({ src: t.icon }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={opportunity.name}
        description={description}
        tabs={[
          { label: "Overview", link },
          { label: "Leaderboard", link: `${link}/leaderboard` },
          { label: "Analytics", link: `${link}/analytics` },
        ]}
        tags={tags.map(tag => (
          <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
        ))}>
        <Outlet />
      </Heading>
    </Container>
  );
}
