import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className='navbar bg-base-100 shadow-sm'>
        <div className='container mx-auto px-4 flex'>
            <div className='flex-1'>
                <Logo />
            </div>
            <div className='flex-none gap-2'>
                {isAuthenticated ? (
                    <>
                        <span className='font-medium mr-5'>Hi, {user?.name}</span>
                        <button onClick={logout} className='btn btn-outline btn-error btn-sm'>Logout</button>
                    </>
                ) : (
                    <Link to='/auth' className='btn btn-primary btn-sm'>
                        Login / Register
                    </Link>
                )}
                
            </div>
        </div>
    </div>
  )
}
