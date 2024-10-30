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
    size: "minmax(10px,150px)",
    compactSize: "minmax(10px,1fr)",
    className: "justify-center",
  },
  restrictions: {
    name: "RESTRICTIONS",
    size: "minmax(100px,1fr)",
    compactSize: "minmax(10px,1fr)",
    className: "justify-start",
  },
  profile: {
    name: "PROFILE",
    size: "minmax(100px,200px)",
    compactSize: "minmax(100px,1fr)",
    className: "justify-center",
  },
  arrow: {
    name: "",
    size: "20px",
    compactSize: "20px",
    className: "justify-end",
  }
});
