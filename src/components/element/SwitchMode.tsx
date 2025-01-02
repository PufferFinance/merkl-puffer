import { Button, Icon, Select, useTheme } from "dappkit";
import config from "merkl.config";
import { useMemo } from "react";

export default function SwitchMode() {
  const { mode, toggleMode, themes, theme, setTheme } = useTheme();
  const canSwitchModes = useMemo(() => !(!config.modes || config.modes?.length === 1), []);

  const themeOptions = useMemo(() => {
    return Object.keys(themes).reduce(
      (obj, name) =>
        Object.assign(obj, {
          [name]: name,
        }),
      {},
    );
  }, [themes]);

  return (
    <>
      {process.env.NODE_ENV !== "production" && Object.keys(themeOptions)?.length > 1 && (
        <Select state={[theme, setTheme]} options={themeOptions} />
      )}
      {canSwitchModes && (
        <Button look="base" onClick={toggleMode}>
          <Icon remix={mode === "dark" ? "RiMoonClearLine" : "RiSunLine"} />
        </Button>
      )}
    </>
  );
}
