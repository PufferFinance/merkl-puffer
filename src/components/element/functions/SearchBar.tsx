import type { Opportunity } from "@angleprotocol/merkl-api";
import { useLocation } from "@remix-run/react";
import { Group, Icon, Icons, Input, Modal, Title, useShortcut } from "dappkit";
import { Button } from "dappkit";
import Scroll from "packages/dappkit/src/components/primitives/Scroll";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import useOpportunity from "src/hooks/resources/useOpportunity";
import { type Results, type Searchable, useMerklSearch } from "src/hooks/useMerklSearch";

const titles: { [S in Searchable]: ReactNode } = {
  chain: "Chains",
  opportunity: "Opportunities",
  protocol: "Protocols",
  token: "Tokens",
};

function OpportunityResult({ opportunity }: { opportunity: Opportunity }) {
  const { link, icons } = useOpportunity(opportunity);

  return (
    <Button to={link} size="lg" look="bold">
      <Icons>{icons}</Icons> {opportunity.name}
    </Button>
  );
}

export default function SearchBar() {
  useShortcut("ctrlKey", "k", () => {
    setOpened(true);
  });

  const [opened, setOpened] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>();
  const searchResults = useMerklSearch(searchInput ?? "");
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: close on location change
  useEffect(() => {
    setOpened(false);
  }, [location]);

  const Results = useMemo(() => {
    const entries = Object.entries(searchResults ?? {}) as {
      [S in keyof Results]: [S, Results[S]];
    }[keyof Results][];

    return (
      <Group className="flex-col flex-nowrap overflow-hidden">
        <Scroll className="h-[80vh] w-full gap-xl" vertical>
          {entries
            .filter(([_, res]) => res?.length)
            .map(([category, results]) => (
              <Group key={category} className="flex-col">
                <Title h={4}>{titles[category]}</Title>
                <Group size="sm" className="flex-col">
                  {results.map((_, i) => {
                    switch (category) {
                      case "chain":
                        return (
                          <Button to={`/chain/${results[i].name}`} size="lg" look="bold">
                            <Icon src={results[i].icon} /> {results[i].name}
                          </Button>
                        );
                      case "opportunity":
                        return <OpportunityResult opportunity={results[i]} />;
                      case "token":
                        return (
                          <Button to={`/token/${results[i].symbol}`} size="lg" look="bold">
                            <Icon src={results[i].icon} /> {results[i].symbol}
                          </Button>
                        );
                      case "protocol":
                        return (
                          <Button to={`/protocol/${results[i].name}`} size="lg" look="bold">
                            <Icon src={results[i].icon} /> {results[i].name}
                          </Button>
                        );
                      default:
                        break;
                    }
                  })}
                </Group>
              </Group>
            ))}
        </Scroll>
      </Group>
    );
  }, [searchResults]);

  return (
    <Modal
      className="h-full py-xl*2 w-[500px] [&>*]:max-h-full [&>*]:animate-drop [&>*]:origin-top"
      state={[opened, setOpened]}
      modal={
        <>
          <Input look="bold" state={[searchInput, setSearchInput]} placeholder="Search Merkl..." />
          {Results}
        </>
      }>
      <Button look="bold">
        <Icon size="sm" remix={"RiSearch2Line"} />
        Search... ctrl+k
      </Button>
    </Modal>
  );
}
