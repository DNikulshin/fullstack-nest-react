import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router'
import { IResponseTransactionLoader } from '../types/types'
import { CategoryModal } from './CategoryModal'

export const TransactionForm: FC = () => {
    const [visibleModal, setVisibleModal] = useState(false)
    const { categories } = useLoaderData() as IResponseTransactionLoader
    return (
        <div className="rounded-md bg-slate-800 p-4">
            <Form className="grid gap-2" method="post" action="/transactions">
                <label htmlFor="title" className="grid">
                    <span>Title</span>
                    <input
                        className="input border border-slate-700"
                        type="text"
                        placeholder="Enter Title..."
                        name="title"
                    />
                </label>
                <label htmlFor="amount" className="grid">
                    <span>Amount</span>
                    <input
                        className="input border-slate-700"
                        type="number"
                        placeholder="Enter amount..."
                        name="amount"
                    />
                </label>
                {categories.length ? (
                    <label htmlFor="category" className="grid">
                        <span>Category</span>
                        <select
                            name="category"
                            required
                            className="input border-slate-700 bg-slate-800"
                        >
                            {categories.map((ctg) => (
                                <option key={ctg.id} value={ctg.id}>
                                    {ctg.title}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <p className="mt-1 text-red-300">
                        To continue create a category first
                    </p>
                )}
                <button
                    className="flex max-w-fit cursor-pointer items-center gap-2 text-white/50 hover:text-white disabled:text-gray-400"
                    onClick={() => setVisibleModal(true)}
                    disabled={!categories.length}
                >
                    <FaPlus />
                    <span>Manage Categories</span>
                </button>
                <div className="flex items-center gap-4">
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            required
                            type="radio"
                            name="type"
                            value={'income'}
                            className="form-radio text-blue-600"
                        />
                        <span>Income</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            required
                            type="radio"
                            name="type"
                            value={'expense'}
                            className="form-radio text-blue-600"
                        />
                        <span>Expense</span>
                    </label>
                </div>
                <button
                    className="btn btn-green m mt-2 max-w-fit"
                    disabled={!categories.length}
                >
                    Submit
                </button>
            </Form>

            {visibleModal && (
                <CategoryModal type="post" setVisibleModal={setVisibleModal} />
            )}
        </div>
    )
}
