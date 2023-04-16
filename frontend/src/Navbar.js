import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import {
  logout,
  logoutAsync,
  selectIsSignedIn,
} from "./features/login/loginSlice";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

import styles from "./Navbar.module.css";
import { FormattedMessage, FormattedPlural } from "react-intl";

const StoreNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsSignedIn);

  const handleLogout = () => {
    dispatch(logoutAsync()).then(() => dispatch(logout()));
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
          <span className={styles.navbarBrand}>
            <FormattedMessage id="appName" />
            </span>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <Link to="/products" className="nav-link">
            <FormattedPlural id="product" />
          </Link>
          <NavItem>
            {isLoggedIn ? (
              <Link to="#" className="nav-link" onClick={handleLogout}>
                <FormattedMessage id="logout" />
              </Link>
            ) : (
              <Link to="/login" className="nav-link">
                <FormattedMessage id="login" />
              </Link>
            )}
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};

export default StoreNavbar;
