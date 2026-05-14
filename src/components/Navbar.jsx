import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='navbar bg-base-100 shadow-sm'>
        <div className='container mx-auto px-4 flex'>
            <div className='flex-1'>
                <Logo />
            </div>
            <div className='flex-none'>
                <Link to='/auth' className='btn btn-primary btn-sm'>
                    Login / Register
                </Link>
            </div>
        </div>
    </div>
  )
}
