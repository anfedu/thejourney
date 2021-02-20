import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Home from "../components/home";
import Dashboard from "../components/dashboard";
import { AuthContext } from "../src/Provider";
import LayoutHome from "../components/layout/Home";
import Layout from "../components/layout";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90.5vh",
    [theme.breakpoints.down("md")]: {
      minHeight: "91.7vh",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "91.7vh",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "93.3vh",
    },
  },
}));

export default function Index() {
  const classes = useStyles();
  const context = React.useContext(AuthContext);
  const { user } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {user.token ? (
        <Layout>
          <Box variant="div" className={classes.root}>
            <Dashboard />
          </Box>
        </Layout>
      ) : (
        <LayoutHome>
          <Home />
        </LayoutHome>
      )}
    </>
  );
}
