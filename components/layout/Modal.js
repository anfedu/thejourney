import React, { useState, useContext, useEffect } from "react";
import { Dialog, DialogContent, Fade } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { AuthContext } from "../../src/Provider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="in" ref={ref} {...props} />;
});

export default function ModalLogin({ open, setOpen }) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const router = useRouter();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState({
    username: false,
    email: false,
    password: false,
    address: false,
    phone: false,
  });
  const [logins, setLogins] = useState({
    email: "",
    password: "",
  });
  const [registers, setRegisters] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleClose = () => {
    setOpen({ login: false, register: false });
    setLogins({ email: "", password: "" });
    setRegisters({
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const res = re.test(email);
    return res;
  }

  const onChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setLogins({ ...logins, [target]: value });
    setRegisters({ ...registers, [target]: value });
    if (value.length < 5) {
      setErrorType({ [target]: true });
    } else if ([target][0] === "email" && !validateEmail(value)) {
      setErrorType({ [target]: true });
    } else {
      setErrorType({ [target]: false });
    }
  };

  const loginUser = async () => {
    setIsLoading(true);
    const url = `${process.env.server}/api/v1/${
      open.login ? "login" : "register"
    }`;
    // const url = `http://localhost:5000/api/v1/${
    //   open.login ? "login" : "register"
    // }`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logins || registers),
    };

    const response = await fetch(url, config);
    const data = await response.json(logins || registers);

    setIsLoading(false);
    if (data.status === 500) {
      setErrors(data.error.message);
    }

    if (data.status === 200) {
      router.prefetch("/");
      context.login(data.data);
      handleClose();
      setLogins({ email: "", password: "" });
      setRegisters({
        username: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    }
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <Dialog
        open={open.login ? open.login : false}
        TransitionComponent={Transition}
        keepMounted
        className={classes.container}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent className={classes.root}>
          <img
            style={{ position: "absolute", top: 0, right: 0 }}
            src="/leaf.png"
            alt=""
          />
          <img
            style={{ position: "absolute", top: 0, left: 0 }}
            src="/maps.png"
            alt=""
          />
          <Login
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
            errors={errors}
            setErrors={setErrors}
            values={logins}
            errorType={errorType}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={open.register ? open.register : false}
        TransitionComponent={Transition}
        keepMounted
        className={classes.container}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className={classes.root}>
          <img
            style={{ position: "absolute", top: 0, right: 0 }}
            src="/leaf.png"
            alt=""
          />
          <img
            style={{ position: "absolute", top: 0, left: 0 }}
            src="/maps.png"
            alt=""
          />
          <Register
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
            errors={errors}
            setErrors={setErrors}
            values={registers}
            errorType={errorType}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    [theme.breakpoints.down("xs")]: {
      marginTop: -100,
    },
  },
}));
