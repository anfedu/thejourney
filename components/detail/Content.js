import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import AOS from "aos";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 48,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  subs: {
    color: "#ababab",
    fontSize: 24,
    margin: "5px 0 15px 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 7,
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
    backgroundColor: "hsl(220, 20%, 90%)",
    animation: "loading 0.8s infinite alternate",
  },
  screenWrap: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  "@keyframes loading": {
    "0%": {
      backgroundColor: "hsl(220, 10%, 75%)",
    },
  },
}));

export default function Content({ item }) {
  const classes = useStyles();
  const url = process.env.server;
  React.useEffect(() => {
    if (AOS) {
      AOS.init();
    }
  }, [AOS]);
  return (
    <Grid container spacing={1}>
      <Grid item lg={12}>
        <Typography variant="h1" className={classes.title}>
          {item.title}
        </Typography>
        <Typography variant="body1" className={classes.subs}>
          {item?.country?.name}
        </Typography>
      </Grid>
      <Grid item lg={12}>
        <img
          data-aos="fade-in"
          data-aos-duration="1000"
          src={`${url}/images/${item.image}`}
          className={classes.image}
          onLoad={() => console.log("load")}
          onEnded={() => console.log("end")}
          onError={() => console.log("err")}
          alt=""
        />
      </Grid>
      <Grid item lg={4} className={classes.screenWrap}>
        <img
          src={`${url}/images/${item.screen1}`}
          className={classes.screen}
          alt=""
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.screenWrap}>
        <img
          src={`${url}/images/${item.screen2}`}
          className={classes.screen}
          alt=""
        />
      </Grid>
      <Grid item lg={4} className={classes.screenWrap}>
        <img
          src={`${url}/images/${item.screen3}`}
          className={classes.screen}
          alt=""
        />
      </Grid>
    </Grid>
  );
}
