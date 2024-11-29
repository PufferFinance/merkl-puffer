import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import {
  Meta,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useMemo } from "react";
import { api } from "src/api/index.server";
import Hero from "src/components/composite/Hero";

import Tag from "src/components/element/Tag";
import useOpportunity from "src/hooks/resources/useOpportunity";

export async function loader({
  params: { id, type, chain: chainId },
}: LoaderFunctionArgs) {
  if (!chainId || !id || !type) throw "";

  const { data: chains } = await api.v4.chains.index.get({
    query: { search: chainId },
  });
  const chain = chains?.[0];

  if (!chain) throw "";

  const { data: opportunity } = await api.v4
    .opportunities({ id: `${chain.id}-${type}-${id}` })
    .get();

  if (!opportunity) throw "Opportunity";

  return json(opportunity);
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.error) return [{ title: "404 on Merkl" }];
  return [{ title: `${data?.name} on Merkl` }];
};

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { tags, description, link } = useOpportunity(opportunity);
  const styleName = useMemo(() => {
    const spaced = opportunity?.name.split(' ');

    return spaced.map((str, index) => {
      // biome-ignore lint/suspicious/noArrayIndexKey: required
      if (!str.match(/[\p{Letter}\p{Mark}]+/gu)) return [<span key={str + index} className="text-main-11">{str}</span>];
      if (str.includes('-')) return str.split('-').flatMap((s, i, arr) => [s, i !== arr.length - 1 && <span className="text-main-11">-</span>])
      if (str.includes('/')) return str.split('/').flatMap((s, i, arr) => [s, i !== arr.length - 1 && <span className="text-main-11">/</span>])
      // biome-ignore lint/suspicious/noArrayIndexKey: required
      return [<span key={str + index}>{str}</span>]
    }).flatMap((str, index, arr) => [str, index !== arr.length - 1 && " "])
  }, [opportunity])

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
