import { useState, useEffect } from 'react';

import { getMyContributor } from './api/scheduleApi';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Home from "./pages/Home";
import All from "./pages/All";
import Today from "./pages/Today";
import EditBlock from './components/EditBlock';
import ProtectedRoute from "./components/ProtectedRoute";
import ContributorProfile from "./pages/ContributorProfile";
import AdminUsers from "./pages/AdminUsers";
import Login from "./pages/Login";


import Menu from "./components/Menu";
import NewBlock from './pages/NewBlock';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    console.log("USER:", user);


    const navigate = useNavigate();

    async function handleLogin() {
        try {
            const profile = await getMyContributor();

            setUser({
                role: "Contributor",   // Vi sätter detta baserat på profilen
                ...profile
            });

            setIsLoggedIn(true);
            navigate("/");

        } catch (err) {
            // Om /me inte hittas (user är Admin eller vanlig user)
            // Då sätter vi bara isLoggedIn = true
            setIsLoggedIn(true);

            // För att undvika krasch pga att user är null
            setUser({
                role: "Admin"   // Eller null om du vill
            });

            navigate("/");
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser(null);
    }

    return (
        <>
                <Container fluid className="mt-0">
                <Menu isLoggedIn={isLoggedIn} onLogout={handleLogout} user={user} />
                </Container>
                <Container className="d-flex justify-content-center align-items-center mt-5">
                    <Routes>

                    <Route path="/login" element={<Login onLogin={handleLogin} />} />

                        <Route path="/admin" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin"]}
                            >
                                <AdminUsers />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin", "Contributor"] }
                            >
                                <Home />
                            </ProtectedRoute>
                        } />

                        <Route path="/all" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin", "Contributor"]}
                            >
                                <All />
                            </ProtectedRoute>
                        } />

                        <Route path="/today" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin", "Contributor"]}
                            >
                                <Today />
                            </ProtectedRoute>

                        } />

                        <Route path="/newblock" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin", "Contributor"]}
                            >
                                <NewBlock />
                            </ProtectedRoute>
                        } />

                        <Route path="/edit/:id" element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin"]}
                            >
                                <EditBlock />
                            </ProtectedRoute>
                        } />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Contributor", "Admin"]}
                            >
                                <ContributorProfile user={ user } />
                            </ProtectedRoute>
                        }
                    />

                    </Routes>
                </Container>
        </>
    )
}

export default App
