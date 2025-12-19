import React from 'react'
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaRadio } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { GiGuitarBassHead } from "react-icons/gi";

import { logout } from "../api/scheduleApi";

const Menu = ({ isLoggedIn, user, onLogout }) => {





    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <h3 className="mb-0 text-black"><GiGuitarBassHead className="text-black fs-1" /> Radio Gaga</h3>
                    </Navbar.Brand>

                    {isLoggedIn && (
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Hem</Nav.Link>
                            <Nav.Link as={NavLink} to="/today">Idag</Nav.Link>

                            {user?.role === "Admin" && (
                                <>
                                    <Nav.Link as={NavLink} to="/all">Alla</Nav.Link>
                                    <Nav.Link as={NavLink} to="/newblock">+</Nav.Link>
                                    <Nav.Link as={NavLink} to="/admin">Frilans</Nav.Link>
                                </>
                            )}
                            {user?.role === "Contributor" && (
                                <Nav.Link as={NavLink} to="/mina-sidor">
                                    Mina sidor
                                </Nav.Link>
                            )}
                        </Nav>
                    )}


                    {user?.role === "Contributor" && (
                        <Nav.Link
                            as={NavLink}
                            to="/mina-sidor"
                            className="ms-3 d-flex align-items-center"
                        >
                            <FaUserCircle size={30} />
                        </Nav.Link>
                    )}

                    {isLoggedIn && (
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
