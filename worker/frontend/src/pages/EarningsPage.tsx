import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { workerApi } from '@/api';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { HardHat } from 'lucide-react';

const EarningsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Fetch earnings for all months
  const { data: monthlyEarnings, isLoading, error } = useQuery({
    queryKey: ['earnings', 'all'],
    queryFn: () => workerApi.getEarningsByMonth('all')
  });

  // Fetch jobs for selected month
  const { data: jobsData, isLoading: isJobsLoading } = useQuery({
    queryKey: ['jobs', selectedMonth],
    queryFn: () => workerApi.getJobsForMonth(selectedMonth!),
    enabled: !!selectedMonth,
  });

  useEffect(() => {
    if (error) {
      toast.error('Failed to load earnings data');
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <HardHat className="h-10 w-10 text-blue-600 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Earnings Overview</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <p className="text-gray-600">Loading earnings data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyEarnings?.data
              .sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime())
              .map((monthData: any, index: number) => (
                <Card key={monthData.month || index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
                    <CardTitle className="text-lg font-semibold text-gray-800">{monthData.month}</CardTitle>
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-2xl font-bold text-green-600">${monthData.totalEarned}</p>
                    <p className="text-sm text-gray-600 mt-1">{monthData.completedJobs} jobs completed</p>
                    <Button 
                      className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedMonth(monthData.month)}
                    >
                      View Jobs
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Dialog for Viewing Jobs */}
        {selectedMonth && (
          <Dialog
            open={!!selectedMonth}
            onOpenChange={() => setSelectedMonth(null)}
            title={`Jobs for ${selectedMonth}`}
            earnings={monthlyEarnings?.data.find((m: any) => m.month === selectedMonth)}
            jobsData={jobsData}
            isJobsLoading={isJobsLoading}
          />
        )}
      </div>
    </div>
  );
};

export default EarningsPage;