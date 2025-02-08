import { FC } from 'react'
import img from '../assets/page_not_found.png'
import { Link } from 'react-router'

export const ErrorPage: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center flex-col gap-10">
            <img src={img} alt="img" className="w-80" />
            <Link
                to="/"
                className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
            >
                Back
            </Link>
        </div>
    )
}
