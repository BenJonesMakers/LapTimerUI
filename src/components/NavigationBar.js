import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";

const NavigationBar = ({ raceStatus }) => {

  return (
    <Navbar bg="dark" expand="lg" variant="dark" >
      <Nav>
        <Nav.Link as={Link} to="live-race">Live Race</Nav.Link>
        {!raceStatus ? <Nav.Link>Events</Nav.Link> : <Nav.Link as={Link} to="events">Events</Nav.Link>}
        <Nav.Link as={Link} to="drivers">Drivers</Nav.Link>
        <Nav.Link as={Link} to="settings">Settings</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;