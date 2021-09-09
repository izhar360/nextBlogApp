import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";

import Fade from "react-reveal/Fade";
/**
 * @author
 * @function  HomeEvents
 **/

const useStyles = makeStyles((theme) => ({
  edge: {
    width: "100%",
    position: "absolute",
    backgroundColor: "#F6F6F6",
  },

  eventdivtheme: {
    color: "#ffffff",
    textAlign: "center",
  },

  icon: {
    width: "80px",
    height: "80px",
  },
  svgImg: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    "&:hover": {
      backgroundColor: "#C5DA1C",
    },
    [theme.breakpoints.down("md")]: {
      width: "90px",
      height: "90px",
      marginTop: "15px",
    },
  },

  cardContainer: {
    color: "#fff",
  },
  cardContainerSec: {
    padding: "0 70px",
    marginTop: "70px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 40px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 15px",
      marginTop: "50px",
    },
  },
  topic: {
    marginTop: "70px",
    fontSize: "26px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "20px",
    },
  },
  para: {
    marginTop: "20px",
  },
  GetLink: {
    margin: "50px 0px",
    textDecoration: "underline",
  },
}));

const HomeEvents = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  const tempCards = [
    {
      icon: "moon",
      h3: " Life Purpose",
      p: "How to find direction in your life and create your calling",
      delay: "300",
    },
    {
      icon: "chat",
      h3: " True Value",
      p: "discover the true values and create your cookie",
      delay: "500",
    },
    {
      icon: "team-management",
      h3: "Matters",
      p: "How to find what matters and create your calling",
      delay: "700",
    },
    {
      icon: "love",
      h3: "Relation",
      p: "Strengthen your relations and create your calling",
      delay: "900",
    },
  ];

  return (
    <div style={{ backgroundColor: "black" }}>
      <img
        className={classes.edge}
        src="./assets/edge.png"
        alt="edge border image"
      />

      <Grid container direction="column" className={classes.cardContainer}>
        <Grid item style={{ marginTop: "35px", padding: "0 10px" }}>
          <Typography align="center" variant={matchesXS ? "h5" : "h4"}>
            {" "}
            Read My Free Ebooks on Some of Life's Most Important Topics
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          className={classes.cardContainerSec}
          spacing={2}
        >
          {tempCards.map((item) => (
            <Grid
              key={item.delay}
              item
              xs={12}
              sm={6}
              md
              className={classes.card}
            >
              <Fade right delay={parseInt(item.delay)}>
                <Grid item container direction="column" alignItems="center">
                  <Grid item>
                    <img
                      className={classes.svgImg}
                      src={`./assets/${item.icon}.svg`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.topic}>{item.h3}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.para} align="center">
                      {item.p}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.GetLink}>
                      Get the Ebook
                    </Typography>
                    {matchesXS && (
                      <Divider style={{ backgroundColor: "#0276aa" }} />
                    )}
                  </Grid>
                </Grid>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeEvents;
