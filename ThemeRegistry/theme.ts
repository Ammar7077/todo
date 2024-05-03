import { extendTheme } from "@mui/joy/styles";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  adjustFontFallback: false, // prevent NextJS from adding its own fallback font
  fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
  display: "swap",
  preload: true,
  variable: "--font-poppins",
});

const theme = extendTheme({
  fontFamily: {
    body: poppins.style.fontFamily,
    display: poppins.style.fontFamily,
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       text: {},
  //       background: {},
  //       primary: {},
  //       neutral: {},
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       background: {},
  //     },
  //   },
  // },

  components: {
    JoyButton: {
      styleOverrides: {},
    },
  },
});

export default theme;
