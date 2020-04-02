import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const SoccerBaseNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SoccerBase</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/Teams'>Teams</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/Leagues'>Leagues</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href='/Countries'>Countries</NavLink>
                </NavItem>
            </Nav>
            <Nav className = "ml-auto" navbar>
                <NavLink href='/aboutUs'>About Us</NavLink>
            </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default SoccerBaseNavBar;