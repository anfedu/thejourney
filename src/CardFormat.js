import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Box } from "@material-ui/core";
import { formatDate, formatString } from "./formatter";
import { useRouter } from "next/router";
import SubmitBookmark from "../components/bookmark/SubmitBookmark";

export function CardTrip({ item, user }) {
  const classes = useStyles();
  const router = useRouter();

  const handleDetail = () => {
    router.push({
      pathname: "/journey",
      query: { id: item.id, username: item.user.username },
      asPath: `/journey/${item.id}`,
    });
  };

  return (
    <Card className={classes.cardTrip}>
      <SubmitBookmark bookmark={classes.bookmark} user={user} item={item} />
      <img
        className={classes.media}
        onLoad={() => {}}
        onError={() => {}}
        src={`/images/${item.image}`}
        alt=""
      />
      <Box variant="div" className={classes.container}>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={handleDetail}
        >
          {formatString(item.title, 23)}
        </Typography>
        <Typography
          variant="body2"
          style={{
            textAlign: "justify",
            marginTop: 2,
            fontSize: 12,
            color: "#666",
          }}
        >
          {formatDate(item.createdAt)}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          {formatString(item?.description, 150)}
        </Typography>
      </Box>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  cardTrip: {
    position: "relative",
    width: "100%",
    height: 362,
    "&:hover": {
      backgroundColor: "#ffffee",
    },
    animation: `$skeletons 1.2s ease`,
    borderRadius: 16,
  },
  "@keyframes skeletons": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  container: {
    padding: "0 9px",
  },
  media: {
    width: "100%",
    height: 180,
    border: "none",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 5,
    cursor: "pointer",
  },
  description: {
    marginTop: 10,
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
    fontSize: 14,
    color: "#959595",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  subtitle: {
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
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      fontSize: 23,
    },
  },
  date: {
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
  bookmark: {
    backgroundColor: "white",
    position: "absolute",
    width: 30,
    height: 30,
    top: 10,
    right: 10,
    zIndex: 999,
    "&:hover": {
      opacity: 0.8,
      backgroundColor: "white",
    },
  },
}));
