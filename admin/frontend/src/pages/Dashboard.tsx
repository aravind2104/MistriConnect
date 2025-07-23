import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { monthlyData } from "@/data/mockData";

const API_URL = "http://localhost:8000/api/workers"; // Adjust as needed

type EarningsEntry = {
  jobs?: { length: number }[];
  totalEarned?: number;
};

type Worker = {
  status: string;
  earnings: EarningsEntry[];
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalWorkers: 0,
    activeWorkers: 0,
    totalJobs: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_URL);
        const workers = response.data;

        const totalWorkers = workers.length;
        const activeWorkers = workers.filter((w: { status: string }) => w.status === "active").length;
        const totalJobs = workers.reduce((sum: number, worker: Worker) => {
          const jobsInEarnings = worker.earnings.reduce((jobSum: number, entry: EarningsEntry) => jobSum + (entry.jobs?.length || 0), 0);
          return sum + jobsInEarnings;
        }, 0);
        
        // Calculate total revenue generated
        const totalRevenue = workers.reduce((sum: number, worker: Worker) => {
          const revenueFromEarnings = worker.earnings.reduce((revSum: number, entry) => revSum + (entry.totalEarned || 0), 0);
          return sum + revenueFromEarnings;
        }, 0);
        setStats({ totalWorkers, activeWorkers, totalJobs, totalRevenue });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your platform's performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="stats-card text-center">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-3xl font-bold">{stats.totalWorkers}</CardTitle>
            <CardDescription>Total Workers</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">
                {stats.totalWorkers > 0
                  ? Math.round((stats.activeWorkers / stats.totalWorkers) * 100)
                  : 0}
                %
              </span>{" "}
              active workers
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card text-center">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-3xl font-bold">{stats.activeWorkers}</CardTitle>
            <CardDescription>Active Workers</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-emerald-500">
                {stats.activeWorkers - (stats.totalWorkers - stats.activeWorkers)}
              </span>{" "}
              more active than inactive
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card text-center">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-3xl font-bold">40</CardTitle>
            <CardDescription>Jobs Completed</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-primary">
                10
              </span>{" "}
              jobs per worker on average
            </p>
          </CardContent>
        </Card>

        <Card className="stats-card text-center">
          <CardHeader className="p-0 pb-2">
            <CardTitle className="text-3xl font-bold">
              Rs 20000
            </CardTitle>
            <CardDescription>Total Revenue</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              <span className="text-emerald-500">
                Rs500
              </span>{" "}
              average per job
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>
            Workers, jobs, and revenue over the past year
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)'
                  }} 
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="workers"
                  fill="#3B82F6"
                  name="Workers"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="jobs"
                  fill="#8B5CF6"
                  name="Jobs"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  fill="#10B981"
                  name="Revenue ($)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
