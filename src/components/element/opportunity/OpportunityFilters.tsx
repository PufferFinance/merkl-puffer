import { Form } from "@remix-run/react";
import Group from "dappkit/components/extenders/Group";
import Select from "dappkit/components/extenders/Select";
import Icon from "dappkit/components/primitives/Icon";
import Input from "dappkit/components/primitives/Input";
import List from "dappkit/components/primitives/List";
import useSearchParamState from "dappkit/hooks/filtering/useSearchParamState";
import { Button } from "dappkit/index";
import { useMemo, useState } from "react";
import { actions } from "src/config/actions";
import { chains } from "src/config/chains";

const filters = ["search", "action", "status", "chain"] as const;
type OpportunityFilter = (typeof filters)[number];

export type OpportunityFilterProps = {
  only?: OpportunityFilter[];
  exclude?: OpportunityFilter[];
};

export default function OpportunityFilters({ only, exclude }: OpportunityFilterProps) {
  //TODO: componentify theses
  const actionOptions = Object.entries(actions).reduce(
    (obj, [action, { icon, label }]) =>
      Object.assign(obj, {
        [action]: (
          <>
            <Icon size="sm" {...icon} />
            {label}
          </>
        ),
      }),
    {},
  );
  const statusOptions = {
    LIVE: (
      <>
        <Icon size="sm" remix="RiFlashlightLine" /> Live
      </>
    ),
    SOON: (
      <>
        <Icon size="sm" remix="RiTimerLine" /> Soon
      </>
    ),
    PAST: (
      <>
        <Icon size="sm" remix="RiHistoryLine" /> Past
      </>
    ),
  };
  const chainOptions = Object.entries(chains).reduce(
    (obj, [id, chain]) =>
      Object.assign(obj, {
        [id]: (
          <>
            <Icon size="sm" chain={id} />
            {chain.label}
          </>
        ),
      }),
    {},
  );

  const [actionsFilter, setActions] = useSearchParamState<string[]>(
    "action",
    v => v?.join(","),
    v => v?.split(","),
  );
  const [statusFilter, setStatus] = useSearchParamState<string[]>(
    "status",
    v => v?.join(","),
    v => v?.split(","),
  );
  const [chainIdsFilter, setChainIds] = useSearchParamState<string[]>(
    "chain",
    v => v?.join(","),
    v => v?.split(","),
  );

  const [innerSearch, setInnerSearch] = useState<string>();
  const [search, setSearch] = useSearchParamState<string>(
    "search",
    v => v,
    v => v,
  );

  const fields = useMemo(() => {
    if (only) return filters.filter(f => only.includes(f));
    if (exclude) return filters.filter(f => !exclude.includes(f));
    return filters;
  }, [only, exclude]);

  function onSearchSubmit() {
    if (!innerSearch || innerSearch === search) return;

    setSearch(innerSearch)
  }

  return (
    <Group>
      {fields.includes("search") && (
          <Form>
        <List flex="row" size="sm" content="sm" look="bold">
          <Input name='search' value={innerSearch} state={[innerSearch, setInnerSearch]} placeholder="Search" />
          <Button onClick={onSearchSubmit}>
            <Icon size="sm" remix="RiSearchLine" />
          </Button>
        </List>
          </Form>
      )}
      {fields.includes("action") && (
        <Select
          state={[actionsFilter, setActions]}
          allOption={"All actions"}
          multiple
          options={actionOptions}
          size="sm"
          placeholder="Actions"
        />
      )}
      {fields.includes("status") && (
        <Select
          state={[statusFilter, s => setStatus(s)]}
          allOption={"All status"}
          multiple
          options={statusOptions}
          size="sm"
          placeholder="Status"
        />
      )}
      {fields.includes("chain") && (
        <Select
          state={[chainIdsFilter, setChainIds]}
          allOption={"All chains"}
          multiple
          search
          options={chainOptions}
          size="sm"
          placeholder="Chains"
        />
      )}
    </Group>
  );
}
