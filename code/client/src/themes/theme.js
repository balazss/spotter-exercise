import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1AB76C",
      contrastText: "rgba(255,255,255,1)",
    },
    white: {
      main: "#ffffff",
      contrastText: "rgba(0,0,0,1)",
    },
    background: {
      default: "#fafafa",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1400,
      xl: 1920,
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          minHeight: "100px",
          "@media (min-width: 600px)": {
            minHeight: "100px",
          },
        },
      },
    },
  },
});
