import { NavLink } from "@remix-run/react";
import { Text } from "dappkit";
import { Icon } from "packages/dappkit/src";
import type { FC } from "react";
import type { routesType } from "src/config/type";
import SearchBar from "../element/functions/SearchBar";

export const LayerMenu: FC<{
  nav: routesType;
  setOpen: (open: boolean) => void;
}> = ({ nav, setOpen }) => {
  return (
    <div className="layermenu z-50 min-w-64 bg-main-2 py-lg px-md flex flex-col">
      <main className="flex-1 overflow-y-scroll w-full">
        <ul className="min-w-max list-none">
          {Object.entries(nav)
            .filter(([key]) => !["privacy", "terms"].includes(key))
            .map(([key, value]) => (
              <li key={value.key} className="border-b-1 first:pt-0 py-lg border-main-11">
                <NavLink
                  onClick={() => setOpen(false)}
                  to={value.route}
                  className="flex items-center gap-md text-main-12 capitalize">
                  <Icon remix={value.icon} className="text-main-11" />
                  <Text size="lg" className="font-bold">
                    {key}
                  </Text>
                </NavLink>
              </li>
            ))}
        </ul>
      </main>
      <footer className="mt-lg">
        <SearchBar />
      </footer>
    </div>
  );
};