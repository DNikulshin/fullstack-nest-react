import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localStorage.helper'
import { useAppDispatch } from '../store/hooks'
import { useNavigate } from 'react-router'
import { login } from '../store/user/userSlice'

export const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const regisrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const data = await AuthService.registration({ email, password })
            if (data) {
                toast.success('Account has be created')
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()

            const data = await AuthService.login({ email, password })
            if (data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success('login successful')
                navigate('/')
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="text-center text-xl mb-10">
                {isLogin ? 'Login' : 'Registration'}
            </h1>

            <form
                className="flex w-1/3 flex-col mx-auto gap-5"
                onSubmit={isLogin ? loginHandler : regisrationHandler}
            >
                <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-green mx-auto cursor-pointer">
                    Submit
                </button>
            </form>

            <div className="flex justify-center mt-5">
                {isLogin ? (
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-300 hover:text-white cursor-pointer"
                    >
                        You don't have an account ?
                    </button>
                ) : (
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-slate-300 hover:text-white cursor-pointer"
                    >
                        Already have an account ?
                    </button>
                )}
            </div>
        </div>
    )
}
