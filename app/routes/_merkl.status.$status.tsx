import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Container } from "dappkit";
import Heading from "src/components/composite/Heading";
import { type Status, getStatus, statuses } from "src/config/status";

export async function loader({ params: { status: _status } }: LoaderFunctionArgs) {
  const status = getStatus(_status ?? "");

  if (!status) throw new Error("Unknown status");

  return json({ status });
}

export default function Index() {
  const { status: _status } = useLoaderData<typeof loader>();
  const status = statuses[_status as Status];

  return (
    <Container>
      <Heading
        icons={[status.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={status.label}
        description={status.description}
        tabs={[
          {
            label: "Opportunities",
            link: `/status/${status.label?.toLowerCase()}`,
          },
        ]}>
        <Outlet />
      </Heading>
    </Container>
  );
}
