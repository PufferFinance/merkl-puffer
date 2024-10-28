import { useParams } from "@remix-run/react";
import Container from "src/components/composite/layout/Container";

export default function Index() {
  const { address } = useParams();

  return <Container>liquidity</Container>;
}
