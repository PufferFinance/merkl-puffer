import { Outlet, useParams } from "@remix-run/react";
import { Button, Group, Hash, Icon } from "dappkit";
import { Container } from "dappkit";
import { useState } from "react";
import Heading from "src/components/composite/Heading";

export default function Index() {
  const { address } = useParams();
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  return (
    <Container>
      <Heading
        icons={[{ remix: "RiUser6Fill" }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={
          <Group>
          <Hash value format="short">
            {address}
          </Hash>
          <Button onClick={()=> setIsEditingAddress(e => !e)} look="soft"><Icon remix="RiEdit2Line"/></Button>
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
        ]}>
        <Outlet />
      </Heading>
    </Container>
  );
}
