import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { name: string; income: number; expense: number }[];
};

export default function IncomeExpenseChart({ data }: Props) {
  
  
  const formatNumber = (value: number | string): string => {
    const num = typeof value === "number" ? value : Number(value);

    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(1) + "Cr";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />

      
        <YAxis width={80} tickFormatter={formatNumber} />

      
        <Tooltip formatter={(value) => formatNumber(value as number)} />

        <Line
          type="monotone"
          dataKey="income"
          stroke="#22c55e"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="expense"
          stroke="#ef4444"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}