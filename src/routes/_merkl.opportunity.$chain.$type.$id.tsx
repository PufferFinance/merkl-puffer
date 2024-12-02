import type { Campaign } from "@angleprotocol/merkl-api";
import { type LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Meta,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import moment from "moment";
import { useMemo } from "react";
import { api } from "src/api/index.server";
import Tag from "src/components/element/Tag";
import useOpportunity from "src/hooks/resources/useOpportunity";
import Hero from "src/components/composite/Hero";

export async function loader({
  params: { id, type, chain: chainId },
}: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: chainId },
  });

  if (!chains?.[0]) throw "";

  // get Opportunities
  const { data: opportunity } = await api.v4
    .opportunities({ id: `${chains?.[0]?.id}-${type}-${id}` })
    .get();

  if (!opportunity) throw "Opportunity";

  // get Campaigns
  const { data: campaigns } = await api.v4.campaigns.index.get({
    query: {
      chainId: chains?.[0]?.id,
      type: type as Parameters<
        typeof api.v4.campaigns.index.get
      >[0]["query"]["type"],
      identifier: id,
    },
  });

  if (!campaigns || !opportunity) throw "DAZZ";

  return json({ opportunity, campaigns });
}

// export const meta: MetaFunction<typeof loader> = ({ data }) => {
//   if (data?.error) return [{ title: "404 on Merkl" }];
//   return [{ title: `${data?.name} on Merkl` }];
// };

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

  const filteredCampaigns = useMemo(() => {
    const now = moment().unix();
    return campaigns.filter((c: Campaign) => Number(c.endTimestamp) > now);
  }, [campaigns]);

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
          { label: "Analytics", link: `${link}/analytics` },
        ]}
        tags={tags.map((tag) => (
          <Tag
            key={`${tag.type}_${tag.value?.address ?? tag.value}`}
            {...tag}
            size="md"
          />
        ))}
        campaigns={filteredCampaigns}
      >
        <Outlet />
      </Hero>
    </>
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
