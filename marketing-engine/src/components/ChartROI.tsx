"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const sample = [
  { month: "Jan", spend: 1200, revenue: 2400 },
  { month: "Feb", spend: 1500, revenue: 2600 },
  { month: "Mar", spend: 1800, revenue: 3200 },
  { month: "Apr", spend: 1600, revenue: 3000 },
  { month: "May", spend: 2000, revenue: 3600 },
  { month: "Jun", spend: 2100, revenue: 4200 },
];

export default function ChartROI({ data = sample }: { data?: { month: string; spend: number; revenue: number }[] }) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--foreground)/0.1)" />
          <XAxis dataKey="month" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="spend" stroke="#a855f7" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

