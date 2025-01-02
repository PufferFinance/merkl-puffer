import type { Chain } from "@merkl/api";
import { Link } from "@remix-run/react";
import { Group, Icon } from "dappkit";
import type { BoxProps } from "dappkit";
import { Title } from "dappkit";
import { mergeClass } from "dappkit";
import type { TagTypes } from "../Tag";
import { ChainRow } from "./ChainTable";

export type ChainTableRowProps = {
  hideTags?: (keyof TagTypes)[];
  chain: Chain;
} & BoxProps;

export default function ChainTableRow({ hideTags, chain, className, ...props }: ChainTableRowProps) {
  return (
    <Link to={`/chains/${chain.name}`}>
      <ChainRow
        size="lg"
        content="sm"
        className={mergeClass("", className)}
        {...props}
        chainColumn={
          <Group className="py-md flex-col w-full text-nowrap whitespace-nowrap text-ellipsis">
            <Group className="text-nowrap whitespace-nowrap text-ellipsis min-w-0 flex-nowrap overflow-hidden max-w-full">
              <Title
                h={3}
                size={4}
                className="text-nowrap flex gap-lg whitespace-nowrap text-ellipsis min-w-0 overflow-hidden">
                <Icon src={chain.icon} />
                {chain.name}
              </Title>
            </Group>
          </Group>
        }
      />
    </Link>
  );
}
