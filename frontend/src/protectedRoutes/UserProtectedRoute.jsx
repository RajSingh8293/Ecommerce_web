/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const UserProtectedRoute = ({ Comp }) => {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state) => state.user)


    useEffect(() => {
        if (user === null || isAuthenticated !== true) {
            navigate('/login')
        }
    }, [navigate, user, isAuthenticated])
    return (
        <>
            <Comp />
        </>
    )
}

export default UserProtectedRoute