import { useParams } from "@remix-run/react";
import ClaimRewardsLibrary from "src/components/element/rewards/ClaimRewardsLibrary";

export default function Index() {
  const { address } = useParams();

  return <ClaimRewardsLibrary />;
}
