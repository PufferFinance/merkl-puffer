import { Outlet, useParams } from "@remix-run/react";
import { Button, Group, Hash, Icon, Title } from "dappkit";
import { Container } from "dappkit";
import { useState } from "react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  const { address } = useParams();
  const [_isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <Hero
      icons={[{ remix: "RiAccountCircleFill" }]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={
        <Group>
          <Title h={1}>
            <Hash format="short" copy>
              {address}
            </Hash>
          </Title>
        </Group>
      }
      description={"Inspect rewards, balances and positions."}
      tabs={[
        {
          label: (
            <>
              <Icon size="sm" remix="RiGift2Fill" />
              Rewards
            </>
          ),
          link: `/user/${address}`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiDropFill" />
              Liquidity
            </>
          ),
          link: `/user/${address}/liquidity`,
        },
        {
          label: (
            <>
              <Icon size="sm" remix="RiListCheck3" />
              Claims
            </>
          ),
          link: `/user/${address}/claims`,
        },
      ]}
    >
      <Outlet />
    </Hero>
  );
}
