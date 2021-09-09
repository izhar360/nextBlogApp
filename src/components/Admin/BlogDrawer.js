import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Link from "../../Link";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PagesIcon from "@material-ui/icons/Pages";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import SettingsIcon from "@material-ui/icons/Settings";
import { Typography } from "@material-ui/core";

/**
 * @author
 * @function BlogDrawer
 **/
const useStyles = makeStyles({
  Drawer: {
    color: "#878FA5",
  },
  ListItem: {
    padding: "20px",
  },
  ListItemIcon: {
    margin: "0px",
  },
  ListItemText: {
    marginLeft: "-13px",
    marginRight: "10px",
  },
  blogText: {
    textAlign: "center",
    color: "#333",
    fontSize: "20px",
    fontWeight: "500",
    marginTop: "30px",
    marginBottom: "30px",
  },
});
const BlogDrawer = (props) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const routes = [
    { name: "Dashboard", icon: <DashboardIcon /> },
    { name: "Posts", icon: <PagesIcon /> },
    { name: "Theme", icon: <ColorLensIcon /> },
    { name: "Settings", icon: <SettingsIcon /> },
  ];

  const dashboardClickHandle = (i) => {
    setSelectedIndex(i);
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{ paper: classes.Drawer }}
    >
      <Typography className={classes.blogText}>Blog</Typography>

      <List>
        {routes.map((option, i) => (
          <ListItem
            selected={i === selectedIndex}
            onClick={() => dashboardClickHandle(i)}
            button
            key={option.name}
            className={classes.ListItem}
          >
            <ListItemIcon className={classes.ListIcon}>
              {option.icon}
            </ListItemIcon>
            <ListItemText className={classes.ListItemText} disableTypography>
              {option.name}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default BlogDrawer;
