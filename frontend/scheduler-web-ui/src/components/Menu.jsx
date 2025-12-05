import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaRadio } from "react-icons/fa6";

import { logout } from "../api/scheduleApi";

const Menu = ({ isLoggedIn, onLogout }) => {





    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><FaRadio /> Radio</Navbar.Brand>

                    {isLoggedIn && (
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Hem</Nav.Link>
                            <Nav.Link as={NavLink} to="/today">Idag</Nav.Link>
                            <Nav.Link as={NavLink} to="/all">Alla</Nav.Link>
                            <Nav.Link as={NavLink} to="/newblock">+</Nav.Link>
                        </Nav>
                    )}

                    {isLoggedIn && (
                        <button
                            className="btn btn-outline-secondary ms-3"
                            onClick={() => { logout(); onLogout(); }}
                        >
                            Logga ut
                        </button>
                    )}

                </Container>
            </Navbar>
        </>
    )
}

export default Menu
