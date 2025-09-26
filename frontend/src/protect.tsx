import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }: { children: JSX.Element; role?: string }) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
