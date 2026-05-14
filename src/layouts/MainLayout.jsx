import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import FloatingActionButton from '../components/FloatingActionButton'

export default function MainLayout() {
  return (
    <div className='min-h-screen bg-base-200'>
        <Navbar />

        <main className='container mx-auto px-4 py-8'>
            <Outlet />
        </main>

        <FloatingActionButton />
    </div>
  )
}
