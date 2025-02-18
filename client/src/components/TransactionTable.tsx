import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.helper'
import { formatAmount } from '../helpers/currency.helper'
import { instanceAxios } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface ITransactionTableProps {
    limit: number
}

export const TransactionTable: FC<ITransactionTableProps> = ({ limit = 3 }) => {
    const { transactions = [] } = useLoaderData() as IResponseTransactionLoader

    const [data, setData] = useState<ITransaction[]>([])

    const [currentPage, setcurrentPage] = useState<number>(1)

    const [totalPages, setTotalPages] = useState(0)

    const fechTrasactions = async (page: number) => {
        const response = await instanceAxios.get(
            `/transactions/pagination?page=${page}&limit=${limit}`
        )
        setData(response.data)
        setTotalPages(Math.ceil(transactions.length / limit))
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setcurrentPage(selectedItem.selected + 1)
    }

    useEffect(() => {
        fechTrasactions(currentPage)
    }, [currentPage, transactions])

    return (
        <>
            <ReactPaginate
                onPageChange={handlePageChange}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                className="mt-4 flex items-center justify-end gap-3"
                activeLinkClassName="bg-blue-600 rounded-md"
                pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
                previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
                nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
                disabledClassName="text-white/50 cursor-not-allowed"
                disabledLinkClassName="text-slate-600 cursor-not-allowed"
            />
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
                        {data.map((transaction, idx) => (
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
                                <td>
                                    {transaction.category?.title || 'Other'}
                                </td>
                                <td>{formatDate(transaction.createdAt)}</td>
                                <td>
                                    <Form
                                        method="DELETE"
                                        action="/transactions"
                                    >
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
        </>
    )
}
