import React from "react";
import { Button } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

import Fade from "react-reveal/Fade";

/**
 * @author
 * @function HomeIntro
 **/
const useStyles = makeStyles((theme) => ({
  container: {
    width: "55%",
    margin: "auto",
    height: "auto",
    textAlign: "center",
    paddingTop: "80px",
    color: "#222",
    [theme.breakpoints.down("md")]: {
      width: "70%",
      paddingTop: "70px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      paddingTop: "60px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      paddingTop: "50px",
    },
  },
  mainDiv: {
    backgroundImage: `url("../assets/three.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
  },
  header: {
    fontSize: "65px",
    marginTop: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "55px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "35px",
    },
  },
  paragraphs: {
    fontSize: "22px",
    lineHeight: 1.6,
    [theme.breakpoints.down("xs")]: {
      fontSize: "19px",
    },
  },
  linkSpan: {
    color: "#1c93c5",
  },
  btn: {
    border: "2px solid #000",
    fontSize: "18px",
    padding: " 13px 16px",
    fontWeight: "bold",
    textTransform: "uppercase",

    margin: "5px",
    borderRadius: 0,
    textDecoration: "none",
    textAlign: "center",
    boxSizing: "border-box",
    transition: "all 200ms ease-in-out",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "black",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
      padding: " 5px 10px",
    },
  },
}));

const HomeIntro = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.mainDiv}>
      <div className={classes.container}>
        <Fade bottom delay={100}>
          {" "}
          <h1 className={classes.header}>HI. I’M Jhon.</h1>{" "}
        </Fade>
        <Fade bottom delay={500}>
          <p className={classes.paragraphs}>
            I am the #1 NYTimes Bestselling author of{" "}
            <span className={classes.linkSpan}>The Theory of Everything</span>{" "}
            and <span className={classes.linkSpan}>A Beutiful Mind </span>
            My works explore such universal themes as identity crisis,
            mortality, and the meaning of life through a metaphysical or
            parapsychological framework that is science-based, pragmatic, and
            non-bullshitty - life advice that doesn’t suck. Read on and see for
            yourself.
          </p>{" "}
          <p className={classes.paragraphs} style={{ fontWeight: "700" }}>
            Join Millions of Readers Around the World –{" "}
            <span className={classes.linkSpan}>Start Here</span>
          </p>
        </Fade>
        <div>
          {" "}
          <Fade bottom delay={900}>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={
                <DescriptionIcon
                  style={{
                    width: "35px",
                    height: "35px",
                  }}
                />
              }
              className={classes.btn}
            >
              Read Articles
            </Button>
          </Fade>
          <Fade bottom delay={900}>
            <Button
              className={classes.btn}
              variant="outlined"
              color="inherit"
              startIcon={
                <PersonIcon style={{ width: "30px", height: "30px" }} />
              }
            >
              Subscribe
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;
