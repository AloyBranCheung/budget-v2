'use client'

import Card from '@/components/Card';
import React from 'react'
import { ReferenceLine, Bar, BarChart, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
// type 
import { ChartData } from '@/actions/get-incomevexpenses';

interface IncomeVsExpensesProps {
    data: ChartData[]
}

const formatLabel = (value: number) => {
    return `$${value.toFixed(2)}`
}

export default function IncomeVsExpenses({ data }: IncomeVsExpensesProps) {
    return (
        <div className='flex flex-col gap-2'>
            <h4>Expenses Per Month</h4>
            <Card className='h-96 w-full overflow-x-auto'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart stackOffset='sign' height={384} data={data}>
                        <YAxis hide padding={{ bottom: 25 }} />
                        <XAxis dataKey='name' />
                        <Legend />
                        <Bar dataKey="income" stackId="a" fill="#A2D9A8" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="income" position="top" formatter={formatLabel} />
                        </Bar>
                        <ReferenceLine y={0} />
                        <Bar dataKey="expense" stackId="a" fill="#F3D0D7" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="expense" position="top" formatter={formatLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
