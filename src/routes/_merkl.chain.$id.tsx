import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { Group, Title } from "dappkit";
import { ChainService } from "src/api/services/chain.service";
import Hero from "src/components/composite/Hero";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const chain = await ChainService.get({ search: id });

  return json({ chain });
}

export default function Index() {
  const { chain } = useLoaderData<typeof loader>();
  const label = chain.name.toLowerCase();

  return (
    <Hero
      icons={[{ src: chain.icon }]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={chain.name}
      description={"Lorem ipsum something cool about the chain"}
      tabs={[
        { label: "Opportunities", link: `/chain/${label?.toLowerCase()}` },
        {
          label: "Leaderboard",
          link: `/chain/${label?.toLowerCase()}/leaderboard`,
        },
        {
          label: "Analytics",
          link: `/chain/${label?.toLowerCase()}/analytics`,
        },
      ]}>
      <Outlet />
    </Hero>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <>
      <Group className="mx-auto my-auto flex-col p-xl*2 [&>*]:text-center max-w-fit justify-center">
        <Title h={3}>{error?.message ?? "Error"}</Title>
        {/* <Text h={3}>We don't support this chain</Text> */}
      </Group>
    </>
  );
}
