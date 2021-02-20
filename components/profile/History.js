import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { CardTrip } from "../../src/CardFormat";
import CardTripSkeleton from "../skeleton/CardTripSkeleton";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
  },
}));

export default function History({ rows, user, loading }) {
  const classes = useStyles();

  return loading
    ? [1, 2, 3, 4].map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ marginTop: 23 }}
          align="center"
        >
          <CardTripSkeleton />
        </Grid>
      ))
    : rows.map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          style={{ marginTop: 23 }}
          align="center"
        >
          <CardTrip index={index} item={item} user={user} />
        </Grid>
      ));
}
