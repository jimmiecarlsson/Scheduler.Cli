import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaRadio } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { logout } from "../api/scheduleApi";

const Menu = ({ isLoggedIn, user, onLogout }) => {





    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><FaRadio /> Radio</Navbar.Brand>

                    {isLoggedIn && (
                        <Nav className="me-auto">
                            {(user?.role === "Contributor" || user?.role === "Admin") && (
                                <Nav.Link as={NavLink} to="/">Hem</Nav.Link>
                            )}
                            {(user?.role === "Contributor" || user?.role === "Admin") && (
                                <Nav.Link as={NavLink} to="/today">Idag</Nav.Link>
                            )}
                            {user?.role === "Admin" && (
                                <Nav.Link as={NavLink} to="/all">Alla</Nav.Link>
                            )}
                            {user?.role === "Admin" && (
                                <Nav.Link as={NavLink} to="/newblock">+</Nav.Link>
                            )}
                        </Nav>
                    )}

                    {isLoggedIn && (
                        <Nav.Link
                            as={NavLink}
                            to="/profile"
                            className="ms-3 d-flex align-items-center"
                        >
                            <FaUserCircle size={22} />
                        </Nav.Link>
                    )}

                    {isLoggedIn && user && (
                        <div className="ms-3">
                            <small>{user?.email || "Admin" }</small>
                            <br />
                            <span className="text-muted">{user?.role}</span>
                        </div>
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
