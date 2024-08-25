'use client'

import Card from '@/components/Card';
import React from 'react'
import { ReferenceLine, Bar, BarChart, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { capitalize } from 'lodash'
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
                    <BarChart stackOffset='sign' height={384} data={data} barSize={15}>
                        <YAxis hide padding={{ bottom: 25 }} />
                        <XAxis dataKey='name' tick={{ fill: 'rgb(0,0,0)' }} stroke="#000" strokeWidth={2} />
                        <Legend formatter={(value) => <p className='text-black'>{capitalize(value)}</p>} />
                        <Bar dataKey="income" stackId="a" fill="#A2D9A8" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="income" position="top" formatter={formatLabel} fill="#000" />
                        </Bar>
                        <ReferenceLine y={0} strokeWidth={1} />
                        <Bar dataKey="expense" stackId="a" fill="#F3D0D7" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="expense" position="top" formatter={formatLabel} fill="#000" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
