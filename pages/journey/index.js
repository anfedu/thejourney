import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/layout";
import Detail from "../../components/detail";

const useStyles = makeStyles((theme) => ({}));

export default function index() {
  const classes = useStyles();
  return (
    <Layout>
      <Detail />
    </Layout>
  );
}
