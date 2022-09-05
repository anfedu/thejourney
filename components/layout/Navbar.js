import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Drawer from "./Drawer";
import { AuthContext } from "../../src/Provider";
// import UserMenu from "./UserMenu";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "../../src/Link";

const ModalNoSsr = dynamic(() => import("./Modal"), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar: {
    margin: 0,
    boxShadow: "none",
    [theme.breakpoints.up("lg")]: {
      height: theme.spacing(9),
      padding: "0 5.3%",
    },
  },
  toolbar: {
    display: "flext",
    justifyContent: "space-between",
  },
  register: {
    backgroundColor: "#2E86DE",
    color: "white",
    textTransform: "none",
    height: 30,
    width: 100,
    fontWeight: "bold",
    boxShadow: "none",
    "&:hover": {
      background: "none",
      border: "1px solid white",
    },
  },
  login: {
    background: "none",
    border: "1px solid white",
    color: "white",
    marginRight: 10,
    height: 30,
    width: 100,
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#2E86DE",
      border: "none",
    },
  },
  icon: {
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      left: -5,
      top: "1.3%",
    },
  },
  linkWrap: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function Navbar({}) {
  const classes = useStyles();
  const router = useRouter();
  const context = useContext(AuthContext);
  const { user, logout } = context;

  const [open, setOpen] = React.useState({
    login: false,
    register: false,
    modal: "",
  });

  const handleClickLogin = () => {
    setOpen({ modal: "login", login: true });
  };

  const handleClickRegister = () => {
    setOpen({ modal: "register", register: true });
  };

  return (
    <AppBar
      id="header"
      color="transparent"
      position="relative"
      className={classes.appbar}
    >
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <img
            src="/Icon.png"
            className={classes.icon}
            alt="The journey icon"
          />
        </Link>
        <Box className={classes.linkWrap}>
          <Button
            variant="contained"
            className={classes.login}
            onClick={handleClickLogin}
          >
            Login
          </Button>
          {/*<Button
            variant="contained"
            className={classes.register}
            onClick={handleClickRegister}
          >
            Register
          </Button>*/}
        </Box>
        <Drawer
          user={user}
          logout={logout}
          handleClickLogin={handleClickLogin}
          handleClickRegister={handleClickRegister}
        />
        <ModalNoSsr open={open} setOpen={setOpen} />
      </Toolbar>
    </AppBar>
  );
}
