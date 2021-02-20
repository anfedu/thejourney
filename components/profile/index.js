import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import CardProfile from "./CardProfile";
import { QueryContext } from "../../src/Query";
import { AuthContext } from "../../src/Provider";
import History from "./History";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E5E5E5",
    padding: "2% 2.5% 3% 2.5%",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 2%",
    },
  },
  button: {
    height: 48,
    width: 150,
    backgroundColor: "#ffaf00",
    color: "white",
    textTransform: "none",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 48,
    fontWeight: 900,
    [theme.breakpoints.down("sm")]: {
      fontSize: 36,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
    },
  },
}));

export default function Admin() {
  const classes = useStyles();
  const context = React.useContext(AuthContext);
  const query = React.useContext(QueryContext);
  const { user, login } = context;
  const { getJourneyUser, state, loading } = query;
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (user) {
      getJourneyUser(parseInt(user.id));
    }
  }, [user]);
  React.useEffect(() => {
    if (state.journeyUser) {
      setRows(state.journeyUser);
    }
  }, [state.journeyUser]);
  return (
    <Grid className={classes.root} container spacing={0}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Typography variant="h1" className={classes.title}>
          Profile
        </Typography>
      </Grid>
      <CardProfile user={user} login={login} />
      <History rows={rows} user={user} loading={loading} />
    </Grid>
  );
}
