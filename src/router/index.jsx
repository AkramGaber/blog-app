import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import ProtectedRoute from '../components/ProtectedRoute'
import AddPostPage from '../pages/AddPostPage'
import EditPostPage from '../pages/EditPostPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
    {
        path: '/', 
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'auth', 
                element: <AuthPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: 'posts/new',
                        element: <AddPostPage />,
                    },
                    {
                        path: '/posts/:id/edit',
                        element: <EditPostPage />,
                    },
                ],
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

export default router;