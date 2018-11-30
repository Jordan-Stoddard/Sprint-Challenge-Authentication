import React from "react";
import { Navbar, NavItem } from "react-materialize";

const NavMenu = ({ loggedIn, logOut, history }) => {
  return (
    <Navbar brand="" right>
      <NavItem onClick={() => history.push("/")}>Home</NavItem>
      {loggedIn === false ? (
        <NavItem onClick={() => history.push("/sign-in")}>Log In</NavItem>
      ) : null}
      {loggedIn === false ? (
        <NavItem onClick={() => history.push("/sign-up")}>Register</NavItem>
      ) : null}
      {loggedIn === false ? null : (
        <NavItem onClick={() => history.push("/jokelist")}>Jokelist</NavItem>
      )}

      {loggedIn === false ? (
        undefined
      ) : (
        <NavItem onClick={() => logOut()}>Logout</NavItem>
      )}
    </Navbar>
  );
};

export default NavMenu;
