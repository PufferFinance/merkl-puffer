import { Button, Group, Icon, List, Select } from "dappkit/src";
import { useMemo } from "react";
import useSearchParamState from "src/hooks/filtering/useSearchParamState";

export type OpportunityPaginationProps = {
  count?: number;
};

export default function OpportunityPagination({
  count,
}: OpportunityPaginationProps) {
  const [pageFilter, setPageFilter] = useSearchParamState<number>(
    "page",
    (v) => v.toString(),
    (v) => Number.parseInt(v)
  );

  const [itemsFilter, setItemsFilter] = useSearchParamState<number>(
    "items",
    (v) => v.toString(),
    (v) => Number.parseInt(v)
  );

  const pages = useMemo(
    () => Math.round((count ?? 0) / (itemsFilter ?? 20)) - 1,
    [count, itemsFilter]
  );
  const pageOptions = useMemo(() => {
    return [...Array(Math.max(Math.round(pages ?? 0), 1)).fill(0)]
      .map((_, index) => index + 1)
      .reduce((obj, index) => Object.assign(obj, { [index]: index }), {});
  }, [pages]);

  return (
    <Group className="justify-between">
      <List flex="row">
        <Button
          disabled={(pageFilter ?? 0) <= 1}
          onClick={() => setPageFilter(Math.max(1, (pageFilter ?? 0) - 1))}
        >
          <Icon remix="RiArrowLeftLine" />
        </Button>
        <Select
          state={[pageFilter, setPageFilter]}
          look="bold"
          options={pageOptions}
        />
        <Button
          disabled={(pageFilter ?? 0) >= pages}
          onClick={() => setPageFilter(Math.min(pages, (pageFilter ?? 0) + 1))}
        >
          <Icon remix="RiArrowRightLine" />
        </Button>
      </List>
      <List flex="row">
        <Button
          onClick={() => setItemsFilter(Math.min(50, (itemsFilter ?? 0) + 10))}
        >
          More <Icon remix="RiArrowDownLine" />
        </Button>
        <Select
          state={[itemsFilter, setItemsFilter]}
          look="bold"
          options={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" }}
        />
        <Button
          onClick={() => setItemsFilter(Math.max(10, (itemsFilter ?? 0) - 10))}
        >
          Less <Icon remix="RiArrowUpLine" />
        </Button>
      </List>
    </Group>
  );
}
