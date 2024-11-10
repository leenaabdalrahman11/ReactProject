import React from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRouter({ children }) {
    const token = localStorage.getItem('userToken');

    if (!token) {
        return <Navigate to="/Welcome" />;
    }

    return children; 
}
export function PublicRouter({children}){
    const token = localStorage.getItem('userToken');

    if (token) {
        return <Navigate to="/Home" />;
    }

    return children; 
}