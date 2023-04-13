import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
  Container,
} from "reactstrap";
import { logout, selectIsSignedIn } from "./features/login/loginSlice";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const StoreNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsSignedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="sm" className={styles.navbarPadding}>
      <NavbarBrand href="/">Brand Name</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          {isLoggedIn ? (
            <Link to ="#" className="nav-link" onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to ="/login" className="nav-link">Login</Link>
          )}
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default StoreNavbar;
