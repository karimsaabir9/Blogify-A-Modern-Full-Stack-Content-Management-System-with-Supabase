import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { isLoggedIn, profile, logout } = useAuth()

    const avatar_url = profile?.avatar_url;

    const navClass = ({ isActive }) =>
        `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive
            ? 'border-orange-500 text-gray-900'
            : 'border-transparent text-gray-900 hover:border-gray-300'
        }`

    const mobileNavClass = ({ isActive }) =>
        `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive
            ? 'border-orange-500 text-orange-700 bg-orange-50'
            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
        }`

    return (
        <header className='bg-white shadow'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>

                    {/* LEFT */}
                    <div className='flex'>
                        <div className='flex-shrink-0 flex items-center'>
                            <NavLink to='/' className='text-2xl font-bold text-orange-600'>
                                Blogify
                            </NavLink>
                        </div>

                        {/* DESKTOP NAV */}
                        <nav className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                            <NavLink to='/' end className={navClass}>
                                Home
                            </NavLink>

                            <NavLink to='/articles' className={navClass}>
                                Articles
                            </NavLink>

                            {isLoggedIn && (
                                <>
                                    <NavLink to='/editor' className={navClass}>
                                        Write
                                    </NavLink>

                                    <NavLink to='/manage-articles' className={navClass}>
                                        My Articles
                                    </NavLink>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* RIGHT */}
                    <div className='flex items-center space-x-4'>
                        {isLoggedIn ? (
                            <>
                                <span className='text-sm text-gray-700'>
                                    Hello, {profile?.username}
                                </span>

                                <div className='relative'>
                                    <button
                                        className='flex items-center justify-center h-8 w-8 rounded-full bg-gray-200'
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        {
                                            avatar_url ? (
                                                <img className='w-8 h-8 rounded-full object-cover' src={avatar_url} />
                                            ) : (
                                                <FaUser className='text-gray-600' />
                                            )
                                        }
                                    </button>

                                    {isDropdownOpen && (
                                        <div
                                            className='absolute right-0 w-48 bg-white mt-2 rounded-md shadow-lg z-50'
                                            onMouseLeave={() => setIsDropdownOpen(false)}
                                        >
                                            <NavLink
                                                to="/profile"
                                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Your Profile
                                            </NavLink>

                                            <NavLink
                                                to="/manage-articles"
                                                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Manage Articles
                                            </NavLink>

                                            <button
                                                onClick={logout}
                                                className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className='flex items-center space-x-4'>
                                <NavLink
                                    to="/signin"
                                    className="px-4 py-2 text-sm rounded-md text-white bg-orange-600 hover:bg-orange-700"
                                >
                                    Sign In
                                </NavLink>

                                <NavLink
                                    to="/signup"
                                    className="hidden sm:inline-flex px-4 py-2 text-sm rounded-md text-orange-600 border border-orange-600 hover:bg-orange-50"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* MOBILE BUTTON */}
                    <div className='-mr-2 flex items-center sm:hidden'>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='p-2 text-gray-400'
                        >
                            {isMenuOpen ? (
                                <IoMdClose className='w-6 h-6' />
                            ) : (
                                <CiMenuBurger className='w-6 h-6' />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className='sm:hidden py-4'>
                    <NavLink to="/" end className={mobileNavClass}>
                        Home
                    </NavLink>

                    <NavLink to="/articles" className={mobileNavClass}>
                        Articles
                    </NavLink>

                    {isLoggedIn && (
                        <>
                            <NavLink to="/editor" className={mobileNavClass}>
                                Write
                            </NavLink>

                            <NavLink to="/manage-articles" className={mobileNavClass}>
                                My Articles
                            </NavLink>

                            <NavLink to="/profile" className={mobileNavClass}>
                                Profile
                            </NavLink>

                            <button
                                onClick={logout}
                                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Sign Out
                            </button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <NavLink to="/signin" className={mobileNavClass}>
                                Sign In
                            </NavLink>

                            <NavLink to="/signup" className={mobileNavClass}>
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}

export default Header