import type { Opportunity } from "@merkl/api";
import { Box, Button, Input, Space, Text } from "dappkit";

export type ParticipateProps = {
  opportunity: Opportunity;
};

export default function Participate(_props: ParticipateProps) {
  return (
    <>
      <Box>
        <Box size="sm" look="soft" className="flex-row [&>*]:grow">
          <Button look="bold" className="justify-center">
            Deposit
          </Button>
          <Button look="soft" className="justify-center">
            Withdraw
          </Button>
        </Box>
        <Input header={<Text size="xs">token0</Text>} />
        <Input header={<Text size="xs">token1</Text>} />
        <Button look="hype" className="justify-center">
          Deposit
        </Button>
      </Box>
      <Space size="md" />
      <Text className="text-center w-full" size="sm">
        Warning about the fiability of the feature
      </Text>
    </>
  );
}
