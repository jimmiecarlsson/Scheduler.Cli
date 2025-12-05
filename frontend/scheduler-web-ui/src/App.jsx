import { useState, useEffect } from 'react';

import { getAll } from './api/scheduleApi';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Home from "./pages/Home";
import All from "./pages/All";
import Today from "./pages/Today";
import EditBlock from './components/EditBlock';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";


import Menu from "./components/Menu";
import NewBlock from './pages/NewBlock';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
        setIsLoggedIn(true);
        navigate("/");

    }

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }

    return (
        <>
                <Container fluid className="mt-0">
                    <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                </Container>
                <Container className="d-flex justify-content-center align-items-center mt-5">
                    <Routes>

                        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
                        
                        <Route path="/" element={
                            <ProtectedRoute isLoggedIn={ isLoggedIn }>
                                <Home />
                            </ProtectedRoute>
                        } />

                        <Route path="/all" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <All />
                            </ProtectedRoute>
                        } />

                        <Route path="/today" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <Today />
                            </ProtectedRoute>

                        } />

                        <Route path="/newblock" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <NewBlock />
                            </ProtectedRoute>
                        } />

                        <Route path="/edit/:id" element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <EditBlock />
                            </ProtectedRoute>
                        } />

                    </Routes>
                </Container>
        </>
    )
}

export default App
