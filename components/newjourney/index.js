import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import { Typography, Box, TextField, Grid } from "@material-ui/core";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "81.7vh",
    paddingTop: "2%",
    paddingBottom: "3%",
    [theme.breakpoints.down("md")]: {
      minHeight: "83vh",
    },
    [theme.breakpoints.down("xs")]: {
      minHeight: "87vh",
    },
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
  textfieldWrap: {
    marginTop: "3%",
    marginBottom: "1.5%",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
    },
  },
}));

export default function index() {
  const classes = useStyles();
  const errors = false;
  const [values, setValues] = React.useState({
    title: "",
    image: "",
    editor: "",
  });
  const onChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [target]: value });
  };
  return (
    <Box variant="div" className={classes.root}>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={11} lg={10}>
          <Typography variant="h1" className={classes.title}>
            New Journey
          </Typography>
        </Grid>
        <Grid item xs={12} sm={11} lg={9} className={classes.textfieldWrap}>
          <label className={classes.label}>Title</label>
          <TextField
            variant="outlined"
            fullWidth
            required
            id="title"
            type="text"
            error={errors ? true : false}
            value={values.title}
            onChange={onChange}
            name="title"
            autoComplete="title"
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
        <Grid item xs={12} sm={11} lg={9}>
          <Editor values={values} setValues={setValues} />
        </Grid>
      </Grid>
    </Box>
  );
}
