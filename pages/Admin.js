import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import BlogDrawer from "../src/components/Admin/BlogDrawer";
import Stats from "../src/components/Admin/stats";
import Comments from "../src/components/Admin/comments";

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

        <Grid item xs={3}>
          <Comments />
        </Grid>
      </Grid>
    </div>
  );
}
