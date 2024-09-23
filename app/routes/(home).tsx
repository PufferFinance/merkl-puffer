import type { MetaFunction } from "@remix-run/node";
import Box from "dappkit/components/primitives/Box";
import Input from "dappkit/components/primitives/Input";
import Group from "dappkit/components/extenders/Group";
import { Button } from "dappkit/index";
// import { Button, DAppProvider, Dropdown } from "dappkit";
import {
	http,
	createConfig,
	useAccount,
	useConfig,
	useConnect,
	useDisconnect,
} from "wagmi";
import { type Chain, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import Header from "src/components/layout/Header";
import { Outlet } from "@remix-run/react";
import Title from "dappkit/components/primitives/Title";
import Text from "dappkit/components/primitives/Text";
import { createColoring } from "dappkit/theming/coloring";
import { Coloring } from "dappkit/theming/variables";
import Divider from "dappkit/components/primitives/Divider";
import Select from "dappkit/components/extenders/Select";
import Dropdown from "dappkit/components/extenders/Dropdown";
import Space from "dappkit/components/primitives/Space";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const config = createConfig({
	chains: [mainnet, sepolia],
	connectors: [
		coinbaseWallet(),
		walletConnect({
			customStoragePrefix: "wagmi",
			projectId: "26c912aadd2132cd869a5edc00aeea0f",
			metadata: {
				name: "Example",
				description: "Example website",
				url: "https://example.com",
				icons: [],
			},
		}),
	],
	transports: {
		[mainnet.id]: http(),
		[sepolia.id]: http(),
	},
});

const testThemes: { [name: string]: Coloring } = {
	uniswap: createColoring(
		["#131313", "#FC72FF", "#131313"],
		["#FFFFFF", "#FC72FF", "white"],
	),
	"1inch": createColoring(
		["#131823", "#172A45", "#131823"],
		["#FFFFFF", "#DDECFE", "white"],
	),
	kiln: createColoring(
		["#000000", "#FF6521", "black"],
		["#FFFFFF", "#FF6521", "white"],
	),
	avocado: createColoring(
		["#0E121C", "#07A65D", "#0E121C"],
		["#FFFFFF", "#07A65D", "white"],
	),
	pancakeswap: createColoring(
		["#27262C", "#1FC7D4", "#27262C"],
		["#FFFFFF", "#1FC7D4", "white"],
	),
	optimism: createColoring(
		["#000000", "#FF0420", "black"],
		["#FBFCFE", "#FF0420", "white"],
	),
};

export default function Index() {
	return (
		<Group size="xl" className="m-xl flex-col !p-xl">
			<Group className="flex-row justify-between">
				<Group size="sm" className="flex-col">
					<Title h={1}>USDC/WETH</Title>
					<Group className="mb-lg">
						<Button size="sm" look="bold">
							Uniswap V3
						</Button>
						<Dropdown
							content={
								<Group size="xs" className="flex-col max-w-[200px]">
									<Text size="xs">
										Earn on this opportunity by providing liquidity in this pool and earn rewards.
									</Text>
									<Space size="md"/>
									<Button className="justify-center" look="bold" size="xs">
										All pools
									</Button>
									<Button className="justify-center" look="bold" size="xs">
										Learn more
									</Button>
								</Group>
							}
						>
							<Button size="sm" look="bold">
								Liquidity
							</Button>
						</Dropdown>
						<Button size="sm" look="bold">
							Optimism
						</Button>
						<Button size="sm" look="bold">
							WETH
						</Button>
						<Button size="sm" look="bold">
							USDC
						</Button>
					</Group>
					<Text>Earn by providing liquidity</Text>
					<Group className="mt-xl*2">
						<Button look="tint">Overview</Button>
						<Button>Leaderboard</Button>
						<Button>Analytics</Button>
					</Group>
				</Group>
				<Group size="xl" className="grid grid-cols-3 grow max-w-[50%]">
					<Group className="flex-col" look="base">
						<Group className="gap-xl">
							<Title h={3}>APR</Title>
							<Title h={3}>129%</Title>
						</Group>
						<Box className="grow">graph</Box>
					</Group>
					<Group className="flex-col" look="base">
						<Group className="gap-xl">
							<Title h={3}>TVL</Title>
							<Title h={3}>129$</Title>
						</Group>
						<Box className="grow">graph</Box>
					</Group>
					<Group className="flex-col" look="base">
						<Group className="gap-xl">
							<Title h={3}>APR</Title>
							<Title h={3}>129%</Title>
						</Group>
						<Box className="grow">graph</Box>
					</Group>
				</Group>
			</Group>
			<Divider className="border-main-4" horizontal />

			<div>
				<Outlet />
			</div>
		</Group>
	);
}
