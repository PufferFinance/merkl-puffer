import config from "merkl.config";
import { Button, Icon, useTheme } from "packages/dappkit/src";
import { useMemo } from "react";

export default function SwitchMode() {
  const { mode, toggleMode } = useTheme();
  const canSwitchModes = useMemo(() => !(!config.modes || config.modes?.length === 1), []);

  return (
    canSwitchModes && (
      <Button look="base" onClick={toggleMode}>
        <Icon remix={mode === "dark" ? "RiMoonClearLine" : "RiSunLine"} />
      </Button>
    )
  );
}
