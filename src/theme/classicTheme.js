import { createMuiTheme } from "@material-ui/core/styles";

const classicTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#7A2E2E",
      dark: "#572020",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#B7791F",
      dark: "#8A5714",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FBF7EF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#302923",
      secondary: "#665C52",
    },
  },
  typography: {
    fontFamily:
      '"Noto Sans Devanagari", "Nirmala UI", "Segoe UI", Arial, sans-serif',
    fontSize: 16,
    h4: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiButton: {
      root: {
        minHeight: 48,
        borderRadius: 8,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 12,
      },
    },
  },
});

export default classicTheme;
