import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "3% 2.5% 3% 2.5%",
    backgroundColor: "#E5E5E5",
    zIndex: 999,
    marginTop: -theme.spacing(7.6),
    [theme.breakpoints.down("xs")]: {
      padding: "20px 1% 20px 1%",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    fontSize: 48,
    fontWeight: 900,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(0),
    },
  },
}));

export default function Index() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container spacing={0} className={classes.container}>
      <Typography variant="h3" className={classes.title}>
        Journey
      </Typography>
      <SearchBar />
    </Grid>
  );
}
