import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
	Outlet,
	useLoaderData,
	useLocation,
	useParams,
} from "@remix-run/react";
import Dropdown from "dappkit/components/extenders/Dropdown";
import Group from "dappkit/components/extenders/Group";
import Box from "dappkit/components/primitives/Box";
import Space from "dappkit/components/primitives/Space";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import Heading from "src/components/composite/Heading";
import Page from "src/components/composite/layout/Page";

export async function loader({ params: { id, chain } }: LoaderFunctionArgs) {
	const chainId = 1;
	const opportunities = await fetch(
		`https://api.merkl.xyz/v3/opportunity?campaigns=false&chainId=${chainId}&mainParameter=${id}&testTokens=false`,
	).then((res) => res.json());

	const opportunity = Object.values(opportunities ?? {})?.[0];

	console.log(opportunity);

	return json({
		...opportunity,
		tags: [
			{ type: "action", value: opportunity.action },
			{ type: "platform", value: opportunity.platform },
			...opportunity.tokenIcons.map((t) => ({ type: "tokens", value: t })),
		],
	});
}

export default function Index() {
	const opportunity = useLoaderData<typeof loader>();
	const { pathname } = useLocation();
	const { chain, id } = useParams();

	return (
		<Page>
			<Heading
				title={opportunity.name}
				description={"World"}
				tabs={[
					{ label: "Overview", link: `/opportunity/${chain}/${id}` },
					{ label: "Leaderboard", link: `/opportunity/${chain}/${id}/leaderboard` },
					{ label: "Analytics", link: `/opportunity/${chain}/${id}/analytics` },
				]}
				tags={opportunity.tags.map((tag) => (
					<Button key={tag.value} look="bold" size="sm">
						{tag.value}
					</Button>
				))}
			>
				<Outlet />
			</Heading>
		</Page>
	);
}
