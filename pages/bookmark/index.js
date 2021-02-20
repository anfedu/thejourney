import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import Bookmark from "../../components/bookmark";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "81.7vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "82.9vh",
    },
  },
}));

export default function index() {
  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <Bookmark />
      </div>
    </Layout>
  );
}
