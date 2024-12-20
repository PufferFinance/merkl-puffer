import { Outlet } from "@remix-run/react";
import { Group } from "dappkit";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";

export default function Index() {
  return (
    <>
      <Group size="xl" className="!gap-0 min-h-[100vh] flex-col">
        <Header />
        <main className="grow h-full">
          <Outlet />
        </main>
        <Footer />
      </Group>
    </>
  );
}
