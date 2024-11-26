import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Text } from "dappkit/src";

export async function loader({ params }: LoaderFunctionArgs) {
  return json({ chain: params.chain });
}

export default function Index() {
  return <Text>Analytics</Text>;
}
