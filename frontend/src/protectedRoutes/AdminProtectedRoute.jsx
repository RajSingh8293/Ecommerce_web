/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useEffect } from "react"
// // import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// const AdminProtectedRoute = ({ Comp, user, isAuthenticated }) => {
//     const navigate = useNavigate()
//     // const { user, isAuthenticated } = useSelector((state) => state.user)


//     useEffect(() => {
//         if (!isAuthenticated && user?.role !== "admin") {
//             navigate('/')
//         }
//     }, [navigate, user, isAuthenticated])
//     return (
//         <>
//             <Comp />
//         </>
//     )
// }

// export default AdminProtectedRoute

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    return isAuthenticated && user.role === 'admin' ? children : <Navigate to="/" replace={true} />;
};

export default AdminProtectedRoute;