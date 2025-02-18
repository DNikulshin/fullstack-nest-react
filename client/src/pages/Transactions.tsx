import { FC } from 'react'
import { TransactionForm } from '../components/TransactionForm'
import {
    ICategory,
    IResponseTransactionLoader,
    ITransaction,
} from '../types/types'
import { instanceAxios } from '../api/axios.api'
import { toast } from 'react-toastify'
import { TransactionTable } from '../components/TransactionTable'
import { useLoaderData } from 'react-router'
import { formatAmount } from '../helpers/currency.helper'
import { Chart } from '../components/Chart'

export const transactionAction = async ({ request }: any) => {
    try {
        switch (request.method) {
            case 'POST': {
                const formData = await request.formData()

                const newTransaction = {
                    title: formData.get('title'),
                    amount: +formData.get('amount'),
                    category: formData.get('category'),
                    type: formData.get('type'),
                }

                await instanceAxios.post('/transactions', newTransaction)
                toast.success('Transaction added.')
                return null
            }
            case 'DELETE': {
                const formData = await request.formData()
                const transactionId = formData.get('id')
                await instanceAxios.delete(
                    `/transactions/transaction/${transactionId}`
                )
                toast.success('Transaction delete.')
                return null
            }
        }
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
    }
}

export const transactionLoader = async () => {
    try {
        const categories = await instanceAxios.get<ICategory[]>('/categories')
        const transactions =
            await instanceAxios.get<ITransaction[]>('/transactions')

        const totalIncome = await instanceAxios.get<number>(
            '/transactions/income/find'
        )
        const totalExpense = await instanceAxios.get<number>(
            '/transactions/expense/find'
        )

        const data = {
            categories: categories.data,
            transactions: transactions.data,
            totalIncome: totalIncome.data,
            totalExpense: totalExpense.data,
        }
        return data
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString())
    }
}

export const Transactions: FC = () => {
    const { totalExpense, totalIncome } =
        useLoaderData() as IResponseTransactionLoader

    return (
        <>
            <div className="mt-4 grid grid-cols-3 items-start gap-4">
                <div className="col-span-2 grid">
                    <TransactionForm />
                </div>
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-md text-center font-bold uppercase">
                                Total Icome:
                            </p>
                            <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
                                {formatAmount.format(totalIncome)}
                            </p>
                        </div>
                        <div>
                            <p className="text-md text-center font-bold uppercase">
                                Total Expense:
                            </p>
                            <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                                {formatAmount.format(totalExpense)}
                            </p>
                        </div>
                    </div>
                    <>
                        <Chart
                            totalExpense={totalExpense}
                            totalIncome={totalIncome}
                        />
                    </>
                </div>
            </div>
            <h1 className="my-5">
                <TransactionTable limit={5} />
            </h1>
        </>
    )
}
