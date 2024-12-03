import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useParams } from "@remix-run/react";
import { Button, Group, Hash, Icon, Text } from "dappkit";
import { useState } from "react";
import { RewardService } from "src/api/services/reward.service";
import Hero from "src/components/composite/Hero";

export async function loader({ params: { address } }: LoaderFunctionArgs) {
  if (!address) throw "";

  //TODO: use a ligther route
  const rewards = await RewardService.getForUser(address);

  return json({ rewards, address });
}

export default function Index() {
  const { rewards, address } = useLoaderData<typeof loader>();
  const { address } = useParams();
  const [_isEditingAddress] = useState(false);

  return (
    <Hero
      breadcrumbs={[
        { link: "/", name: "Users" },
        { link: "/", name: address ?? "" },
      ]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={
        <Group className="w-full gap-xl md:gap-xl*4 items-center">
          {/* TODO: Make it dynamic this */}
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $6k
            </Text>
            <Text size="xl" bold>
              Total earned
            </Text>
          </Group>
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $1.2k
            </Text>
            <Text size={"xl"} bold>
              Earned today
            </Text>
          </Group>
          <Group className="flex-col">
            <Text size={2} className="text-main-12">
              $3k
            </Text>
            <Text size={"xl"} bold>
              Claimable
            </Text>
          </Group>
          <Group className="flex-col">
            <Button look="hype" size="lg">
              Claim
            </Button>
          </Group>
        </Group>
      }
      description={
        <Hash size={4} className="text-main-12" format="short" copy>
          {address}
        </Hash>
      }
      tabs={[
        {
          label: (
            <>
              <Icon size="sm" remix="RiGift2Fill" />
              Rewards
            </>
          ),
          link: `/users/${address}`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiDropFill" />
              Liquidity
            </>
          ),
          link: `/users/${address}/liquidity`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiListCheck3" />
              Claims
            </>
          ),
          link: `/users/${address}/claims`,
        },
      ]}>
      <Outlet />
    </Hero>
  );
}
