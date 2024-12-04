import type { Token as TokenType } from "@merkl/api";
import { Button, Dropdown, Icon, Value } from "packages/dappkit/src";
import { useMemo } from "react";
import TokenTooltip from "./TokenTooltip";

export type TokenProps = {
  token: TokenType;
  value?: boolean;
  amount?: number;
};

export default function Token({ token, amount, value }: TokenProps) {
  const display = useMemo(
    () => (
      <>
        {amount && <Value format="0.00a">{amount}</Value>} <Icon rounded size="sm" src={token.icon} />
        {token.symbol}
      </>
    ),
    [token, amount],
  );

  if (value) return display;
  return (
    <Dropdown content={<TokenTooltip {...{ token, amount }} />}>
      <Button look="soft">{display}</Button>
    </Dropdown>
  );
}
