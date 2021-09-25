import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import { Grid } from "@material-ui/core";
import Zoom from "react-reveal/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
/**
 * @author
 * @function SortedPosts
 **/
const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: "0 20px",
  },

  root: {
    // maxWidth: 445,
    width: "360px",

    textDecoration: "none",
  },
  media: {
    height: 180,
  },
  // CardsContainer: {
  //   display: "flex",
  //   margin: "0 auto",
  // },
  btn: {
    fontSize: "20px",
    active: {
      borderBottom: "3px solid red",
    },
  },
}));

const SortedPosts = ({ data }) => {
  const classes = useStyles();
  const [renderEls, setrenderEls] = useState("loading...");
  const router = useRouter();

  useEffect(() => {
    let mappedData = data.map((post) => (
      <Grid
        key={post._id}
        className={classes.gridItem}
        item
        xs={12}
        sm={5}
        md={4}
        lg={3}
      >
        <Zoom>
          <Card
            className={classes.root}
            component={Link}
            href={{
              pathname: "/posts/[id]",
              query: { id: post._id },
            }}
            key={post.id}
          >
            <CardActionArea>
              <CardMedia
                className={classes.media}
                // image={`${process.env.PUBLIC_URL}/assets/${post.image}.jpg`}
                image={post.selectedFile}
                title="imgcard"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {" "}
                  {post.message.length > 90
                    ? post.message.slice(0, 90)
                    : post.message}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Zoom>
      </Grid>
    ));
    setrenderEls(mappedData);
  }, [data]);
  return (
    <Grid container direction="column" spacing={4}>
      <Grid
        container
        item
        // className={classes.CardsContainer}
        style={{ marginTop: "30px" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {renderEls}
        {/* {loading && (
        <h1 style={{ color: "red", fontSize: "30px" }}>loading...</h1>
      )} */}
      </Grid>

      <Grid item container justifyContent="center">
        <Button
          className={classes.btn}
          style={{ color: "#0993A2" }}
          color="inherit"
          onClick={() => router.push("/articles")}
        >
          See All
        </Button>
      </Grid>
    </Grid>
  );
};

export default SortedPosts;
