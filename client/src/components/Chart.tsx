import { FC } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const COLORS = ['#00c49f', '#ff8042']

interface Chart {
    totalIncome: number
    totalExpense: number
}

interface IData {
    value: number
    name: string
}

export const Chart: FC<Chart> = ({ totalExpense, totalIncome }) => {
    const data = new Array<IData>(
        { value: totalExpense, name: 'Expense' },
        { value: totalIncome, name: 'Income' }
    )

    return (
        <PieChart width={240} height={240}>
            <Pie
                data={data}
                cx={'50%'}
                cy={'50%'}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Legend />
            <Tooltip />
        </PieChart>
    )
}
