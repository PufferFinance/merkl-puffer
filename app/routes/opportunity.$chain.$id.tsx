import { type LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Meta, Outlet, useLoaderData, useLocation, useParams } from "@remix-run/react";
import Icon from "dappkit/components/primitives/Icon";
import { Button } from "dappkit/index";
import { fetchOpportunity } from "src/api/fetch/fetchOpportunity";
import { fetchTokens } from "src/api/fetch/fetchTokens";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import Tag, { TagTypes } from "src/components/element/Tag";
import { ChainId, chains, getChainId } from "src/config/chains";
import { getProtocol } from "src/config/protocols";

export async function loader({ params: { id, chain } }: LoaderFunctionArgs) {
  const chainId = getChainId(chain ?? "")

  console.log("chainId", chainId, id);
  
  if (!chainId) throw "";

  const { res: opportunity } = await fetchOpportunity({ chainId: chainId, mainParameter: id ?? "" });
  
  if (!opportunity) throw "";

  const { res: tokens } = await fetchTokens({ chainIds: [opportunity?.chainId], symbols: opportunity.tokenIcons });

  return json({
    ...opportunity,
    tags: [
      { type: "chain", value: opportunity.chainId },
      { type: "action", value: opportunity.action },
      { type: "protocol", value: getProtocol(opportunity?.platform) },
      ...(opportunity?.tokenIcons?.map(t => ({
        type: "token",
        value: Object.values(tokens?.[opportunity.chainId] ?? {}).find(
          ({ symbol }) => symbol?.toLowerCase() === t?.toLowerCase(),
        ),
      })) ?? []),
    ],
  });
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
        icons={opportunity.tags.filter(({type}) => type === "token").map((token) => ({src: (token?.value as TagTypes["token"])?.logoURI}))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={opportunity.name}
        description={"Earn rewards by providing liquidity to this pool directly on USDC/USDT/FRAX or through one of the supported Automated Liquidity Managers."}
        tabs={[
          { label: "Overview", link: `/opportunity/${chain}/${id}` },
          { label: "Leaderboard", link: `/opportunity/${chain}/${id}/leaderboard` },
          { label: "Analytics", link: `/opportunity/${chain}/${id}/analytics` },
        ]}
        tags={opportunity.tags.map((tag) => <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />)}>
        <Outlet />
      </Heading>
    </Page>
  );
}
