import * as React from "react";

import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID
} from "@mui/material/styles";

// Icons
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";

// Joy UI components
import {
 
  IconButton,
 
} from "@mui/joy";

import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme
} from "@mui/joy/styles";

export default function ToggleMode (){
  const { mode, setMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      onClick={() => {
        setMode(mode === "dark" ? "light" : "dark");
        setJoyMode(mode === "dark" ? "light" : "dark");
      }}
    >
      {mode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};



