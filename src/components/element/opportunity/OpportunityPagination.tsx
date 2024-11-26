import { Button, Group, Icon, List, Select } from "dappkit/src";
import { useMemo } from "react";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";

export type OpportunityPaginationProps = {
  count?: number;
};

export default function OpportunityPagination({ count }: OpportunityPaginationProps) {
  const [pageFilter, setPageFilter] = useSearchParamState<number>(
    "page",
    v => v.toString(),
    v => Number.parseInt(v),
  );

  const [itemsFilter, setItemsFilter] = useSearchParamState<number>(
    "items",
    v => v.toString(),
    v => Number.parseInt(v),
  );

  const pages = useMemo(() => (count ?? 0) / (itemsFilter ?? 20), [count, itemsFilter]);
  const pageOptions = useMemo(() => {
    return [...Array(Math.max(Math.round(pages ?? 0), 1)).fill(0)]
      .map((_, index) => index + 1)
      .reduce((obj, index) => Object.assign(obj, { [index]: index }), {});
  }, [pages]);

  return (
    <Group className="justify-between">
      <List flex="row">
        <Button>
          More <Icon size="sm" remix="RiArrowDownLine" />
        </Button>
        <Select
          state={[itemsFilter, setItemsFilter]}
          look="bold"
          options={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" }}
        />
        <Button>
          Less <Icon size="sm" remix="RiArrowUpLine" />
        </Button>
      </List>
      <List flex="row">
        <Button>
          <Icon size="sm" remix="RiArrowLeftLine" />
        </Button>
        <Select state={[pageFilter, setPageFilter]} look="bold" options={pageOptions} />
        <Button>
          <Icon size="sm" remix="RiArrowRightLine" />
        </Button>
      </List>
    </Group>
  );
}
