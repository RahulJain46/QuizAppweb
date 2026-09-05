import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SiteHeader from "../common/SiteHeader";
import HomeRedesign from "./HomeRedesign";
import SiteFooter from "../common/SiteFooter";
import classicTheme from "../../theme/classicTheme";

export default function Design1() {
  return (
    <ThemeProvider theme={classicTheme}>
      <CssBaseline />
      <div style={{ minHeight: "100vh", backgroundColor: "#fbf7ef" }}>
        <SiteHeader />
        <HomeRedesign />
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}
