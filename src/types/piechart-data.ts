export type PieChartData = { name: string; value: number }[];

export interface ExpensesByCategory {
  chartData: PieChartData;
  label: string;
  spent: number;
  startingTotal: number;
  categoryId: string;
}
