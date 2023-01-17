import { LockOpen } from "@mui/icons-material";
import { Button } from "@mui/material";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "../Navbar/Navbar.module.css";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  let navigate = useNavigate();
  const authCtx = React.useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();

    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Great Blogs</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/posts/add-post"
            >
              New Post
            </NavLink>
          </li>
          <li>
            {!isLoggedIn && (
              <NavLink to="/login">
                <Button
                  className={classes.button}
                  variant="outlined"
                  size="large"
                  sx={{ marginTop: -1 }}
                >
                  Login
                </Button>
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                className={(navData) =>
                  navData.isActive ? classes.active : ""
                }
                to={{
                  pathname: "/users/" + localStorage.getItem("currentUser"),
                }}
              >
                Profile
              </NavLink>
            )}

            {isLoggedIn && (
              <Button className={classes.active} onClick={logoutHandler}>
                <LockOpen />
                Logout
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
