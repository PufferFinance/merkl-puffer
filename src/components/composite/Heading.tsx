import type { Campaign, Opportunity } from "@angleprotocol/merkl-api";
import { useLocation } from "@remix-run/react";
import { Box, Divider, Group, Icon, type IconProps, Icons, Text, Title, Value } from "dappkit";
import { Button } from "dappkit";
import { useMemo, type PropsWithChildren, type ReactNode } from "react";
import { formatUnits, parseUnits } from "viem";

export type HeadingProps = PropsWithChildren<{
  icons: IconProps[];
  title: ReactNode;
  navigation?: { label: ReactNode; link: string };
  description: ReactNode;
  tags?: ReactNode[];
  tabs?: { label: ReactNode; link: string }[];
  campaigns?: Campaign[];
}>;

export default function Heading({
  navigation,
  icons,
  title,
  description,
  tags,
  tabs,
  children,
  campaigns,
}: HeadingProps) {
  const location = useLocation();

  const totalRewards = useMemo(() => {
    const amounts = campaigns?.map(campaign => {
      const duration = campaign.endTimestamp - campaign.startTimestamp;
      const dayspan = BigInt(duration) / BigInt(3600 * 24);

      return parseUnits(campaign.amount, 0) / BigInt(dayspan);
    });

    const sum = amounts?.reduce((accumulator, currentValue) => accumulator + currentValue, 0n);
    if (!sum) return "0.0";
    return formatUnits(sum, 18);
  }, [campaigns]);

  return (
    <>
      <Group className="flex-row justify-between pb-md">
        <Group size="sm" className="mt-xl flex-col">
          <Group className="flex-nowrap" size="xl">
            <div className="mt-xl flex-col">
              <Group>
                {/** Disabled and set invisible when undefined to preserve layout height */}
                <Button
                  className={!navigation ? "invisible" : ""}
                  disabled={!navigation?.link}
                  to={navigation?.link}
                  look="soft"
                  size="sm">
                  <Icon size="sm" remix="RiArrowLeftSLine" />
                  {navigation?.label}
                </Button>
              </Group>
              <Group>
                <Icons size="lg">
                  {icons?.map(icon => (
                    <Icon className="text-main-12" key={`${Object.values(icon)}`} {...icon} />
                  ))}
                </Icons>
                <Title h={1} size={3}>
                  {title}
                </Title>
              </Group>
              {tags && <Group className="mb-lg">{tags}</Group>}
              <Text>{description}</Text>
            </div>
            <Group className="flex flex-col w-32">
              <Group className="flex flex-col">
                <Value look={totalRewards === "0" ? "soft" : "base"} format="$0,0" size={"xl"}>
                  {totalRewards}
                </Value>
                <Text size={"xs"}>Daily rewards</Text>
              </Group>
              <Group className="flex flex-col">
                <Text size={"xl"}>todo</Text>
                <Text size={"xs"}>APR</Text>
              </Group>
              <Group className="flex flex-col">
                <Text size={"xl"}>{campaigns?.length}</Text>
                <Text size={"xs"}>Active campaigns</Text>
              </Group>
            </Group>
          </Group>
          <Box size="sm" look="base" className="flex-row mt-xl*2 w-min">
            {tabs?.map(tab => (
              <Button look={location.pathname === tab.link ? "hype" : "soft"} to={tab.link} key={tab.link}>
                {tab.label}
              </Button>
            ))}
          </Box>
        </Group>
      </Group>
      <Divider className="border-main-4" horizontal />
      <div>{children}</div>
    </>
  );
}
