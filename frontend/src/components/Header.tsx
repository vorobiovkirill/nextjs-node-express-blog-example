import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useLogout } from '../hooks/auth/useLogout'

const Header = () => {
  const router = useRouter()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="flex justify-between p-8">
      <div className="left">
        <Link href="/create" legacyBehavior>
          <a className="text-gray-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4">+ Add post</a>
        </Link>
      </div>
      <div className="right">
        <button
          onClick={handleLogout}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
