import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = ({ setUser }) => {
    useEffect(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, [setUser]);

    return <Navigate to="/" replace />
};

export default Logout;