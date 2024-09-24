/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminProtectedRoute = ({ Comp }) => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.user)


    useEffect(() => {
        if (!isAuthenticated && user?.role !== "admin") {
            navigate('/')
        }
    }, [navigate, user, isAuthenticated])
    return (
        <>
            <Comp />
        </>
    )
}

export default AdminProtectedRoute