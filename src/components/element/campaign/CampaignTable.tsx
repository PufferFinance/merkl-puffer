import { createTable } from "dappkit";

export const [CampaignTable, CampaignRow, CampaignColumns] = createTable({
  dailyRewards: {
    name: "DAILY REWARDS",
    size: "minmax(175px,200px)",
    compact: "1fr",
    className: "justify-start",
    main: true,
  },
  timeRemaining: {
    name: "END",
    size: "minmax(10px,150px)",
    compactSize: "minmax(20px,1fr)",
    className: "justify-center",
  },
  restrictions: {
    name: "RESTRICTIONS",
    size: "minmax(120px,1fr)",
    compactSize: "minmax(10px,1fr)",
    className: "justify-start",
  },
  profile: {
    name: "PROFILE",
    size: "minmax(100px,200px)",
    compactSize: "minmax(100px,1fr)",
    className: "justify-start",
  },
  arrow: {
    name: "",
    size: "20px",
    compactSize: "20px",
    className: "justify-end",
  },
});
