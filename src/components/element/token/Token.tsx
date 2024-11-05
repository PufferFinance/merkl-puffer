import type { Token as TokenType } from "@angleprotocol/merkl-api";
import { Button, Dropdown, Icon, Value } from "packages/dappkit/src";
import TokenTooltip from "./TokenTooltip";

export type TokenProps = {
  token: TokenType;
  amount?: number;
};

export default function Token({ token, amount }: TokenProps) {
  return (
    <Dropdown content={<TokenTooltip {...{ token, amount }} />}>
      <Button look="soft">
        {amount && <Value format="0.00a">{amount}</Value>} <Icon rounded size="sm" src={token.icon} />
        {token.symbol}
      </Button>
    </Dropdown>
  );
}
