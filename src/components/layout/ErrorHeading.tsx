import { Meta, Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Container } from "packages/dappkit/src";
import { useMemo } from "react";
import Heading from "../composite/Heading";

export function ErrorHeading() {
  const error = useRouteError();
  const errorTitle = useMemo(() => {
    if (isRouteErrorResponse(error)) return error.data;
    return "Unavailable";
  }, [error]);
  const errorDetails = useMemo(() => {
    if (isRouteErrorResponse(error)) return "An error occured while fetching this resource";
    return "An error occured while loading this page";
  }, [error]);

  console.error(error);

  return (
    <Container>
      <Meta />
      <Heading
        icons={[{ remix: "RiAlertFill" }]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={errorTitle}
        description={errorDetails}>
        <Outlet />
      </Heading>
    </Container>
  );
}
