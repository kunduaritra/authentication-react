import { Link, Route, Redirect } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCntx = useContext(AuthContext);
  const isLoggedIn = authCntx.isLoggedin;

  const logoutHandler = () => {
    authCntx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {!isLoggedIn && (
            <Route>
              <Redirect to="/auth" />
            </Route>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
