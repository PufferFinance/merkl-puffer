import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData } from "@remix-run/react";
import { api } from "src/api/index.server";
import Hero from "src/components/composite/Hero";

import { useMemo } from "react";
import Tag from "src/components/element/Tag";
import { ErrorHeading } from "src/components/layout/ErrorHeading";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: chainId },
  });
  const chain = chains?.[0];

  if (!chain) throw new Response(`Chain ${chainId} could not be found`, { status: 404 });

  const { data: opportunity, status } = await api.v4.opportunities({ id: `${chain.id}-${type}-${id}` }).get();

  if (status === 404) throw new Response("Opportunity not found", { status });
  if (status === 500) throw new Response("Opportunity unavailable", { status });
  if (!opportunity) throw new Response("Opportunity unavailable", { status });

  return json(opportunity);
}

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  if (error) return [{ title: error }];
  return [{ title: `${data?.name} on Merkl` }];
};

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { tags, description, link } = useOpportunity(opportunity);
  const styleName = useMemo(() => {
    const spaced = opportunity?.name.split(" ");

    return spaced
      .map((str, index) => {
        // biome-ignore lint/suspicious/noArrayIndexKey: required
        if (!str.match(/[\p{Letter}\p{Mark}]+/gu))
          return [
            <span key={str + index} className="text-main-11">
              {str}
            </span>,
          ];
        if (str.includes("-"))
          return str
            .split("-")
            .flatMap((s, i, arr) => [s, i !== arr.length - 1 && <span className="text-main-11">-</span>]);
        if (str.includes("/"))
          return str
            .split("/")
            .flatMap((s, i, arr) => [s, i !== arr.length - 1 && <span className="text-main-11">/</span>]);
        // biome-ignore lint/suspicious/noArrayIndexKey: required
        return [<span key={str + index}>{str}</span>];
      })
      .flatMap((str, index, arr) => [str, index !== arr.length - 1 && " "]);
  }, [opportunity]);

  return (
    <>
      <Meta />
      <Hero
        icons={opportunity.tokens.map(t => ({ src: t.icon }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={styleName}
        description={description}
        tabs={[
          { label: "Overview", link },
          { label: "Leaderboard", link: `${link}/leaderboard` },
          { label: "Analytics", link: `${link}/analytics` },
        ]}
        tags={tags.map(tag => <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="md" />)}>
        <Outlet />
      </Hero>
    </>
  );
}

export function ErrorBoundary() {
  return <ErrorHeading />;
}
