import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import Alert from "@material-ui/lab/Alert";
import { Typography, Box, TextField, Grid } from "@material-ui/core";

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "81.7vh",
    padding: "2% 2.5% 3% 2.5%",
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
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  cssLabel: {
    color: "pink",
    color: "#777",
  },
  cssOutlinedInput: {
    backgroundColor: "white",
    fontWeight: 600,
    color: "#777",
  },
  cssFocused: {
    fontWeight: 600,
    color: "#777",
    border: "1px solid aqua",
    "&:hover": {
      border: "1px solid aqua",
    },
  },
  notchedOutline: {
    borderColor: "white",
    border: "none",
    fontWeight: 600,
    color: "#777",
  },
  textfieldWrap: {
    marginTop: "2%",
    marginBottom: "2%",
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
  const [alert, setAlert] = React.useState({
    error: "",
    success: "",
  });
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
        <Grid item xs={12} sm={11} lg={12}>
          <Typography variant="h1" className={classes.title}>
            New Journey
          </Typography>
        </Grid>
        <Grid item xs={12} sm={11} lg={10} className={classes.textfieldWrap}>
          {alert.error !== undefined && Object.values(alert.error).length > 0 && (
            <Alert severity="error" onClose={() => setAlert({ error: "" })}>
              {alert.error}
            </Alert>
          )}
          {alert.success !== undefined &&
            Object.values(alert.success).length > 0 && (
              <Alert
                severity="success"
                onClose={() => setAlert({ success: "" })}
              >
                {alert.success}
              </Alert>
            )}
          <label className={classes.label}>Title</label>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            required
            id="title"
            type="text"
            error={
              values.error !== undefined &&
              Object.values(alert.error).length > 0
                ? true
                : false
            }
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
        <Grid item xs={12} sm={11} lg={10}>
          <Editor values={values} setValues={setValues} setAlert={setAlert} />
        </Grid>
      </Grid>
    </Box>
  );
}
