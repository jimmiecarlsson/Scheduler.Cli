import { useState, useEffect } from 'react';

import { getMyContributor, getUsers } from './api/scheduleApi';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';

import Home from "./pages/Home";
import All from "./pages/All";
import Today from "./pages/Today";
import EditBlock from './components/EditBlock';
import ProtectedRoute from "./components/ProtectedRoute";

import ContributorProfile from "./pages/ContributorProfile";
import ContributorPayments from "./pages/ContributorPayments";
import MyPage from "./pages/MyPage";

import AdminUsers from "./pages/AdminUsers";
import AdminUserPayments from "./pages/AdminUserPayments";
import Login from "./pages/Login";


import Menu from "./components/Menu";
import NewBlock from './pages/NewBlock';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState( { role: null });

    console.log("USER:", user);


    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoggedIn) return;

        async function initUser() {
            // 1. Försök Admin
            try {
                await getUsers();
                setUser({ role: "Admin" });
                return;
            } catch { }

            // 2. Försök Contributor
            try {
                const profile = await getMyContributor();
                setUser({ role: "Contributor", ...profile });
                return;
            } catch { }

            // 3. Inloggad utan roll
            setUser({ role: null });
        }

        initUser();
    }, [isLoggedIn]);


    async function handleLogin() {
        setIsLoggedIn(true);
        setUser( { role: null } );   // Viktigt: reset

        navigate("/");
    }

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUser( { role: null } );
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
                                <ContributorProfile
                                    user={user}
                                    onProfileUpdated={(updatedProfile) =>
                                        setUser(prev => ({ ...prev, ...updatedProfile }))
                                    }
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users/:id/payments"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Admin"]}
                            >
                                <AdminUserPayments />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/payments"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Contributor"]}
                            >
                                <ContributorPayments />   
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/mina-sidor"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                userRole={user?.role}
                                allowedRoles={["Contributor"]}
                            >
                                <MyPage user={user} />
                            </ProtectedRoute>
                        }
                    />


                    </Routes>
                </Container>
        </>
    )
}

export default App
