import { Outlet, useNavigate } from "@remix-run/react";
import { Hash, Icon } from "dappkit";
import { useWalletContext } from "packages/dappkit/src/context/Wallet.context";
import { useEffect, useState } from "react";
import Hero from "src/components/composite/Hero";

export default function Index() {
  const [_isEditingAddress, setIsEditingAddress] = useState(false);
  const { address } = useWalletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) navigate(`/user/${address}`);
  }, [address]);

  return (
    <Hero
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
      ]}>
      <Outlet />
    </Hero>
  );
}
