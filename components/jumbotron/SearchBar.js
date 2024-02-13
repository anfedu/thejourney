import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { findData } from "./findData";
import { TextField, Grid, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { QueryContext } from "../../src/Query";
import useOutsideClick from "./outSideClick.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { CardTrip } from "../../src/CardFormat";
import CardTripSkeleton from "../skeleton/CardTripSkeleton";
import { AuthContext } from "../../src/Provider";

export default function SearchBar() {
  const errors = false;
  const classes = useStyles();
  const ref = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  // const matches = theme.breakpoints.down("xs");
  const query = React.useContext(QueryContext);
  const { state, getJourneyUser, loading } = query;
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ search: "" });
  const context = React.useContext(AuthContext);
  const { user } = context;

  React.useEffect(() => {
    getJourneyUser(1);
  }, []);

  const rows = [...state.journeyUser].filter((item, index) => {
    return index < 8;
  });

  useOutsideClick(ref, () => {
    setOpen(false);
    setValues({ search: "" });
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setOpen(false);
    setData(findData(values.search, rows || []));
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      setTimeout(() => {
        setOpen(true);
      }, 1510);
    }
  };

  return (
    <>
      <Grid container spacing={0} className={classes.searchContainer}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <TextField
            variant="outlined"
            fullWidth
            required
            value={values.search}
            id="search"
            type="text"
            error={errors ? true : false}
            name="search"
            autoComplete="search"
            placeholder="Find journey"
            onChange={onChange}
            onKeyDown={keyPress}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Button
            ref={ref}
            fullWidth
            className={classes.button}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setOpen(true);
              }, 1500);
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} style={{ color: "white" }} />
            ) : (
              <React.Fragment>
                <span className={classes.search}>Search</span>
                <SearchIcon className={classes.icon} />
              </React.Fragment>
            )}
          </Button>
        </Grid>
        {data.length === 0 && open ? (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={10}
              lg={10}
              style={{ marginTop: 3, zIndex: 999 }}
            >
              <Alert
                severity="error"
                onClose={() => setOpen(false)}
                className={classes.alert}
              >
                Journey not found
              </Alert>
            </Grid>
            <Grid item xs={0} sm={0} md={2} lg={2}></Grid>
          </>
        ) : (
          Object.keys(values.search).length === 0 &&
          open && (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                style={{ marginTop: 3, zIndex: 999 }}
              >
                <Alert
                  severity="error"
                  onClose={() => setOpen(false)}
                  className={classes.alert}
                >
                  Journey not found
                </Alert>
              </Grid>
              <Grid item xs={0} sm={0} md={2} lg={2}></Grid>
            </>
          )
        )}
      </Grid>
      {loading ? (
        [1, 2, 3, 4].map((item, index) => (
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
      ) : open && Object.keys(values.search).length > 0 ? (
        <Grid container spacing={0}>
          {data.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              align="center"
              style={{ marginTop: 23 }}
            >
              <CardTrip index={index} item={item} user={user} />
            </Grid>
          ))}
        </Grid>
      ) : (
        rows.map((item, index) => (
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
        ))
      )}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#2E86DE",
    height: 50,
    color: "white",
    textTransform: "none",
    fontSize: 18,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#3fa7ff",
    },
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      width: 50,
      right: theme.spacing(1.2),
    },
  },
  cssLabel: {
    color: "pink",
  },
  cssOutlinedInput: {
    backgroundColor: "white",
    height: 50,
  },
  cssFocused: {
    fontWeight: 600,
    border: "2px solid aqua",
    color: "#777",
    "&:hover": {
      border: "2px solid aqua",
    },
  },
  notchedOutline: {
    borderColor: "white",
    border: "none",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon: {
    fontSize: 30,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  card: {
    width: "100%",
    textDecoration: "none",
    height: 57,
    backgroundColor: "rgba(244, 244, 244, 0.9)",
    "&:hover": { backgroundColor: "#eee" },
  },
  locationicon: {
    color: "red",
  },
  bodytitle: {
    marginLeft: -40,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -20,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 3,
    },
  },
  cardContent: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 5,
      paddingRight: 7,
    },
  },
  alert: {
    opacity: 0.9,
  },
  searchContainer: {
    padding: "0 5%",
    marginBottom: "3%",
    [theme.breakpoints.down("xs")]: {
      padding: "0 1%",
    },
  },
}));
