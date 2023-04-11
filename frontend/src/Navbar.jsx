import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";

const StoreNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="primary" light expand="md">
      <NavbarBrand href="/" className="mr-auto text-light">
        OHStore
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="text-light" href="/signin">
              Signin
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-light" href="/logout">
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default StoreNavbar;
