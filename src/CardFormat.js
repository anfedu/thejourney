import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import "aos/dist/aos.css";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Box,
  Divider,
  IconButton,
} from "@material-ui/core";
import { formatDate, formatString } from "./formatter";
import dynamic from "next/dynamic";

const useStyles = makeStyles((theme) => ({
  cardTrip: {
    width: 300,
    height: 362,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#ffffee",
    },
    [theme.breakpoints.down("xs")]: {
      width: "87%",
    },
    // animation: `$skeletons 5000ms ease`,
  },
  "@keyframes skeletons": {
    "0%": {
      position: "relative",
      bottom: -300,
    },
    "100%": {
      position: "relative",
      bottom: 0,
    },
  },
  container: {
    padding: "7px 9px",
  },
  media: {
    width: "100%",
    height: 180,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 5,
  },
  description: {
    marginTop: theme.spacing(2),
    fontWeight: 400,
    fontSize: 14,
    textAlign: "justify",
  },
  icon: {
    height: 68,
    width: 189,
    [theme.breakpoints.down("xs")]: {
      width: 120,
      height: 40,
    },
  },
  body: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#959595",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  approve: {
    width: 115,
    height: 24,
    fontSize: 12,
    borderColor: "#0ACF83",
    color: "#0ACF83",
    backgroundColor: "rgba(255,189,203, 0.1)",
    borderRadius: 3,
  },
  danger: {
    width: 115,
    height: 24,
    fontSize: 12,
    borderColor: "#f48fb1",
    color: "#f48fb1",
    backgroundColor: "rgba(255,189,203, 0.1)",
    borderRadius: 3,
  },
  warning: {
    width: 115,
    height: 24,
    fontSize: 12,
    borderColor: "#ffcc00",
    color: "#ffcc00",
    backgroundColor: "rgba(255,189,203, 0.1)",
    borderRadius: 3,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: 800,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      marginTop: 25,
    },
  },
  book: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Nunito",
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
    },
  },
  date: {
    fontFamily: "Nunito",
    fontSize: 18,
    color: "#878787",
    fontWeight: 300,
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
  },
  image: {
    width: 138,
    height: 138,
    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
    },
  },
  buttonImage: {
    marginTop: 20,
    width: 138,
    height: 138,
    backgroundColor: "#eee",
    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
    },
  },
  user: {
    fontFamily: "Nunito",
    color: "#b1b1b1",
    fontSize: 18,
    marginTop: 13,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      fontSize: 12,
    },
  },
  divider: {
    width: 1033,
    height: 2,
    position: "absolute",
    marginLeft: -33,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  qty: {
    display: "flex",
    justifyContent: "space-between",
    width: 100,
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: 800,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      width: 80,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      fontSize: 12,
      width: 50,
    },
  },
  count: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: 800,
    marginLeft: [theme.spacing(3)],
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      fontSize: 12,
    },
  },
  bookmark: {
    backgroundColor: "white",
    position: "absolute",
    width: 30,
    height: 30,
    marginTop: "0.7%",
    marginLeft: theme.spacing(32.5),
    "&:hover": {
      backgroundColor: "#ddd",
    },
  },
}));

const url = process.env.server;
const date = new Date();

export function CardTrip({ item, index }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <Card className={classes.cardTrip}>
      <IconButton className={classes.bookmark}>
        <img style={{ width: 20, height: 20 }} src="/bookmark.png" alt="" />
      </IconButton>
      <img
        className={classes.media}
        onLoad={() => {}}
        onError={() => {}}
        src={`${url}/images/${item.image}`}
        alt=""
      />
      <Box variant="div" className={classes.container}>
        <Typography variant="h6" className={classes.title}>
          {formatString(item.title, 23)}
        </Typography>
        <Typography
          variant="body2"
          style={{
            textAlign: "justify",
            marginTop: 2,
            fontSize: 12,
            color: "#bfbfbf",
          }}
        >
          {formatDate(item.dateTrip)}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {formatString(item.description, 130)}
        </Typography>
      </Box>
    </Card>
  );
}
