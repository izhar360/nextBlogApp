import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../../src/components/header";
import { useTheme } from "@material-ui/core/styles";

import Fade from "react-reveal/Fade";
import Commentbox from "../../src/components/comments/CommentBox";
import DesciptionTest from "../../src/components/descriptionTest";
import { PostsContext } from "../..//src/Context/blogContext";
import { UserContext } from "../../src/Context/userContext";
import Like from "../../src/components/like";
import { Grid, Typography, Chip } from "@material-ui/core";

/**
 * @author
 * @function SinglePost
 **/

const useStyles = makeStyles((theme) => ({
  main: {
    "& a": {
      color: theme.palette.common.blue,
      textDecoration: "none",
    },
  },
  expand: {
    width: "100%",

    textAlign: "center",
  },
  expandIcon: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("md")]: {
      width: "80px",
      height: "80px",
    },
  },

  cover: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
  },
  coverInner: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    height: "100vh",
  },
  coverInner2: {
    width: "70%",
    margin: "0 auto",
    marginTop: "7%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  title: {
    fontSize: "4.6875rem",
    lineHeight: "1.1",
    fontWeight: "800",
    marginBottom: "3%",

    [theme.breakpoints.down("md")]: {
      fontSize: "44px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "42px",
    },
  },
  brief: {
    fontSize: "20px",
    lineHeight: "1.55",
    marginTop: "3%",
    [theme.breakpoints.down("md")]: {
      fontSize: "26px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  readTime: {
    fontSize: "19px",
    marginTop: "20px",
  },
}));

const SinglePost = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { Posts } = React.useContext(PostsContext);
  const { user } = React.useContext(UserContext);
  console.log(user);
  const classes = useStyles();

  const singlePost = Posts.find((post) => post.slug === id);
  const theme = useTheme();

  const calculateReadTime = () => {
    if (singlePost) {
      const n = (singlePost.description + "").split(" ").length / 200;

      return Math.ceil(n);
    }
  };

  return (
    <>
      <Grid container className={classes.main} direction="column">
        <Grid
          container
          direction="column"
          style={{
            backgroundImage: singlePost && `url("${singlePost.selectedFile}")`,
          }}
          className={classes.cover}
        >
          <div className={classes.coverInner}>
            <Header color="#fff" />
            <Grid
              item
              container
              direction="column"
              className={classes.coverInner2}
            >
              <Fade bottom delay={100}>
                <Grid item>
                  <Typography className={classes.title}>
                    {singlePost && singlePost.title}
                  </Typography>
                </Grid>
              </Fade>
              <Fade bottom delay={300}>
                <Grid item>
                  <Chip
                    className={classes.chip}
                    label={"test"}
                    variant="outlined"
                    style={{
                      backgroundColor: "#1c93c5",
                      fontSize: "14px",
                      padding: "7px 3px",
                      fontWeight: "bold",
                      color: "#fff",

                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  />
                </Grid>
              </Fade>
              <Fade bottom delay={500}>
                <Grid item>
                  <Typography className={classes.brief}>
                    {singlePost && singlePost.message}
                  </Typography>
                </Grid>
              </Fade>
              <Fade bottom delay={600}>
                <Grid item>
                  <Typography className={classes.readTime}>
                    {" "}
                    {calculateReadTime()} minute read{" "}
                  </Typography>
                </Grid>
              </Fade>
              <Fade bottom delay={1000}>
                <Grid item className={classes.expand}>
                  <ExpandMoreIcon className={classes.expandIcon} />
                </Grid>
              </Fade>
            </Grid>
          </div>
        </Grid>

        <Grid item>
          <DesciptionTest
            blockContent={singlePost && singlePost.blockContent}
          />
        </Grid>
        <Grid item>{singlePost && <Like id={id} />}</Grid>
        <Grid item>
          <Commentbox id={id} user={user} />
        </Grid>
      </Grid>
    </>
  );
};

export default SinglePost;
