import { createTable } from "dappkit";

export const [CampaignTable, CampaignRow, CampaignColumns] = createTable({
  dailyRewards: {
    name: "DAILY REWARDS",
    size: "minmax(100px,200px)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  timeRemaining: {
    name: "END OF REWARDS",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-center",
  },
  restrictions: {
    name: "RESTRICTIONS",
    size: "minmax(min-content,1fr)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-center",
  },
  profile: {
    name: "PROFILE",
    size: "minmax(min-content,150px)",
    compactSize: "minmax(min-content,1fr)",
    className: "justify-center",
  },
});
