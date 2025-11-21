import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiGuitarBassHead } from "react-icons/gi";

const Header = () => {
    return (
        <header className="mb-5">
            <Container>
                <Navbar fixed="top" expand="lg" className="px-2  purple-menu text-center">
                    <Navbar.Brand href="/">
                        <h3 className="mb-0 text-white"><GiGuitarBassHead className="text-white fs-1" /> Radio Gaga</h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="jc-navbar-nav" className="bg-white" />
                    <Navbar.Collapse id="jc-navbar-nav" className="collapse" >
                        <Nav className="nav-masthead">
                            <Nav.Link className="fw-bold py-1 px-0 text-white" aria-current="page" href="/">Home</Nav.Link>
                            <Nav.Link className="fw-bold py-1 px-0 text-white" href="/letsrock">Let's Rock!</Nav.Link>
                            <Nav.Link className="fw-bold py-1 px-0 text-white" href="/presenters">Presenters</Nav.Link>
                            <Nav.Link className="fw-bold py-1 px-0 text-white" href="/upcoming">Upcoming</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header
