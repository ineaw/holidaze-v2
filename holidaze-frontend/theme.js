import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    green: "#00FF00",
  },
};

const fontSizes = {
  headerHero: "10rem",
  xxs: "0.8rem",
};

const theme = extendTheme({
  colors,
  fontSizes,
  fonts,
  breakpoints,
});

export default theme;
