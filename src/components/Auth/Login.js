import {
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import useInput from "../../hooks/use-input";
import React, { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";

const isNotEmpty = (value) => value.trim() !== "";
const isPassword = (value) => value.length >= 8 ;

function Login() {

  let navigate = useNavigate();
  const authCtx = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false);


  const {
    value: enteredUserName,
    isValid: enteredUserNameIsValid,
    hasError: userNameInputHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserNameInput
  } = useInput(isNotEmpty);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput
  } = useInput(isPassword);

  let formIsValid = false;

  if(enteredPasswordIsValid && enteredUserNameIsValid){
    formIsValid = true;
    console.log(enteredPassword);

  }


  const sendRequest = (path) => {
    if(!formIsValid) {
      return;
    }
    setIsLoading(true);

    fetch("/auth/" + path, {
      method: "POST",
      body: JSON.stringify({
        username: enteredUserName,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => {
      setIsLoading(false);
      if(res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed';
          throw new Error(errorMessage);
        })
      }
    }).then(data => {
      console.log(data.jwtToken)
      authCtx.login(data.jwtToken);
      localStorage.setItem("currentUser", data.id);
      localStorage.setItem("userName", data.username);
      navigate('/')

    }).catch(err => {
      alert(err.message)
    });
      // .then((res) => res.json())
      // .then((result) => {
      //   localStorage.setItem("myJwtTokenKey","Bearer " + result.jwtToken);
      //   localStorage.setItem("currentUser", result.id);
      //   localStorage.setItem("userName", result.username);
      // })
      // .catch((err) => alert(err.message));

      resetUserNameInput();
      resetPasswordInput();
  };


  const userNameHelperText = userNameInputHasError ? "Please enter a valid username" :"";

  const passwordHelperText = passwordInputHasError ? "Please enter a valid password": "";
  return (
    <section className={classes.auth}>
    <FormControl>
        <h2>Login</h2>
      <div>
        <TextField
          label="Username"
          placeholder="Enter username"
          error={userNameInputHasError}
          helperText={userNameHelperText}
          onChange={userNameChangeHandler}
          onBlur= {userNameBlurHandler}
          value={enteredUserName}
          required
          margin="normal"
          fullWidth
          >
          Username
        </TextField>
         </div>

      <div>
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          error={passwordInputHasError}
          helperText={passwordHelperText}
          onChange={passwordChangeHandler}
          onBlur= {passwordBlurHandler}
          value= {enteredPassword}
          fullWidth
          margin="normal"
          required
        >
          Password
        </TextField>
      </div>

      <div className={classes.actions}>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        onClick={() => sendRequest("login")}
        fullWidth
        sx={{marginTop:1, borderRadius:8, height:45}}    
        disabled={!formIsValid}
      >
        Sign in
      </Button>
      </div>

      <div className={classes.text}>
        {" "}
        Don't have an account ?
        <Link className={classes.link} to="/register">
          Register
        </Link>
      </div>
    </FormControl>
    </section>
  );
}

export default Login;
