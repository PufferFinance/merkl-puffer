import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Icon from "dappkit/components/primitives/Icon";
import Title from "dappkit/components/primitives/Title";
import { type ReactNode, useMemo } from "react";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";
import { Action, actions, getAction } from "src/config/actions";
import { type ChainId, chains, getChainId } from "src/config/chains";
import { getStatus, Status, statuses } from "src/config/status";

export async function loader({ params: { action: _action } }: LoaderFunctionArgs) {
  const action = getAction(_action ?? "");
  
  if (!action) throw new Error("Unknown action");

  return json({ action });
}

export default function Index() {
  const { action: _action } = useLoaderData<typeof loader>();
  const action = actions[_action as Action];

  return (
    <Page>
      <Heading
        icons={[action.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={action.label}
        description={action.description}
        tabs={[
          { label: "Opportunities", link: `/action/${action.label?.toLowerCase()}` },
        ]}>
        <Outlet />
      </Heading>
    </Page>
  );
}
