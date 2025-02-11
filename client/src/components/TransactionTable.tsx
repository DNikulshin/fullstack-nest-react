import { FC, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatAmount } from '../helpers/currency.helper'
import { instanceAxios } from '../api/axios.api'

interface ITransactionTableProps {
    limit: number
}

export const TransactionTable: FC = ({ limit = 3 }: ITransactionTableProps) => {
    const { transactions = [] } = useLoaderData() as IResponseTransactionLoader

    // const [data, setData] = useState<ITransaction[]>([])

    // const [currentPage, setcurrentPage] = useState<number>(1)

    // const [totalPage, setTotalPage] = useState(0)

    // const fechTrasactions = async (page: number) => {
    //     const response = await instanceAxios.get(`/transactions/pagination/${}`)

    // }

    return (
        <div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="font-bold">№</td>
                        <td className="font-bold">Title</td>
                        <td className="font-bold">Amount ($)</td>
                        <td className="font-bold">Category</td>
                        <td className="font-bold">Data</td>
                        <td className="text-right">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, idx) => (
                        <tr key={transaction.id}>
                            <td>{idx + 1}</td>
                            <td>{transaction.title}</td>
                            <td
                                className={
                                    transaction.type === 'income'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                {
                                    (transaction.type = 'income'
                                        ? `+ ${formatAmount.format(transaction.amount)}`
                                        : `- ${formatAmount.format(transaction.amount)}`)
                                }
                            </td>
                            <td>{transaction.category?.title || 'Other'}</td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>
                                <Form method="DELETE" action="/transactions">
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={transaction.id}
                                    />
                                    <button className="btn ml-auto hover:bg-rose-900 disabled:bg-gray-400 disabled:hover:bg-gray-400">
                                        <FaTrash />
                                    </button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
