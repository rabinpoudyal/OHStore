import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { logout, selectIsSignedIn } from "./features/login/loginSlice";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

import styles from "./Navbar.module.css";

const StoreNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsSignedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar color="dark" dark expand="sm">
      <div className="container">
        <NavbarBrand href="/" className={styles.navbarBrandSection}>
          <img
            src={logo}
            alt="Wine Bottle"
            width="30"
            height="30"
            className="d-inline-block align-top mr-2"
          />
          <span className={styles.navbarBrand}>OH Store</span>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            {isLoggedIn ? (
              <Link to="#" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                Login
              </Link>
            )}
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};

export default StoreNavbar;
