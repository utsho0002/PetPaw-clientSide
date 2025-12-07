import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (user && user.email) {
        return (
            <>
                {children}  
              
            </>
        );
    }

    // Redirect to login and pass current location in state
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
