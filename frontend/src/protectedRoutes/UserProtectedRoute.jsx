/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const UserProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    return isAuthenticated && user !== null ? children : <Navigate to="/login" replace={true} />;
}

export default UserProtectedRoute