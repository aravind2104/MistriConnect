// src/pages/EarningsDetails.tsx
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowLeft } from 'lucide-react';
import { workerApi } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';

const EarningsDetails = () => {
  const { month } = useParams();
  const isAllMonths = month === 'all';

  const { data: earningsData, isLoading, error } = useQuery({
    queryKey: ['earnings', month],
    queryFn: async () =>
      isAllMonths
        ? workerApi.getEarningsByMonth('all')
        : workerApi.getJobsForMonth(month!),
  });
  
  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error('Failed to load earnings data');
    }
  }, [error]);
  

  return (
    <div className="container py-8">
      <div className="flex items-center mb-6">
        <Link to="/worker/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">
          {isAllMonths ? 'All Earnings' : `Earnings for ${month}`}
        </h1>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : isAllMonths ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {earningsData?.data.map((monthData: any) => (
            <Link 
              key={monthData.month} 
              to={`/worker/earnings/${monthData.month}`}
              className="hover:opacity-90 transition-opacity"
            >
              <Card>
                <CardHeader>
                  <CardTitle>{monthData.month}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-green-500" />
                    <span className="text-xl font-semibold">${monthData.totalEarned}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {monthData.completedJobs} jobs completed
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Render job details */}
              {earningsData?.data.jobs.map((job: any) => (
                <div key={job.jobId} className="py-4 border-b last:border-b-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{job.jobId.service}</h3>
                      <p className="text-sm text-gray-500">{job.jobId.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${job.earned}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(job.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EarningsDetails;