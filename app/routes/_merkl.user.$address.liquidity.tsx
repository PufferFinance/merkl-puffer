import { useParams } from "@remix-run/react";
import { Container } from "dappkit";

export default function Index() {
  const { address } = useParams();

  return <Container>liquidity</Container>;
}
