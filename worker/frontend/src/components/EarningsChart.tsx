import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
  data: {
    month: string;
    totalEarned: number;
    completedJobs: number;
  }[];
}

export const EarningsChart = ({ data }: EarningsChartProps) => {
  // Convert "January 2025" to just "January" and sort months correctly
  const monthOrder = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedData = data.map(item => ({
    name: item.month.split(" ")[0], // Extract only the month name
    earnings: item.totalEarned,
    jobs: item.completedJobs
  })).sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'Earnings') return [`$${value}`, name];
              return [value, name];
            }}
          />
          <Bar 
            yAxisId="left"
            dataKey="earnings" 
            name="Earnings"
            fill="#8884d8" 
          />
          <Bar 
            yAxisId="right"
            dataKey="jobs" 
            name="Jobs Completed"
            fill="#82ca9d" 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
