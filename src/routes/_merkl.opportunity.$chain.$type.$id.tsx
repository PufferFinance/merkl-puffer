import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { Meta, Outlet, useLoaderData } from "@remix-run/react";
import Hero from "src/components/composite/Hero";
import { useMemo } from "react";
import { ChainService } from "src/api/services/chain.service";
import { OpportunityService } from "src/api/services/opportunity.service";
import Tag from "src/components/element/Tag";
import { ErrorHeading } from "src/components/layout/ErrorHeading";
import useOpportunity from "src/hooks/resources/useOpportunity";
import type { Campaign } from "@angleprotocol/merkl-api";
import { CampaignService } from "src/api/services/campaign.service";

export async function loader({
  params: { id, type, chain: chainId },
}: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const chain = await ChainService.get({ search: chainId });
  const opportunityId = { chainId: chain.id, type, identifier: id };

  const opportunity = await OpportunityService.get(opportunityId);
  const campaigns = await CampaignService.get();

  // get Campaigns
  // const { data: campaigns } = await api.v4.campaigns.index.get({
  //   query: {
  //     chainId: chains?.[0]?.id,
  //     type: type as Parameters<
  //       typeof api.v4.campaigns.index.get
  //     >[0]["query"]["type"],
  //     identifier: id,
  //   },
  // });

  if (!campaigns || !opportunity) throw "DAZZ";

  return json({ opportunity, campaigns });
}

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
  if (error) return [{ title: error }];
  return [{ title: `${data?.name} on Merkl` }];
};

export type OutletContextOpportunity = {
  campaigns: Campaign[];
};

export default function Index() {
  const { opportunity, campaigns } = useLoaderData<typeof loader>();
  const { tags, description, link } = useOpportunity(opportunity);

  const styleName = useMemo(() => {
    const spaced = opportunity?.name.split(" ");

    return spaced
      .map((str, index) => {
        if (!str.match(/[\p{Letter}\p{Mark}]+/gu))
          return [
            <span key={str + index} className="text-main-11">
              {str}
            </span>,
          ];
        if (str.includes("-"))
          return str
            .split("-")
            .flatMap((s, i, arr) => [
              s,
              i !== arr.length - 1 && <span className="text-main-11">-</span>,
            ]);
        if (str.includes("/"))
          return str
            .split("/")
            .flatMap((s, i, arr) => [
              s,
              i !== arr.length - 1 && <span className="text-main-11">/</span>,
            ]);
        // biome-ignore lint/suspicious/noArrayIndexKey: required
        return [<span key={str + index}>{str}</span>];
      })
      .flatMap((str, index, arr) => [str, index !== arr.length - 1 && " "]);
  }, [opportunity]);

  return (
    <>
      <Meta />
      <Hero
        icons={opportunity.tokens.map((t) => ({ src: t.icon }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={styleName}
        description={description}
        tabs={[
          { label: "Overview", link },
          { label: "Leaderboard", link: `${link}/leaderboard` },
        ]}
        tags={tags.map((tag) => (
          <Tag
            key={`${tag.type}_${tag.value?.address ?? tag.value}`}
            {...tag}
            size="md"
          />
        ))}
        campaigns={campaigns}
        opportunity={opportunity}
      >
        <Outlet context={{ campaigns }} />
      </Hero>
    </>
  );
}

export function ErrorBoundary() {
  return <ErrorHeading />;
}
