import React, { useState, useContext } from "react";
import { Button, TextField, Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Register({
  errors,
  isLoading,
  onChange,
  onSubmit,
  setErrors,
  values,
  errorType,
}) {
  const classes = useStyles();
  const registerArr = [
    { id: 1, Label: "Username", name: "username", type: "text" },
    { id: 2, Label: "Email", name: "email", type: "text" },
    { id: 3, Label: "Password", name: "password", type: "password" },
    { id: 4, Label: "Phone", name: "phone", type: "text" },
    { id: 5, Label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h5"
        style={{ fontSize: 36, fontWeight: "bold" }}
      >
        Register
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
          {registerArr.map((item, index) => (
            <Grid item xs={12} sm={11} key={index}>
              <label
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {item.Label}
              </label>
              <TextField
                variant="outlined"
                required
                size="small"
                fullWidth
                id={`${item.name}`}
                type={`${item.type}`}
                error={errors ? true : false}
                name={`${item.name}`}
                autoComplete={`${item.name}`}
                value={values[item.name]}
                onChange={onChange}
                error={errorType[item.name] ? true : false}
                helperText={errorType[item.name] && `${item.Label} is required`}
                InputLabelProps={{
                  shrink: true,
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
                "Register"
              )}
            </Button>
          </Grid>
        </Grid>
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
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
    paddingBottom: 30,
  },
  form: {
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
    fontWeight: "bold",
    backgroundColor: "#2E86DE",
    color: "white",
    height: 50,
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
  cssFocused: {
    fontWeight: 600,
    color: "#777",
  },
  notchedOutline: {
    borderColor: "white",
    border: "none",
  },
}));
