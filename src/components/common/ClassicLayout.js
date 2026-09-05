import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import classicTheme from "../../theme/classicTheme";

/** Shared chrome for the Classic (/v2) pages. */
export default function ClassicLayout({ children }) {
  return (
    <ThemeProvider theme={classicTheme}>
      <CssBaseline />
      <div style={{ minHeight: "100vh", backgroundColor: "#fbf7ef" }}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
