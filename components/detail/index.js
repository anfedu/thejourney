import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Content from "./Content";
import { useRouter } from "next/router";
import { QueryContext } from "../../src/Query";
import CardDetailSkeleton from "../skeleton/CardDetailSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E5E5E5",
    padding: "50px 9%",
    // minHeight: "81.9vh",
    [theme.breakpoints.down("md")]: {
      minHeight: "82.99vh",
      padding: "70px 5vh",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "87.1vh",
      padding: "30px 1vh",
    },
  },
  button: {
    height: 48,
    width: 150,
    backgroundColor: "#ffaf00",
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 18,
    "&:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("xs")]: {
      height: 30,
      width: 100,
      fontSize: 16,
    },
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: { fontSize: 25 },
  },
}));

export default function Detail() {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query.id;
  const context = React.useContext(QueryContext);
  const { state, getJourneyDetail, loading } = context;
  const item = state.journeyDetail;

  React.useEffect(() => {
    if (query) {
      getJourneyDetail(query);
    }
  }, [query]);

  return (
    <Box variant="div" className={classes.root}>
      {loading ? (
        <CardDetailSkeleton />
      ) : (
        <Box variant="div">
          <Content item={item} />
        </Box>
      )}
    </Box>
  );
}
