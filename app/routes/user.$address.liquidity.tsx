import { useParams } from "@remix-run/react";
import Page from "src/components/composite/layout/Page";

export default function Index() {
  const { address } = useParams();

  return <Page>liquidity</Page>;
}
