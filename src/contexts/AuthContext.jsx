import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService';


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');

        if(savedUser) {
            setUser(JSON.parse(savedUser));
        }

        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        setToken(data.accessToken);
        setUser(data.user);

        return data.user;
    }

    const register = async (userData) => {
        const data = await authService.register(userData);

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        setToken(data.accessToken);
        setUser(data.user);

        return data.user;
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setToken(null);
        setUser(null);
    }

    const value = {
        user, 
        token,
        loading,
        isAuthenticated: Boolean(token),
        login, 
        register,
        logout,
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
