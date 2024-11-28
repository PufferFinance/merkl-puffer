import type { Campaign } from "@angleprotocol/merkl-api";
import { useLocation } from "@remix-run/react";
import {
  Box,
  Container,
  Divider,
  Group,
  Icon,
  type IconProps,
  Icons,
  Text,
  Title,
  Value,
} from "dappkit";
import { Button } from "dappkit";
import { useMemo, type PropsWithChildren, type ReactNode } from "react";
import config from "merkl.config";
import { formatUnits, parseUnits } from "viem";

export type HeroProps = PropsWithChildren<{
  icons: IconProps[];
  title: ReactNode;
  navigation?: { label: ReactNode; link: string };
  description: ReactNode;
  tags?: ReactNode[];
  tabs?: { label: ReactNode; link: string }[];
  campaigns?: Campaign[];
}>;

export default function Hero({
  navigation,
  icons,
  title,
  description,
  tags,
  tabs,
  children,
  campaigns,
}: HeroProps) {
  const location = useLocation();

  const totalRewards = useMemo(() => {
    const amounts = campaigns?.map((campaign) => {
      const duration = campaign.endTimestamp - campaign.startTimestamp;
      const dayspan = BigInt(duration) / BigInt(3600 * 24);

      return parseUnits(campaign.amount, 0) / BigInt(dayspan);
    });

    const sum = amounts?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0n
    );
    if (!sum) return "0.0";
    return formatUnits(sum, 18);
  }, [campaigns]);
  console.log(config.images.hero);

  return (
    <>
      <Group
        className="flex-row justify-between aspect-[1440/440] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url('${config.images.hero}')` }}
      >
        <Container>
          <Group className="flex-col h-full py-xl gap-xl lg:gap-xs">
            <Group className="items-center">
              {/* TODO: Build the breadcrumbs */}
              {/** Disabled and set invisible when undefined to preserve layout height */}
              <Button
                className={!navigation ? "invisible" : ""}
                disabled={!navigation?.link}
                to={navigation?.link}
                look="soft"
                size="xs"
              >
                Home
              </Button>
              <Button
                className={"!text-main-11"}
                disabled={!navigation?.link}
                to={navigation?.link}
                look="soft"
                size="xs"
              >
                <Icon remix="RiArrowRightSLine" />
                {navigation?.label}
              </Button>
            </Group>
            <Group className="grow items-center justify-between gap-xl lg:gap-xl*4">
              <Group className="flex-col flex-1 gap-xl lg:!gap-lg*2">
                <Group className="items-center !gap-0 md:!gap-xl">
                  <Icons size="lg">
                    {icons?.map((icon) => (
                      <Icon
                        className="hidden md:block text-main-12 !w-xl*4 !h-xl*4"
                        key={`${Object.values(icon)}`}
                        {...icon}
                      />
                    ))}
                  </Icons>
                  <Title h={1} size={2}>
                    {title}
                  </Title>
                </Group>
                {!tags && <Divider className="border-main-11" horizontal />}
                {tags && <Group className="mb-lg">{tags}</Group>}
                <Text size="xl" className="!font-bold">
                  {description}
                </Text>
              </Group>
              <Group className="w-full lg:w-auto lg:flex-col mr-xl*2" size="xl">
                <Group className="flex-col">
                  <Value
                    look={totalRewards === "0" ? "soft" : "base"}
                    format="$0,0"
                    size={3}
                  >
                    {totalRewards}
                  </Value>

                  <Text size="xl" className="font-bold">
                    Daily rewards
                  </Text>
                </Group>
                <Group className="flex-col">
                  <Text size={3}>todo</Text>
                  <Text size={"xl"} className="font-bold">
                    APR
                  </Text>
                </Group>
                {/* TODO: Show "Opportunities" or "Campaigns" according to the page */}
                <Group className="flex-col">
                  <Text size={3}>{campaigns?.length}</Text>
                  <Text size={"xl"} className="font-bold">
                    Active campaigns
                  </Text>
                </Group>
              </Group>
              {/* {!!tabs && (
                <Box size="sm" look="base" className="flex-row mt-xl*2 w-min">
                  {tabs?.map((tab) => (
                    <Button
                      look={location.pathname === tab.link ? "hype" : "soft"}
                      to={tab.link}
                      key={tab.link}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </Box>
              )} */}
            </Group>
          </Group>
        </Container>
      </Group>
      <div>{children}</div>
    </>
  );
}
