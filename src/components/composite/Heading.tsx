import { Outlet, useLocation, useNavigation } from "@remix-run/react";
import Dropdown from "dappkit/components/extenders/Dropdown";
import Group from "dappkit/components/extenders/Group";
import Box from "dappkit/components/primitives/Box";
import Divider from "dappkit/components/primitives/Divider";
import Space from "dappkit/components/primitives/Space";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import { PropsWithChildren, ReactNode } from "react";

export type HeadingProps = PropsWithChildren<{
	title: ReactNode;
	description: ReactNode;
	tags: ReactNode[];
	tabs: { label: ReactNode; link: string }[];
}>;

export default function Heading({
	title,
	description,
	tags,
	tabs,
	children,
}: HeadingProps) {
	const location = useLocation();

	return (
		<>
			<Group className="flex-row justify-between pb-md">
				<Group size="sm" className="flex-col">
					<Title h={1}>{title}</Title>
					<Group className="mb-lg">
                        {tags}
					</Group>
					<Text>{description}</Text>
					<Group className="mt-xl*2">
						{tabs?.map((tab) => (
							<Button look={location.pathname === tab.link ? "tint" : "base"} to={tab.link} key={tab.link}>{tab.label}</Button>
						))}
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
			<div>{children}</div>
		</>
	);
}
