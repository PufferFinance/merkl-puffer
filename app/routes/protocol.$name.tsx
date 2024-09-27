import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

export async function loader({ params: { id, chain } }: LoaderFunctionArgs) {}

export default function Index() {
  const opportunity = useLoaderData<typeof loader>();
  const { name } = useParams();

  return (
    <Page>
      <Meta />
      <Heading
        // icons={opportunity.tags
        //   .filter(({ type }) => type === "token")
        //   .map(token => ({ src: (token?.value as TagTypes["token"]).logoURI }))}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={name}
        description={
          "Earn rewards by providing liquidity to this pool directly on USDC/USDT/FRAX or through one of the supported Automated Liquidity Managers."
        }
        // tabs={[
        //   { label: "Overview", link: `/opportunity/${chain}/${id}` },
        //   { label: "Leaderboard", link: `/opportunity/${chain}/${id}/leaderboard` },
        //   { label: "Analytics", link: `/opportunity/${chain}/${id}/analytics` },
        // ]}
        tags={opportunity.tags.map(tag => (
          <Tag key={`${tag.type}_${tag.value?.address ?? tag.value}`} {...tag} size="sm" look="bold" />
        ))}
      >
        <Outlet />
      </Heading>
    </Page>
  );
}
