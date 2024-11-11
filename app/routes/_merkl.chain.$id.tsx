import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import { Group, Title } from "dappkit";
import { Container } from "dappkit";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";

export async function loader({ params: { id } }: LoaderFunctionArgs) {
  const { data: chains } = await api.v4.chain.get({ query: { search: id } });
  const chain = chains?.[0];

  if (!chain) throw new Error("Unsupported Chain");
  if (chains?.length > 1 || chain.name.toLowerCase() !== id?.toLowerCase()) throw new Error("Unsupported Chain");

  return json({ chain });
}

export default function Index() {
  const { chain } = useLoaderData<typeof loader>();
  const label = chain.name.toLowerCase();

  return (
    <Container>
      <Heading
        icons={[{ src: chain.icon }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={chain.name}
        description={"Lorem ipsum something cool about the chain"}
        tabs={[
          { label: "Opportunities", link: `/chain/${label?.toLowerCase()}` },
          { label: "Leaderboard", link: `/chain/${label?.toLowerCase()}/leaderboard` },
          { label: "Analytics", link: `/chain/${label?.toLowerCase()}/analytics` },
        ]}>
        <Outlet />
      </Heading>
    </Container>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <>
      <Group className="mx-auto my-auto flex-col p-xl*2 [&>*]:text-center max-w-fit justify-center">
        <Title h={3}>{error?.message ?? "Error"}</Title>
        {/* <Text h={3}>We don't support this chain</Text> */}
        <div>

        </div>
      </Group>
    </>
  );
}
