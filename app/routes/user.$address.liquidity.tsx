import { Outlet, useParams } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Hash from "dappkit/components/primitives/Hash";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";

export default function Index() {
  const { address } = useParams();

  return (
    <Page>
     liquidity
    </Page>
  );
}
