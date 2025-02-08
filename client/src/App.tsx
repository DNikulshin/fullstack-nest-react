import { RouterProvider } from 'react-router'
import { router } from './router/router'
import { useAppDispatch } from './store/hooks'
import { getTokenFromLocalStorage } from './helpers/localStorage.helper'
import { AuthService } from './services/auth.service'
import { logOut, login } from './store/user/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export function App() {
    const dispatch = useAppDispatch()

    const checkAuth = async () => {
        try {
            const token = getTokenFromLocalStorage()

            if (token) {
                const data = await AuthService.getProfile()

                if (data) {
                    dispatch(login(data))
                } else {
                    dispatch(logOut())
                }
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
            console.log(err)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [dispatch])

    return <RouterProvider router={router} />
}
