import React, { useContext } from "react";
import { Button, TextField, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Login({
  errors,
  isLoading,
  onChange,
  onSubmit,
  setErrors,
  values,
  errorType,
  setOpen,
}) {
  const classes = useStyles();
  const loginArr = [
    { id: 1, label: "Email", name: "email", type: "text" },
    { id: 2, label: "Password", name: "password", type: "password" },
  ];

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h5"
        style={{ fontSize: 36, fontWeight: "bold" }}
      >
        Login
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={11}>
            {errors !== undefined && Object.keys(errors).length > 0 && (
              <Alert
                severity="error"
                className={classes.alert}
                onClose={() => setErrors("")}
              >
                {errors}
              </Alert>
            )}
          </Grid>
          {loginArr.map((item, index) => (
            <Grid item xs={12} sm={11} key={index}>
              <label
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {item.label}
              </label>
              <TextField
                variant="outlined"
                required
                size="small"
                fullWidth
                id={`${item.name}`}
                type={`${item.type}`}
                name={`${item.name}`}
                onChange={onChange}
                value={values[item.name]}
                autoComplete={`${item.name}`}
                error={errorType[item.name] ? true : false}
                helperText={errorType[item.name] && `${item.label} is required`}
                InputLabelProps={{
                  shrink: true,
                  classes: {
                    root: classes.cssLabel,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={11}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onSubmit}
            >
              {isLoading ? (
                <CircularProgress size={23} style={{ color: "white" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Grid>
        </Grid>
        <Box align="center" style={{ color: "#B1B1B1" }}>
          Don't have an account yet?{" "}
          <Button
            color="inherit"
            style={{ textTransform: "none", color: "#777" }}
            onClick={() => setOpen({ login: false, register: true })}
          >
            Register here
          </Button>
        </Box>
      </form>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
    fontWeight: "bold",
    backgroundColor: "#2E86DE",
    height: 50,
    color: "white",
    fontSize: 24,
  },
  alert: {
    margin: "5px 0",
    border: "1px solid rgba(156, 39, 176, 0.8)",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "rgba(156, 39, 176, 0.2)",
  },
  cssLabel: {
    color: "pink",
  },
  cssOutlinedInput: {
    backgroundColor: "#E5E5E5",
  },
  notchedOutline: {
    borderColor: "white",
    border: "none",
  },
}));
