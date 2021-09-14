import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

/**
 * @author
 * @function Card
 **/
const useStyles = makeStyles((theme) => ({
  Card: {
    width: "auto",
    padding: "10px",
    borderRadius: "10px",
    background: "#fff",
    ...theme.borderWithShadow,
  },

  numberTitle: {
    marginLeft: "10px",
  },
  number: {
    fontWeight: "500",
    marginRight: "8px",
  },
  title: {
    fontSize: "12px",
  },
}));

const Card = ({ Icon, number, title }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      className={classes.Card}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs>
        {Icon}
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs
        className={classes.numberTitle}
      >
        <Grid item className={classes.number}>
          {number}
        </Grid>
        <Grid item className={classes.title}>
          {title}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Card;
