import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useLoaderData } from "@remix-run/react";
import "./index.css";
import { DAppProvider } from "dappkit";
import config from "../merkl.config";
import styles from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: styles,
    as: "style",
  },
];

export async function loader(_args: LoaderFunctionArgs) {
  return json({ ENV: { API_URL: process.env.API_URL } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <DAppProvider themes={config.themes} config={config.wagmi}>
      <Outlet />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: needed for browser ENV
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
        }}
      />
    </DAppProvider>
  );
}
