import { FC } from 'react'
import { Outlet } from 'react-router'
import { Header } from '../components/Header'

export const Layout: FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 font-display pb-20 text-white">
            <Header />
            <div className="container-custom">
                <Outlet />
            </div>
        </div>
    )
}
