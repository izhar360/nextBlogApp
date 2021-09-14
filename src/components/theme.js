import React from "react";
import { createTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";
const DashboardFont = "#E2E5ED";
export default createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
      DashboardFont: `${DashboardFont}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: "#ffffff",
    },
  },
  borderWithShadow: {
    border: "1px solid #fff",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.24)",
  },
});
