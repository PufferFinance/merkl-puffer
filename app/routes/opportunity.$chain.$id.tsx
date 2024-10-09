import { type LoaderFunctionArgs, type MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData, useLocation, useParams } from "@remix-run/react";
import { Opportunity } from "merkl-api";
import { api } from "src/api";
import { fetchOpportunity } from "src/api/fetch/fetchOpportunity";
import { fetchTokens } from "src/api/fetch/fetchTokens";
import { tagOpportunity } from "src/api/utils/opportunity";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import Tag, { type TagTypes } from "src/components/element/Tag";
import { getChainId } from "src/config/chains";

export async function loader({ params: { id, chain } }: LoaderFunctionArgs) {
  const chainId = getChainId(chain ?? "");

  console.log("chainId", chainId, id);

  if (!chainId) throw "";

  const { res: opportunity } = await fetchOpportunity({ chainId: chainId, mainParameter: id ?? "" });
  const a = await api.v4.opportunity({chainId})({id: id!}).get();

  if (!opportunity) throw "";

  const { res: tokens } = await fetchTokens({ chainIds: [opportunity?.chainId], symbols: opportunity.tokenIcons });

  return json(tagOpportunity(opportunity, tokens));
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.error) return [{ title: "404 on Merkl" }];
  return [{ title: `${data?.name} on Merkl` }];
};

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { pathname } = useLocation();
  const { chain, id } = useParams();

  return (
    <Page>
      <Meta />
      <Heading
        icons={opportunity.contextTag
          .filter(({ type }) => type === "token")
          .map(token => ({ src: (token?.value as TagTypes["token"])?.logoURI }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={opportunity.name}
        description={
          "Earn rewards by providing liquidity to this pool directly on USDC/USDT/FRAX or through one of the supported Automated Liquidity Managers."
        }
        tabs={[
          { label: "Overview", link: `/opportunity/${chain}/${id}` },
          { label: "Leaderboard", link: `/opportunity/${chain}/${id}/leaderboard` },
          { label: "Analytics", link: `/opportunity/${chain}/${id}/analytics` },
        ]}
        tags={opportunity.contextTag.map(tag => (
          <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
        ))}>
        <Outlet />
      </Heading>
    </Page>
  );
}
