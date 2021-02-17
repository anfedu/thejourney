import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import CardProfile from "./CardProfile";
import { QueryContext } from "../../src/Query";
import { AuthContext } from "../../src/Provider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E5E5E5",
    padding: "100px 13vh",
    // minHeight: "81.9vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "82.99vh",
      padding: "90px 1vh",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "87.1vh",
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
}));

export default function Admin() {
  const classes = useStyles();
  const context = React.useContext(AuthContext);
  const query = React.useContext(QueryContext);
  const { user, login } = context;
  const { getTransactionUser, state } = query;
  React.useEffect(() => {
    if (user) {
      getTransactionUser(user.id);
    }
  }, [user]);
  return (
    <Grid className={classes.root} container spacing={0} justify="center">
      <CardProfile user={user} login={login} />
    </Grid>
  );
}
