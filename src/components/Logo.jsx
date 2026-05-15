import React from 'react'
import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <div>
        <Link to="/" className='text-2xl font-bold text-primary'>
            ITI Blog
        </Link>
    </div>
  )
}
