import * as RadixSelect from "@radix-ui/react-select";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useTheme } from "../../context/Theme.context";
import type { Component, GetSet, Variant } from "../../utils/types";
import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import Group from "../extenders/Group";
import { inputStyles } from "../primitives/Input";
import Box from "../primitives/Box";
import { mergeClass } from "dappkit/utils/css";
import Icon from "../primitives/Icon";

export const selectStyles = tv({
  base: [
    "text-main-11 flex items-center justify-between gap-1 border-1 outline-offset-0 outline-0 text-nowrap font-main font-medium",
  ],
  slots: {
    dropdown: "z-50 animate-drop mt-sm min-w-[var(--popover-anchor-width)]",
    item: "flex justify-between items-center gap-lg cursor-pointer select-none p-sm outline-offset-0 outline-0 text-nowrap",
    icon: "border-l-1 h-full flex items-center",
    value: "flex gap-sm items-center",
    check: "",
  },
  variants: {
    look: {
      soft: {
        base: "bg-main-0 border-main-0 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-0",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
      },
      base: {
        base: "bg-main-2 border-main-6 hover:bg-main-4 active:bg-main-3 hover:text-main-12  focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-5 data-[active-item]:bg-main-5 active:bg-main-4 text-main-12 focus-visible:border-main-8",
        check: "text-accent-10"
      },
      bold: {
        base: "bg-main-4 border-main-4 hover:bg-main-5 active:bg-main-3 text-main-12 focus-visible:border-main-9",
        icon: "border-main-6",
        item: "hover:bg-main-6 data-[active-item]:bg-main-6 active:bg-main-5 text-main-12 focus-visible:border-main-8",
      },
      tint: {
        base: "bg-accent-4 border-accent-4 hover:bg-accent-5 active:bg-accent-3 text-main-12 focus-visible:border-accent-9",
        icon: "border-accent-6",
        item: "hover:bg-accent-6 data-[active-item]:bg-accent-6 active:bg-accent-5 text-main-12 focus-visible:border-main-8",
      },
      hype: {
        base: "bg-accent-9 border-accent-9 hover:bg-accent-10 active:bg-accent-8 text-accent-12 focus-visible:border-accent-10",
        icon: "border-accent-11",
        item: "hover:bg-accent-10 data-[active-item]:bg-accent-10 active:bg-accent-4 text-main-12 focus-visible:border-accent-10",
      },
    },
    size: {
      xs: {
        base: "text-xs rounded-xs",
        value: "px-xs*2 py-xs*2",
        icon: "px-0",
        item: "px-sm text-xs rounded-xs",
      },
      sm: {
        base: "text-sm rounded-sm",
        value: "px-sm py-sm/2",
        icon: "px-xs/2",
        item: "px-md text-sm rounded-sm",
      },
      md: {
        base: "text-md rounded-md",
        value: "px-md text-md py-md/2",
        icon: "px-md/2",
        item: "px-md text-md rounded-md",
      },
      lg: {
        base: " text-lg rounded-lg",
        value: "px-lg py-lg/2",
        icon: "px-md/2",
        item: "px-lg text-lg rounded-lg",
      },
      xl: {
        base: "text-xl rounded-xl",
        value: "px-lg py-lg/2",
        icon: "px-lg/2",
        item: "px-xl text-xl rounded-xl",
      },
    },
  },
  defaultVariants: {
    look: "base",
    size: "md",
  },
  compoundVariants: [
    {
      size: "xs",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "sm",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-0" },
    },
    {
      size: "md",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-sm/2" },
    },
    {
      size: "lg",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-md/2" },
    },
    {
      size: "xl",
      look: "soft",
      class: { icon: "!pl-0", value: "!pr-lg/2" },
    },
  ],
});

export type SelectProps<Value> = Component<{
  size?: Variant<typeof selectStyles, "size">;
  look?: Variant<typeof selectStyles, "look">;
  value?: Value;
  placeholder?: string;
  state?: GetSet<Value>;
  search?: boolean,
  options?: { [key: string | number | symbol]: ReactNode };
}> &
  RadixSelect.SelectProps;

type MaybeArray<T, IsArray extends undefined | boolean> = IsArray extends true ? T[] : T  

export default function Select<T extends string | number | symbol, Multiple extends undefined | boolean, Value extends MaybeArray<T, Multiple>>({ look, size, state, options, search, multiple, placeholder, className, ...props }: SelectProps<Value> & {multiple?: Multiple}) {
  const { vars } = useTheme();
  const [internal, setInternal] = useState<Value>();
  const [getter, setter] = state ?? [];

  const { base, dropdown, item, icon, value: valueStyle, check } = selectStyles({
    look: look ?? "base",
    size: size ?? "md",
  });

  const [searchInput, setSearch] = useState<string>();
  
  const matches = useMemo(() => {
    // const textToMatch = Object.keys(options ?? {}).map(option => `${option}_${options[option]?.props?.children?.filter(a => typeof a !== "object").join(" ")}`)
    const textToMatch = Object.keys(options ?? {}).reduce((matches, option) => Object.assign(matches, {[`${option}`]: option}, {[`${options[option]?.props?.children?.filter(a => typeof a !== "object").join(" ")}`]: option}), {})
    const searchMatches = matchSorter(Object.keys(textToMatch), searchInput ?? "").map((key) => textToMatch[key])
    const uniqueOptionMatches = Array.from(searchMatches.reduce((set, option) => {set.add(option); return set}, new Set()))

    return uniqueOptionMatches;
  }, [options, searchInput]);

  useEffect(() => {
    console.log('matches', matches);
    
  }, [matches])

  return (
    <Ariakit.ComboboxProvider
    resetValueOnHide
    setValue={(value) => {
        setSearch(value);
    }}
  >
    <Ariakit.SelectProvider setValue={setInternal} value={internal} defaultValue={multiple ? [] : undefined}>
      <Ariakit.Select className={base()}>
      <div className={valueStyle()}>
        {options?.[internal] ?? placeholder}
        </div>
        <div className={icon()}>
          <Icon remix="RiArrowDropDownLine" />
        </div>
      </Ariakit.Select>
      <Ariakit.SelectPopover gutter={4} className={dropdown()}>
        <Box look='bold' size="sm" content="sm">
        {search && <div className="combobox-wrapper">
          <Ariakit.Combobox
            autoSelect
            placeholder="Search..."
            className={mergeClass(inputStyles({size: "sm", look: "bold"}), "w-full")}
            />
        </div>}
        <Ariakit.ComboboxList>
    {matches.map((value) => (
        <Ariakit.SelectItem
        key={value}
        value={value}
        className={mergeClass(item())}
        render={<Ariakit.ComboboxItem children={[<Group className="flex-nowrap" key="label">{options?.[value]}</Group>, <Icon key="select" className={mergeClass(check(), !internal?.includes(value) && "opacity-0")} size="sm" remix="RiCheckFill"/>]} />}
        />
      ))}
    </Ariakit.ComboboxList>
          </Box>
      </Ariakit.SelectPopover>
    </Ariakit.SelectProvider>
  </Ariakit.ComboboxProvider>
  );
}
