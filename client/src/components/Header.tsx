import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logOut } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/localStorage.helper'
import { toast } from 'react-toastify'

export const Header: FC = () => {
    const isAuth = useAuth()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logOut())
        removeTokenFromLocalStorage('token')
        toast.success('LogOut successful')
        navigate('/auth')
    }
    return (
        <div className="flex items-center p-4 shadow-sm backdrop-blur-sm bg-slate-800">
            <Link to="/">
                <FaBtc size={20} />
            </Link>
            {isAuth && (
                <nav className="ml-auto mr-2 sm:mr-10">
                    <ul className="flex gap-4 items-center sm:gap-5">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? 'text-white' : 'text-white/50'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/transactions"
                                className={({ isActive }) =>
                                    isActive ? 'text-white' : 'text-white/50'
                                }
                            >
                                Transactions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/categories"
                                className={({ isActive }) =>
                                    isActive ? 'text-white' : 'text-white/50'
                                }
                            >
                                Categories
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
            {isAuth ? (
                <button
                    className="btn btn-red cursor-pointer"
                    onClick={logoutHandler}
                >
                    <span>LogOut</span>
                    <FaSignOutAlt />
                </button>
            ) : (
                <Link
                    to="/auth"
                    className="text-white/50 ml-auto hover:text-white"
                >
                    Log-In / Sign-In
                </Link>
            )}
        </div>
    )
}
