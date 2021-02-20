import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { QueryContext } from "../../src/Query";
import { AuthContext } from "../../src/Provider";
import { Grid, Typography } from "@material-ui/core";
import CardTripSkeleton from "../skeleton/CardTripSkeleton";
import { CardTrip } from "../../src/CardFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 2.5% 3% 2.5%",
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    [theme.breakpoints.up("lg")]: {
      marginBottom: "3%",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
    },
  },
}));

export default function index() {
  const classes = useStyles();
  const query = React.useContext(QueryContext);
  const context = React.useContext(AuthContext);
  const { user } = context;
  const { getJourneyBookmark, state, loading } = query;
  React.useEffect(() => {
    if (user.id) {
      getJourneyBookmark(parseInt(user.id));
    }
  }, [user.id]);

  const rows = state.journeyBookmark;

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} sm={12} lg={12}>
        <Typography variant="h1" className={classes.title}>
          Bookmark
        </Typography>
      </Grid>
      {loading
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
          ))}
    </Grid>
  );
}
