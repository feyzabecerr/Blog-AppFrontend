import { FormControl, TextField, Grid, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import React, { useState } from "react";
import classes from "./Login.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) =>
  value
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const isPassword = (value) => value.length >= 8 ;

function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: enteredUserName,
    isValid: enteredUserNameIsValid,
    hasError: userNameInputHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(isPassword);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(isEmail);

  let formIsValid = false;

  if(enteredEmailIsValid && enteredPasswordIsValid && enteredUserNameIsValid) {
    formIsValid = true;
  }
  

  const sendRequest = (path) => {
    if(!formIsValid) {
      return;
    }

    fetch("/auth/" + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: enteredUserName,
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((res) => {
        res.json();
        setIsLoading(false);
      })
      .then((result) => {
        localStorage.setItem("currentUser", result.id);
        localStorage.setItem("userName", result.username);
      })
      .catch((err) => console.log(err));

      resetUserNameInput();
      resetEmailInput();
      resetPasswordInput();
  
      navigate("/");
  };


  const userNameHelperText = userNameInputHasError
    ? "Please enter a valid username"
    : "";

  const passwordHelperText = passwordInputHasError
    ? "Your password should include minimum 8 letter"
    : "";

  const emailHelperText = emailInputHasError
    ? "Please enter a valid email"
    : "";

  return (
    <section className={classes.auth}>
      <FormControl>
        <Grid align="center">
          <h2>Sign up</h2>
        </Grid>
        <div>
          <TextField
            label="Username"
            placeholder="Enter username"
            error={userNameInputHasError}
            helperText={userNameHelperText}
            onChange={userNameChangeHandler}
            onBlur= {userNameBlurHandler}
            value={enteredUserName}
            margin="normal"
            fullWidth
            required
          >
            Username
          </TextField>
        </div>
        <div>
          <TextField
            label="Email"
            placeholder="Enter email"
            error={emailInputHasError}
            helperText={emailHelperText}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            fullWidth
            margin="normal"
            required
          >
            Email
          </TextField>
        </div>
        <div>
          <TextField
            label="Password"
            placeholder="Enter password"
            error={passwordInputHasError}
            helperText={passwordHelperText}
            type="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            fullWidth
            margin="normal"
            required
          >
            Password
          </TextField>
        </div>

        <div className={classes.action}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={() => sendRequest("register")}
            fullWidth
            disabled={!formIsValid}    
            sx={{marginTop:1, borderRadius:8, height:45}}    
          >
            Sign up
          </Button>
        </div>

        <div className={classes.text}>
          {" "}
          Do you have an account ?
          <Link className={classes.link} to="/login">
            Sign in
          </Link>
        </div>
      </FormControl>
    </section>
  );
}

export default Register;
