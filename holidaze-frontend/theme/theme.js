import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";



const fonts = { mono: `'Menlo', monospace`,
sans: `'manofa', sans-serif` };

const breakpoints = createBreakpoints({
  sm: "20em",
  base: "31em",
  md: "48em",
  lg: "64em",
  xl: "80em",
});

const colors = {
  brand: {
    text: "#2D1F31",
    dark: "#7F2337",
    darkhover: "#A8344D",
    bright: "#E9444C",
    dull: "#80494C",
    accent: "#7ca8b4",
    400: "#00FF00",
  },
  body: {
    900: "#ffc0cb",
    800: "#153e75",
    700: "#2a69ac",
    600: "#00FF00",
    light: "#F5F5F0",
  },
};

const fontSizes = {
  xxs: "0.8rem",
};

const theme = extendTheme({
  colors,
  fontSizes,
  fonts,
  breakpoints,
  fonts,
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'body.light',
        color: 'brand.text',
        fontWeight: '400',
        margin: "0",
      },
      // styles for the `a`
      a: {
        color: 'black.500',
        _hover: {
        
        },
      },
    },
  },
});

export default theme;
