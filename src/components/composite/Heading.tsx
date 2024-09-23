import { useLocation } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Box from "dappkit/components/primitives/Box";
import Divider from "dappkit/components/primitives/Divider";
import Icon, { IconProps } from "dappkit/components/primitives/Icon";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import type { PropsWithChildren, ReactNode } from "react";

export type HeadingProps = PropsWithChildren<{
  icons: IconProps[],
  title: ReactNode;
  description: ReactNode;
  tags: ReactNode[];
  tabs: { label: ReactNode; link: string }[];
}>;

export default function Heading({ icons, title, description, tags, tabs, children }: HeadingProps) {
  const location = useLocation();

  return (
    <>
      <Group className="flex-row justify-between pb-md">
        <Group size="sm" className="flex-col">
          <Group>
          {icons?.map((icon) => <Icon key={`${Object.values(icon)}`} size="md" {...icon}/>)}
          <Title h={1}>{title}</Title>
          </Group>
          {tags && <Group className="mb-lg">{tags}</Group>}
          <Text>{description}</Text>
          <Group className="mt-xl*2">
            {tabs?.map(tab => (
              <Button look={location.pathname === tab.link ? "tint" : "base"} to={tab.link} key={tab.link}>
                {tab.label}
              </Button>
            ))}
          </Group>
        </Group>
        {/* <Group size="xl" className="grid grid-cols-3 grow max-w-[50%]">
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
        </Group> */}
      </Group>
      <Divider className="border-main-4" horizontal />
      <div>{children}</div>
    </>
  );
}
