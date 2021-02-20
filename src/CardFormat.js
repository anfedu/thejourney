import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Card, Typography, Box, IconButton } from "@material-ui/core";
import { formatDate, formatString } from "./formatter";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import SubmitBookmark from "../components/bookmark/SubmitBookmark";

const useStyles = makeStyles((theme) => ({
  cardTrip: {
    width: 300,
    height: 362,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#ffffee",
    },
    animation: `$skeletons 1.2s ease`,
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
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 5,
    cursor: "pointer",
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
  bookmark: {
    backgroundColor: "white",
    position: "absolute",
    width: 30,
    height: 30,
    marginTop: "0.7%",
    marginLeft: theme.spacing(32.5),
    zIndex: 999,
    "&:hover": {
      opacity: 0.8,
      backgroundColor: "white",
    },
  },
}));

const url = process.env.server;

export function CardTrip({ item, index, user }) {
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
        src={`${url}/images/${item.image}`}
        alt=""
      />
      <Box variant="div" className={classes.container}>
        <Typography
          variant="h6"
          className={classes.title}
          onClick={handleDetail}
        >
          {item.title}
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
          {formatDate(item.createdAt)}
        </Typography>
        <Typography variant="body1" className={classes.description}>
          <section
            dangerouslySetInnerHTML={{
              __html: formatString(item.editor.replace(/<[^>]*>/g, ""), 150),
            }}
          />
        </Typography>
      </Box>
    </Card>
  );
}
// {formatString(item.editor.replace(/<p[^>]*>/g, ""), 150)}
// <IconButton
//   className={classes.bookmark}
//   style={{
//     backgroundColor: color,
//   }}
//   onClick={handleUpdate}
// >
//   {loading ? (
//     <CircularProgress size={20} style={{ position: "absolute" }} />
//   ) : (
//     <img style={{ width: 20, height: 20 }} src="/bookmark.png" alt="" />
//   )}
// </IconButton>
