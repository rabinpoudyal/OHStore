import { useState } from "react";
import { useSelector } from "react-redux";
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
import { selectIsSignedIn } from "./features/login/loginSlice";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

const StoreNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsSignedIn);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="sm" className={styles.navbarPadding}>
      <NavbarBrand href="/">Brand Name</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/signup/">Sign Up</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default StoreNavbar;
