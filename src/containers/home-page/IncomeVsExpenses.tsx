'use client'

import Card from '@/components/Card';
import React from 'react'
import { useRouter } from "next/navigation";
import { ReferenceLine, Bar, BarChart, LabelList, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { capitalize } from 'lodash'
// type 
import { ChartData } from '@/actions/get-incomevexpenses';
// components
import H4WithH6Icon from '@/components/H4WithH6Icon';

interface IncomeVsExpensesProps {
    data: ChartData[]
    icons: { borderAllIconB64: string };
}

const formatLabel = (value: number) => {
    return `$${value.toFixed(2)}`
}

export default function IncomeVsExpenses({ data, icons: { borderAllIconB64 } }: IncomeVsExpensesProps) {
    const router = useRouter()

    return (
        <div className='flex flex-col gap-2'>
            <H4WithH6Icon icon={borderAllIconB64} iconAltText='all-transactions-icon.png' h4Text='Transactions Per Month' h6Text='All Transactions' onClick={() => router.push("/app/transactions")} />
            <Card className='h-96 w-full overflow-x-auto'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart stackOffset='sign' height={384} data={data} barSize={15}>
                        <YAxis hide padding={{ bottom: 25 }} />
                        <XAxis dataKey='name' strokeWidth={2} />
                        <Legend formatter={(value) => <p>{capitalize(value)}</p>} />
                        <Bar dataKey="income" stackId="a" fill="#A2D9A8" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="income" position="top" formatter={formatLabel} />
                        </Bar>
                        <ReferenceLine y={0} strokeWidth={1} />
                        <Bar dataKey="expense" stackId="a" fill="#F3D0D7" radius={[16, 16, 0, 0]}>
                            <LabelList dataKey="expense" position="top" formatter={formatLabel} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    )
}
