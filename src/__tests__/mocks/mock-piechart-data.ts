import { ExpensesByCategory } from "@/types/piechart-data";

const mockPiechartData: ExpensesByCategory[] = [
  {
    chartData: [
      {
        name: "Transactions Total",
        value: 123,
      },
      {
        name: "Needs Total Remaining",
        value: 877,
      },
    ],
    label: "Needs",
    spent: 123,
    startingTotal: 1000,
  },
  {
    chartData: [
      {
        name: "Transactions Total",
        value: 369,
      },
      {
        name: "Wants Total Remaining",
        value: 231,
      },
    ],
    label: "Wants",
    spent: 369,
    startingTotal: 600,
  },
  {
    chartData: [
      {
        name: "Transactions Total",
        value: 400,
      },
      {
        name: "Savings Total Remaining",
        value: 0,
      },
    ],
    label: "Savings",
    spent: 400,
    startingTotal: 400,
  },
];

export default mockPiechartData;
