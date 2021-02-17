import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

export default function FormAddtripSkeleton() {
  const classes = useStyles();
  return (
    <Grid container spacing={0} justify="center">
      <Grid item xs={11} sm={10}>
        <Skeleton style={{ height: 50, width: 200 }} />
      </Grid>
      <Grid item xs={11} sm={10}>
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 50 }} />
        <Skeleton style={{ height: 50 }} />
      </Grid>
    </Grid>
  );
}
