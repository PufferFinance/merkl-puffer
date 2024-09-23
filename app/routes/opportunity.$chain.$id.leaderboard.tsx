import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Dropdown from "dappkit/components/extenders/Dropdown";
import Group from "dappkit/components/extenders/Group";
import Box from "dappkit/components/primitives/Box";
import Space from "dappkit/components/primitives/Space";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import Heading from "src/components/composite/Heading";

export async function loader({ params }: LoaderFunctionArgs) {
	console.log("chain", params.chain, params.id);
	return json({ chain: params.chain });
}

export default function Index() {
	const opportunity = useLoaderData<typeof loader>();

	return <Text>Hello</Text>;
}
