import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

/**
 * @author
 * @function Card
 **/
const useStyles = makeStyles({
  Card: {
    border: "1px solid #fff",
    width: "auto",
    padding: "10px",
    borderRadius: "5%",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.24)",
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
});

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
