import type { Opportunity } from "@merkl/api";
import type { IconProps } from "dappkit";

export const statuses = {
  LIVE: {
    label: "Live",
    description: "Opportunity on which campaigns are distributing",
    icon: { remix: "RiFlashlightLine" },
  },
  PAST: {
    label: "Past",
    description: "Earn rewards by depositiong liquidity in this pool.",
    icon: { remix: "RiHistoryLine" },
  },
  SOON: {
    label: "Soon",
    description: "Earn rewards by depositiong liquidity in this pool.",
    icon: { remix: "RiTimerLine" },
  },
  NONE: {
    label: "None",
    description: "Earn rewards by depositiong liquidity in this pool.",
    icon: { remix: "RiTimerLine" },
  },
} satisfies { [S in Opportunity["status"]]: { label: string; icon: IconProps; description: string } };

export type Status = keyof typeof statuses;

export function getStatus(labelOrKey: string): Status | undefined {
  for (const [status, { label }] of Object.entries(statuses)) {
    if (label?.toLowerCase() === labelOrKey?.toLowerCase() || status?.toLocaleLowerCase() === labelOrKey?.toLowerCase())
      return status as Status;
  }
}
