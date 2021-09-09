import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import BlogDrawer from "../src/components/Admin/BlogDrawer";
import Stats from "../src/components/Admin/stats";

const useStyles = makeStyles({});

export default function Admin() {
  const classes = useStyles();

  return (
    <div>
      {/* main gird */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className={classes.Admin}
      >
        {/* grid for part 1: drawer */}
        <Grid item xs={2}>
          <BlogDrawer />
        </Grid>

        <Grid item xs={7}>
          <Stats />
        </Grid>

        <Grid item xs={3} style={{ background: "#CC573A" }}>
          <h1>Extras</h1>
        </Grid>
      </Grid>
    </div>
  );
}
