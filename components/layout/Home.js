import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar";
import Jumbotron from "../jumbotron";

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <Jumbotron />
      </div>
      {children}
      <Footer />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(18,18,18,0.3) 80%), url('/jumbotron.png') no-repeat fixed",
    backgroundSize: "100vw 510px",
    [theme.breakpoints.down("md")]: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(18,18,18,0.3)), url('/jumbotron.png') no-repeat center center fixed",
      backgroundSize: "cover",
      width: "100%",
    },
  },
}));
