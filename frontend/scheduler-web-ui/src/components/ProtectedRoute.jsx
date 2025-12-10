import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, userRole, allowedRoles = [], children }) => {

    if (!isLoggedIn) {
        return <Navigate to="/login" />
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />
    }

    return children;
};

export default ProtectedRoute;
