import type { Opportunity } from "@merkl/api";
import { Form, useLocation } from "@remix-run/react";
import { Divider, Group, Icon, Icons, Input, Modal, Title, useShortcut } from "dappkit";
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
    <>
      <Button to={link} look="soft">
        <Icons>{icons}</Icons> {opportunity.name} <Icon remix="RiArrowRightLine" />
      </Button>
      <Divider look="soft" />
    </>
  );
}

interface SearchBarProps {
  icon?: boolean;
}

export default function SearchBar({ icon = false }: SearchBarProps) {
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
        <Scroll className="min-h-[70vh] w-full [&>*]:flex [&>*]:flex-col [&>*]:gap-xl*2 z-10" vertical>
          {entries
            .filter(([_, res]) => res?.length)
            .map(([category, results]) => (
              <Group key={category} className="flex-col" size="xl">
                <Title h={4}>{titles[category]}</Title>
                <Group className="flex-col">
                  {results.map((_, i) => {
                    switch (category) {
                      case "chain":
                        return (
                          <>
                            <Button to={`/chains/${results[i].name}`} look="soft" className="gap-lg">
                              <Icon src={results[i].icon} /> {results[i].name}
                              <Icon remix="RiArrowRightLine" />
                            </Button>
                            <Divider look="soft" />
                          </>
                        );
                      case "opportunity":
                        return <OpportunityResult opportunity={results[i]} />;
                      case "token":
                        return (
                          <>
                            <Button to={`/tokens/${results[i].symbol}`} look="soft">
                              <Icon src={results[i].icon} /> {results[i].symbol} <Icon remix="RiArrowRightLine" />
                            </Button>
                            <Divider look="soft" />
                          </>
                        );
                      case "protocol":
                        return (
                          <>
                            <Button to={`/protocols/${results[i].id}`} look="soft">
                              <Icon src={results[i].icon} /> {results[i].name}
                              <Icon remix="RiArrowRightLine" />
                            </Button>
                            <Divider look="soft" />
                          </>
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
      size="xl"
      className="h-full p-xl*2 w-[95vw] md:w-[70vw] lg:w-[50vw] xl:w-[40vw] z-20 [&>*]:max-h-full [&>*]:animate-drop [&>*]:origin-top"
      state={[opened, setOpened]}
      modal={
        <>
          <Input
            look="base"
            state={[searchInput, setSearchInput]}
            placeholder="Search"
            suffix={<Icon className="text-main-12" remix="RiSearchLine" />}
          />
          {Results}
        </>
      }>
      <Form>
        {icon ? (
          <Button look="base">
            <Icon className="text-main-12" remix="RiSearchLine" />
          </Button>
        ) : (
          <Input
            name="search"
            value={searchInput}
            state={[searchInput, setSearchInput]}
            placeholder="Search"
            suffix={<Icon className="text-main-12" remix="RiSearchLine" />}
          />
        )}
      </Form>
    </Modal>
  );
}
