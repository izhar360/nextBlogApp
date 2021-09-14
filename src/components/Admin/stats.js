import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "./statsCard";

import PeopleIcon from "@material-ui/icons/People";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Recent from "./recent";
import Fade from "react-reveal/Fade";

/**
 * @author
 * @function Stats
 **/

const useStyles = makeStyles({
  stats: {
    margin: "50px 10px 10px 10px",
  },
  recent: {
    marginTop: "40px",
  },
});

const Stats = (props) => {
  const classes = useStyles();

  const Cards = [
    {
      name: "Followers",
      icon: (
        <PeopleIcon color="primary" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      name: "Posts",
      icon: (
        <FileCopyIcon
          color="primary"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      name: "Likes",
      icon: (
        <FavoriteIcon color="error" style={{ width: "50px", height: "50px" }} />
      ),
    },
    {
      name: "Stats",
      icon: (
        <EqualizerIcon
          color="action"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.stats}
    >
      <Grid item container spacing={5} direction="row">
        {Cards.map((card, i) => (
          <Grid item key={i}>
            <Fade right delay={parseInt(`${i * 200}`)}>
              {" "}
              <Card title={card.name} number="42034" Icon={card.icon} />
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Grid item container direction="column" className={classes.recent}>
        <Recent />
      </Grid>
    </Grid>
  );
};

export default Stats;
