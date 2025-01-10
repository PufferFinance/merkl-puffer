import { Group, Text, Title } from "dappkit";
import { useMemo } from "react";
import type { ClaimsService } from "src/api/services/claims.service";
import { v4 as uuidv4 } from "uuid";
import HistoricalClaimsTableRow from "./HistoricalClaimsRow";
import { HistoricalClaimsTable } from "./HistoricalClaimsTable";

export type IProps = {
  claims: Awaited<ReturnType<typeof ClaimsService.getForUser>>;
};

export default function HistoricalClaimsLibrary(props: IProps) {
  const { claims } = props;

  const rows = useMemo(() => {
    return claims?.map(claim => <HistoricalClaimsTableRow key={uuidv4()} claim={claim} />);
  }, [claims]);

  return (
    <Group className="flex-row w-full [&>*]:flex-grow">
      {rows?.length > 0 ? (
        <HistoricalClaimsTable
          dividerClassName={index => (index < 2 ? "bg-accent-8" : "bg-main-8")}
          header={
            <Title h={5} className="!text-main-11 w-full">
              Past Claims
            </Title>
          }>
          {rows}
        </HistoricalClaimsTable>
      ) : (
        <Text>No claim transaction found</Text>
      )}
    </Group>
  );
}
