import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  title: {
    width: 280,
    height: 90,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      height: 50,
      width: 200,
    },
  },
  country: {
    height: 40,
    width: 100,
  },
  image: {
    cardTransaction: {
      marginBottom: 20,
      display: "flex",
      width: 1035,
      height: 690,
      margin: "0 auto",
      border: "1px solid #878787",
      borderRadius: 5,
      padding: "7px 33px 0 33px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: 470,
        padding: "7px 25px 7px 25px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        minHeight: 319,
        padding: "7px 7px 3px 7px",
      },
    },
    width: "100%",
    height: 361,
    borderRadius: 5,
    [theme.breakpoints.down("sm")]: {
      width: "89vw",
    },
    [theme.breakpoints.down("xs")]: {
      height: 230,
      width: "95.5vw",
    },
  },
  screen: {
    width: 323,
    height: 163,
    borderRadius: 5,
  },
  screenWrap: {
    marginTop: 3,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function CardDetailSkeleton() {
  const classes = useStyles();
  return (
    <>
      <Skeleton className={classes.title} />
      <br />
      <Skeleton variant="rect" className={classes.image} />
      <Grid container spacing={1} className={classes.screenWrap}>
        {[1, 2, 3].map((item, index) => (
          <Grid key={index} item lg={4}>
            <Skeleton variant="rect" className={classes.screen} />
          </Grid>
        ))}
      </Grid>
      <Skeleton style={{ width: 200, height: 30, marginTop: 70 }} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
}
