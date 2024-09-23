import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children, requiresAuth = true }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.role);
    const location = useLocation();

    // Redirect if authenticated but trying to access login or signup
    if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
        return <Navigate to={`/${role}/profile`} />;
    }

    // Redirect to login if not authenticated and route requires authentication
    if (!isAuthenticated && requiresAuth) {
        return <Navigate to='/login' />;
    }

    // Render the children components if all checks pass
    return children;
};

export default ProtectedRoutes;
