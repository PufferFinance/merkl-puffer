import { useParams } from "@remix-run/react";
import { Space } from "dappkit";
import ClaimRewardsLibrary from "src/components/element/rewards/ClaimRewardsLibrary";

export default function Index() {
  const { address } = useParams();

  return (
    <>
      <Space size="md" />
      <ClaimRewardsLibrary />
    </>
  );
}
