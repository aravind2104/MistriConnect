import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, Calendar, DollarSign, User, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  earnings: any;
  jobsData?: any;
  isJobsLoading?: boolean;
}

export function Dialog({ open, onOpenChange, title, earnings, jobsData, isJobsLoading }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Dialog Content */}
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 w-full max-w-lg transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 flex flex-col'
          )}
        >
          {/* Header */}
          <div className="flex items-center mb-4">
            <HardHat className="h-8 w-8 text-blue-600 mr-2" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
            <DialogPrimitive.Close className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </DialogPrimitive.Close>
          </div>

          {/* Earnings Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none">
            <CardHeader>
              <CardTitle className="text-gray-800">{earnings.month}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-green-600 flex items-center justify-center">
                <DollarSign className="h-5 w-5 mr-2" /> ${earnings.totalEarned}
              </p>
              <p className="text-sm text-gray-600 flex items-center justify-center mt-2">
                <Calendar className="h-4 w-4 mr-2" /> {earnings.completedJobs} jobs completed
              </p>
            </CardContent>
          </Card>

          {/* Jobs List */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
            {isJobsLoading ? (
              <div className="flex justify-center py-8">
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobsData?.data.jobs.map((job: any) => (
                  <Card key={job.jobId._id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{job.jobId.description}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <p className="text-sm text-gray-600 flex items-center">
                          <User className="h-4 w-4 mr-2" /> {job.jobId.customerId.username}
                        </p>
                        <p className="text-md font-semibold text-green-600 flex items-center">
                          <DollarSign className="h-5 w-5 mr-2" /> ${job.amount}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" /> {new Date(job.jobId.date).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Time: {job.jobId.time}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="mt-6">
            <DialogPrimitive.Close asChild>
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                Close
              </Button>
            </DialogPrimitive.Close>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}