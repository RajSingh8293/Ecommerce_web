/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const UserProtectedRoute = ({ children }) => {
    const { user, isAuthenticated, token } = useSelector((state) => state.user);
    // return token ? children : <Navigate to="/login" replace={true} />;
    return isAuthenticated && user !== null ? children : <Navigate to="/login" replace={true} />;
}

export default UserProtectedRoute