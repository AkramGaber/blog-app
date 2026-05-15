import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoadingSpinner from './LoadingSpinner';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return <LoadingSpinner />
    }

    if(isAuthenticated) {
        return <Navigate to='/auth' replace />
    }

  return <Outlet />
}
