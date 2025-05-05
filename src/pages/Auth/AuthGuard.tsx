import { Navigate } from "react-router-dom";
import { useUserQuery } from "../../hooks/useUserQuery"

export const AuthGuard = () => {
    const { data: user } = useUserQuery()

    if (user !== undefined || user !== null) {
        return (
            <Navigate to={`/folder/0`} replace />
        )
    } else {
        return (
            <Navigate to = "/auth" replace />
        )

    }
}