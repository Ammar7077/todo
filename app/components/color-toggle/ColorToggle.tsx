"use client";
import React from "react";
import { useColorScheme } from "@mui/joy/styles";
import { IconButton } from "@mui/joy";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function ColorToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="solid"
      color="neutral"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
    </IconButton>
  );
}

export default ColorToggle;
