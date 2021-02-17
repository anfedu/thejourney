import React, { useEffect } from "react";
import LayoutHome from "../components/layout/Home";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SearchBar from "../components/jumbotron/SearchBar";
import Home from "../components/home";
import Dashboard from "../components/dashboard";
import { AuthContext } from "../src/Provider";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "0 2.5% 3% 2.5%",
    minHeight: "30vh",
    backgroundColor: "#E5E5E5",
    zIndex: 999,
    marginTop: -theme.spacing(7.6),
    [theme.breakpoints.down("xs")]: {
      padding: "20px 1% 20px 1%",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    fontSize: 48,
    fontWeight: 900,
  },
}));

export default function Index() {
  const classes = useStyles();
  const context = React.useContext(AuthContext);
  const { user } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <>{user.token ? <Dashboard /> : <Home />}</>;
}
