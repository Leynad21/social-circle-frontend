import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "../components/utils/Spinner";


const PrivateRoutes = () => {
    const { loggedIn, isLoading } = useAuthStatus()

    if (isLoading) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes