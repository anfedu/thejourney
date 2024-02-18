import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

export default function Jumbotron() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        The Journey
      </Typography>
      <Typography variant="h3" className={classes.title}>
        You ever dreamed of.
      </Typography>
      <br />
      <br />
      <Typography variant="body1" className={classes.body}>
        We made a tool so you can easily keep & share your travel memories.
      </Typography>
      <Typography variant="body1" className={classes.body}>
        But there is a lot more
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    color: "white",
    padding: "50px 8.4% 50px 8.6%",
    [theme.breakpoints.down("md")]: {
      padding: "50px 30px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "11% 30px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20% 3% 50px 3%",
    },
  },
  title: {
    fontWeight: 700,
    transition: "width 2s, height 4s",
    fontSize: 64,
    [theme.breakpoints.down("sm")]: {
      fontSize: 50,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 38,
    },
    animation: `$skeletons 1200ms`,
    // display: "block",
  },
  subTitle: {
    fontSize: 64,
    fontWeight: 200,
    letterSpacing: -2,
    animation: `$skeletons 1200ms`,
    display: "block",
    [theme.breakpoints.down("md")]: {
      fontSize: 50,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 33,
      marginTop: 10,
      letterSpacing: -1,
    },
  },
  body: {
    fontWeight: 400,
    fontSize: 24,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  "@keyframes skeletons": {
    "0%": {
      transform: "scaleY(0)",
      transformOrigin: "bottom",
      // position: "relative",
      // bottom: -50,
    },
    "100%": {
      // position: "relative",
      // bottom: 0,
    },
  },
}));
