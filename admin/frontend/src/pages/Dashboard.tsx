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
  import { getWorkerStats, monthlyData } from "@/data/mockData";
  
  const Dashboard = () => {
    const stats = getWorkerStats();
  
    return (
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your platform's performance
          </p>
        </div>
  
        {/* Stats Grid - Better Arrangement */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
  <Card className="stats-card card-hover text-center">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-3xl font-bold">{stats.totalWorkers}</CardTitle>
      <CardDescription>Total Workers</CardDescription>
    </CardHeader>
    <CardContent className="p-4 flex flex-col items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <span className="text-primary">
          {Math.round((stats.activeWorkers / stats.totalWorkers) * 100)}%
        </span>{" "}
        active workers
      </p>
    </CardContent>
  </Card>

  <Card className="stats-card card-hover text-center">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-3xl font-bold">{stats.activeWorkers}</CardTitle>
      <CardDescription>Active Workers</CardDescription>
    </CardHeader>
    <CardContent className="p-4 flex flex-col items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <span className="text-emerald-500">
          +{stats.activeWorkers - (stats.totalWorkers - stats.activeWorkers)}
        </span>{" "}
        more active than inactive
      </p>
    </CardContent>
  </Card>

  <Card className="stats-card card-hover text-center">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-3xl font-bold">{stats.totalJobs}</CardTitle>
      <CardDescription>Jobs Completed</CardDescription>
    </CardHeader>
    <CardContent className="p-4 flex flex-col items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <span className="text-primary">
          {Math.round(stats.totalJobs / stats.totalWorkers)}
        </span>{" "}
        jobs per worker on average
      </p>
    </CardContent>
  </Card>

  <Card className="stats-card card-hover text-center">
    <CardHeader className="p-0 pb-2">
      <CardTitle className="text-3xl font-bold">
        ${stats.totalRevenue.toLocaleString()}
      </CardTitle>
      <CardDescription>Total Revenue</CardDescription>
    </CardHeader>
    <CardContent className="p-4 flex flex-col items-center justify-center">
      <p className="text-sm text-muted-foreground">
        <span className="text-emerald-500">
          ${Math.round(stats.totalRevenue / stats.totalJobs).toLocaleString()}
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
  