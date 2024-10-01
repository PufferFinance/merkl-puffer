import { Component, Styled } from "dappkit/utils/types";
import { type ReactNode, useMemo, useState } from "react";
import Icon from "./Icon";
import { tv } from "tailwind-variants";
import { mergeClass } from "dappkit/utils/css";
import List from "./List";
import Box from "./Box";
import Text from "./Text";

export const tableStyles = tv({
  base: "",
  slots: {
    table: "",
    row: "",
  },
  variants: {
    look: {
      soft: {
        table: "",
        row: "",
      },
      base: {
        table: "bg-accent-1",
        row: "",
      },
      bold: {
        table: "",
        row: "",
      },
      tint: {
        table: "",
        row: "",
      },
      hype: {
        table: "",
        row: "",
      },
    },
  },
  defaultVariants: {
    look: "base",
  },
});

const orders = ["descending", "ascending"] as const;

export type Order = (typeof orders)[number];
export type Columns = {
  [id: string]: [name: ReactNode, size?: string, className?: string];
};
export type TableColumns<T extends Columns> = {
  readonly [C in `${Extract<keyof T, string>}Column`]: ReactNode;
};

export type RowProps<T extends Columns> = Component<
  {
    columns: T;
    exclude?: (keyof T)[];
  } & TableColumns<T>
>;

export function Row<T extends Columns>({ columns, exclude, children, ...props }: RowProps<T>) {
  const [ids, grid] = useMemo(() => {
    const cols = Object.keys(columns ?? {}) as (keyof T)[];
    const style: { display: "grid"; gridTemplateColumns: string } = {
      display: "grid",
      gridTemplateColumns: cols
        .map(id => {
          if (exclude?.includes(id)) return;
          return columns?.[id]?.[1] ?? "1fr";
        })
        .join(" ") as string,
    };

    return [cols, style];
  }, [columns, exclude]);

  const divProps = { ...props };
  for (const id of ids) {
    Object.keys(divProps)?.includes(`${String(id)}Column`) && delete divProps[`${id}Column`];
  }

  return (
    <Box style={grid} {...divProps}>
      {ids?.map(id => {
        const element = props[`${String(id)}Column`] as ReactNode;
        const [_title, _, className] = columns[id];

        if (exclude?.includes(id)) return;

        return (
          <div key={String(id)} className={[className, "inline-flex items-center"].join(" ")}>
            {element}
          </div>
        );
      })}
      {children && <div style={{ gridColumn: "1 / -1" }}>{children}</div>}
    </Box>
  );
}

export type TableProps<T extends Columns> = Component<
  Styled<typeof tableStyles> & {
    columns: T;
    header?: ReactNode;
    footer?: ReactNode;
    loading?: boolean;
    sortable?: (keyof T)[];
    onSort?: (id: keyof T, order: Order) => void;
  },
  HTMLDivElement
>;
export function Table<T extends Columns>({ look, sortable, columns, header, className, children, ...props }: TableProps<T>) {
  const ids = Object.keys(columns);
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const [sortBy, setSortBy] = useState<keyof T | undefined>(sortable?.[0]);

  function onHeaderClick(id: (typeof ids)[number]) {
    setOrder(a => (a === "ascending" || id !== sortBy ? "descending" : "ascending"));
    setSortBy(id);
  }

  const headers = useMemo(() => {
    const ids = Object.keys(columns ?? {});
    const head = {};

    for (const id of ids) {
      const [title, _, className] = columns[id];
      const isSortable = sortable?.includes(id);
      const handler = title && isSortable ? () => onHeaderClick(id) : undefined;

      head[`${id}Column`] = (
        <Text className="relative" size="xs" interactable={isSortable} onKeyDown={handler} onClick={handler}>
          {title}
          <span className="absolute -right-5">
            {sortable &&
              id === sortBy &&
              (order === "ascending" ? (
                <Icon size="sm" remix={"RiArrowDropDownLine"} />
              ) : (
                <Icon size="sm" remix={"RiArrowDropUpLine"} />
              ))}
          </span>
        </Text>
      );
    }
    return head as {
      [C in keyof TableColumns<Columns>]: ReactNode;
    };
  }, [columns, onHeaderClick, order]);

  return (
    <List look={"base"} className={mergeClass(className)} {...props}>
      {header && <Box>{header}</Box>}
      <Row columns={columns} {...headers}></Row>
      {children}
    </List>
  );
}

export function createTable<T extends Columns>(columns: T) {
  const TemplateTable = (props: Omit<TableProps<T>, "columns">) => <Table {...props} columns={columns} />;

  const TemplateRow = (props: Omit<RowProps<T>, "columns">) => <Row {...props} columns={columns} />;

  return [TemplateTable, TemplateRow, Object.keys(columns)] as [typeof TemplateTable, typeof TemplateRow, (keyof T)[]];
}
