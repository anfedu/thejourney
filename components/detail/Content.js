import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { formatDate } from "../../src/formatter";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 48,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  subs: {
    color: "#3B97D3",
    fontSize: 24,
    margin: "5px 0 15px 0",
    [theme.breakpoints.down("xs")]: {
      fontSize: 16,
    },
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 7,
    [theme.breakpoints.down("sm")]: {
      width: "89vw",
      height: 400,
    },
    [theme.breakpoints.down("xs")]: {
      height: 230,
      width: "95.5vw",
    },
    animation: "loading 0.8s infinite alternate",
  },
  "@keyframes loading": {
    "0%": {
      backgroundColor: "hsl(220, 10%, 75%)",
    },
  },
  author: {
    fontSize: 24,
    [theme.breakpoints.down("xs")]: { fontSize: 12, textAlign: "justify" },
  },
}));

export default function Content({ item }) {
  const classes = useStyles();
  const url = process.env.server;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={7} sm={7} lg={6}>
        <Typography variant="h1" className={classes.title}>
          {item.title}
        </Typography>
        <Typography variant="body1" className={classes.subs}>
          {formatDate(item.createdAt)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={5} sm={5} lg={6} align="right">
        <Typography variant="h6" className={classes.author}>
          {item?.user?.username}
        </Typography>
      </Grid>
      <Grid item md={12} lg={12}>
        <img
          src={`${url}/images/${item.image}`}
          className={classes.image}
          onLoad={() => console.log("load")}
          onEnded={() => console.log("end")}
          onError={() => console.log("err")}
          alt=""
        />
      </Grid>
      <Grid item lg={12}>
        <section dangerouslySetInnerHTML={{ __html: item.editor }} />
        <style jsx>{`
          * {
            color: #6c6c6c;
            font-size: 18;
            text-align: justify;
          }
        `}</style>
      </Grid>
    </Grid>
  );
}
