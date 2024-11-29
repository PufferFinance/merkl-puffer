import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData } from "@remix-run/react";
import { api } from "src/api/index.server";
import Hero from "src/components/composite/Hero";

import { useMemo } from "react";
import Tag from "src/components/element/Tag";
import { ErrorHeading } from "src/components/layout/ErrorHeading";
import useOpportunity from "src/hooks/resources/useOpportunity";
import { ChainService } from "src/api/services/chain.service";
import { OpportunityService } from "src/api/services/opportunity.service";

export async function loader({ params: { id, type, chain: chainId } }: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const chain = await ChainService.get({ search: chainId });
  const opportunityId = {chainId: chain.id, type, identifier: id};
  
  const opportunity = await OpportunityService.get(opportunityId);

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
