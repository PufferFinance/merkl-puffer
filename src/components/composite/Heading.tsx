import { useLocation } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Icons from "dappkit/components/extenders/Icons";
import Divider from "dappkit/components/primitives/Divider";
import Icon, { type IconProps } from "dappkit/components/primitives/Icon";
import Text from "dappkit/components/primitives/Text";
import Title from "dappkit/components/primitives/Title";
import { Button } from "dappkit/index";
import type { PropsWithChildren, ReactNode } from "react";

export type HeadingProps = PropsWithChildren<{
  icons: IconProps[];
  title: ReactNode;
  navigation: { label: ReactNode; link: string };
  description: ReactNode;
  tags: ReactNode[];
  tabs: { label: ReactNode; link: string }[];
}>;

export default function Heading({ navigation, icons, title, description, tags, tabs, children }: HeadingProps) {
  const location = useLocation();

  return (
    <>
      <Group className="flex-row justify-between pb-md">
        <Group size="sm" className="mt-xl flex-col">
          {navigation && (
            <Group>
              <Button to={navigation.link} look="soft" size="sm">
                <Icon size="sm" remix="RiArrowLeftSLine" />
                {navigation.label}
              </Button>
            </Group>
          )}
          <Group>
            <Icons size="lg">
              {icons?.map(icon => (
                <Icon key={`${Object.values(icon)}`} {...icon} />
              ))}
            </Icons>
            <Title h={1}>{title}</Title>
          </Group>
          {tags && <Group className="mb-lg">{tags}</Group>}
          <Text>{description}</Text>
          <Group className="mt-xl*2">
            {tabs?.map(tab => (
              <Button look={location.pathname === tab.link ? "hype" : "base"} to={tab.link} key={tab.link}>
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
