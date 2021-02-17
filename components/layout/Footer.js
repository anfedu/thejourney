import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2E86DE",
    paddingTop: theme.spacing(1.5),
    width: "100%",
    height: theme.spacing(6.83),
    textAlign: "center",
    position: "relative",
    bottom: "0%",
    color: "white",
    fontSize: 18,
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1.9),
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(1.9),
    },
  },
  image: {
    position: "absolute",
    bottom: 0,
    right: 0,
    [theme.breakpoints.down("md")]: {
      width: 70,
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  reserved: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  copy: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  typography: {
    [theme.breakpoints.down("md")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Box variant="div" className={classes.root}>
      <Typography variant="h6" className={classes.typography}>
        <span className={classes.copy}>Copyright</span> &copy; 2020
        <span className={classes.reserved}> The Journey -</span> Ahmad Nuril
        Firdaus
        <span className={classes.reserved}>
          - DW17YQDIL. All Rights reserved
        </span>
      </Typography>
    </Box>
  );
}
