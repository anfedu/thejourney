import Footer from "./Footer";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavbarUser from "./NavbarUser";

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <NavbarUser />
      </div>
      <CssBaseline />
      {children}
      <Footer />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "100vw",
    width: "100%",
  },
  container: {
    minHeight: "81.9vh",
  },
}));
