import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function StudentHeader() {
  function handleClick() {
    localStorage.removeItem("accessToken");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/studentdash">
          SAC
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/studentdash">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/studentdash/profile">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/studentdash/history">
              History
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <button
                onClick={handleClick}
                style={{ borderStyle: "none", opacity: 0.6 }}
              >
                Logout
              </button>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
