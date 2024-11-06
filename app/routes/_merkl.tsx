import { Outlet } from "@remix-run/react";
import { Group } from "dappkit";
import Footer from "src/components/layout/Footer";
import Header from "src/components/layout/Header";

export default function Index() {
  return (
    <>
      <Group size="xl" className="min-h-[100vh] via-main-1 via-[15em] from-main-3 to-main-1 p-md flex-col">
        <Header />
        <div className="grow h-full">
          <Outlet />
        </div>
        <Footer />
      </Group>
    </>
  );
}
