import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Brush 
} from "recharts";
import { Box, Typography, Card } from "@mui/material";
import { FC } from "react";

interface TrendDataPoint {
  month: string;
  hires: number;
  avgSalary: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  height?: number;
}

export const TrendChart: FC<TrendChartProps> = ({ data, height = 350 }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Hiring & Salary Trends (Last 12 Months)
      </Typography>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="month" stroke="#666" fontSize={12} />
          <YAxis yAxisId="left" stroke="#666" fontSize={12} />
          <YAxis yAxisId="right" orientation="right" stroke="#8884d8" fontSize={12} />
          <Tooltip />
          <Legend />
          <Line 
            yAxisId="left" 
            type="monotone" 
            dataKey="hires" 
            stroke="#00C49F" 
            strokeWidth={3}
            name="New Hires"
            dot={{ fill: '#00C49F', strokeWidth: 2 }}
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="avgSalary" 
            stroke="#8884d8" 
            strokeWidth={3}
            name="Avg Salary (₹)"
            dot={{ fill: '#8884d8', strokeWidth: 2 }}
            unit="₹"
          />
          <Brush dataKey="month" height={20} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

