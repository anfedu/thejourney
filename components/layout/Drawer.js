import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MobilRightMenuSlider from "@material-ui/core/Drawer";
import { Box, List, Button, ListItem, Avatar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import UserMenu from "./UserMenu";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
    position: "absolute",
    left: "2rem",
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  listContainer: {
    padding: "20px 20px",
    overflowX: "hidden",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  button: {
    fontSize: "14px",
    color: "white",
    backgroundColor: "#e48800",
    height: 33,
    width: 100,
    borderRadius: 17,
    textTransform: "none",
  },
  menuWrapper: {
    position: "absolute",
    right: 5,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  register: {
    backgroundColor: "#ffaf00",
    color: "white",
    textTransform: "none",
    height: 30,
    width: 100,
    fontWeight: "bold",
    boxShadow: "none",
    fontFamily: "Open Sans",
    "&:hover": {
      background: "none",
      border: "1px solid white",
    },
  },
  login: {
    background: "none",
    border: "1px solid white",
    color: "white",
    marginRight: 20,
    height: 30,
    width: 100,
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: "none",
    fontFamily: "Open Sans",
    "&:hover": {
      backgroundColor: "#ffaf00",
      border: "none",
    },
  },
  avatar: {
    fontWeight: "bold",
    fontSize: 25,
    [theme.breakpoints.down("xs")]: {
      fontSize: 17,
      width: 33,
      height: 33,
    },
  },
}));

export default function SwipeableTemporaryDrawer({
  user,
  logout,
  handleClickLogin,
  handleClickRegister,
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
    drawer: "open",
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const ListMenu = () => (
    <Box
      onClick={() => setState({ right: false })}
      className={classes.listContainer}
      component="div"
    >
      {Object.values(user)[0] !== null ? (
        <UserMenu user={user} logout={logout} drawerState={state.drawer} />
      ) : (
        <List>
          <ListItem>
            <Button
              variant="contained"
              className={classes.login}
              onClick={handleClickLogin}
            >
              Login
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              className={classes.register}
              onClick={handleClickRegister}
            >
              Register
            </Button>
          </ListItem>
        </List>
      )}
    </Box>
  );

  function randomColor(string) {
    return "#f" + string.slice(1, 6);
  }

  return (
    <div className={classes.menuWrapper}>
      <React.Fragment>
        <Button onClick={toggleDrawer("top", true)}>
          {Object.values(user)[0] !== null ? (
            <Avatar
              src={
                user.profile && `${process.env.server}/images/${user.profile}`
              }
              className={classes.avatar}
              style={{
                backgroundColor: randomColor(user.phone ? user.phone : "pink"),
              }}
            >
              {user?.username?.slice(0, 1).toUpperCase()}
            </Avatar>
          ) : (
            <MenuIcon
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            />
          )}
        </Button>
        <MobilRightMenuSlider
          classes={{
            paper: classes.paper,
          }}
          anchor={"top"}
          open={state.top}
          onClose={toggleDrawer("top", false)}
        >
          <ListMenu />
        </MobilRightMenuSlider>
      </React.Fragment>
    </div>
  );
}
