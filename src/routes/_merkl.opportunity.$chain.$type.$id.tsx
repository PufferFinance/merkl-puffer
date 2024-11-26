import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, isRouteErrorResponse, useLoaderData, useParams, useRouteError } from "@remix-run/react";
import { api } from "src/api/index.server";
import Heading from "src/components/composite/Heading";

import { Container } from "dappkit";
import Tag from "src/components/element/Tag";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains, ...resChain } = await api.v4.chains.index.get({ query: { search: chainId } });
  const chain = chains?.[0];

  if (!chain) throw "";

  const { data: opportunity, ...res } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();

  if (!opportunity) throw "Opportunity";

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
  return <h1>Unknown Error</h1>;
}
