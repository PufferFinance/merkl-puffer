import { Outlet } from "@remix-run/react";
import { Hash, Icon } from "dappkit";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useState } from "react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  const [_isEditingAddress] = useState(false);
  const { address } = useWalletContext();

  return (
    <Hero
      breadcrumbs={[]}
      navigation={{ label: "Back to opportunities", link: "/" }}
      title={"Dashboard"}
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
