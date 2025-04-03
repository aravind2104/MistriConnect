import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  UserCircle,
  X,
  ChevronRight,
  HardHat,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { workerApi } from '@/api';
import { EarningsChart } from '@/components/EarningsChart';

interface JobRequest {
  _id: string;
  customerId: {
    _id: string;
    username: string;
    email: string;
  };
  workerId: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'completed' | 'rejected';
  price: number;
  slot: string;
  __v?: number;
}

interface CompletedJob {
  customerReview: any;
  id: string;
  customer: string;
  service: string;
  completed: string;
  price: number;
  rating: number;
}

interface MonthlyEarnings {
  month: string;
  totalEarned: number;
  completedJobs: number;
}

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [pendingJobs, setPendingJobs] = useState<JobRequest[]>([]);
  const [completedJobs, setCompletedJobs] = useState<CompletedJob[]>([]);
  const [availability, setAvailability] = useState(true);
  const [monthlyEarnings, setMonthlyEarnings] = useState<MonthlyEarnings[]>([]);
  const [loading, setLoading] = useState({
    jobs: true,
    earnings: true,
    reviews: true
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsResponse = await workerApi.getJobRequests();
        const pendingJobs = jobsResponse.data.filter((job: { status: string }) => job.status === 'pending');
        setPendingJobs(pendingJobs);
        
        const acceptedJobs = jobsResponse.data.filter((job: { status: string }) => 
          job.status === 'accepted' || job.status === 'completed'
        );
        
        setCompletedJobs(acceptedJobs.map((job: any) => ({
          id: job._id,
          customer: job.customerId.username,
          service: job.description,
          completed: job.date,
          price: job.price,
          rating: job.rating,
          customerReview: job.customerReview
        })));

        const earningsResponse = await workerApi.getEarningsByMonth('all');
        setMonthlyEarnings(earningsResponse.data);

        setLoading({ jobs: false, earnings: false, reviews: false });
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  // Calculate summary stats
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.price, 0);
  const ratedJobs = completedJobs.filter(job => typeof job.rating === 'number' && job.rating > 0);
  const sumOfRatings = ratedJobs.reduce((sum, job) => sum + job.rating, 0);
  const averageRating = ratedJobs.length > 0 ? sumOfRatings / ratedJobs.length : 0;

  const handleAcceptJob = async (jobId: string) => {
    try {
      await workerApi.acceptJob(jobId);
      setPendingJobs(pendingJobs.map(job =>
        job._id === jobId ? { ...job, status: 'accepted' } : job
      ));
      toast.success("Job accepted successfully");
    } catch (error) {
      toast.error("Failed to accept job");
    }
  };

  const handleRejectJob = async (jobId: string) => {
    try {
      await workerApi.rejectJob(jobId);
      setPendingJobs(pendingJobs.filter(job => job._id !== jobId));
      toast.success("Job rejected successfully");
    } catch (error) {
      toast.error("Failed to reject job");
    }
  };

  const toggleAvailability = async () => {
    try {
      await workerApi.updateAvailability(!availability);
      setAvailability(!availability);
      toast.success(
        availability
          ? "You're now offline and won't receive new requests"
          : "You're now available for new jobs"
      );
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  const viewEarningsDetails = () => {
    navigate('/worker/earnings');
  };

  const viewJobDetails = (jobId: string) => {
    navigate(`/worker/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="flex items-center mb-8">
          <HardHat className="h-10 w-10 text-blue-600 mr-3" />
          <span className="text-2xl font-bold text-blue-600">MistriConnect</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Worker Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              onClick={()=>{navigate("/worker/setavailability")}}
              variant={availability ? "default" : "outline"}
              className={availability ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {"Set Availability"}
            </Button>
            <Link to="/worker/profile" className="ml-2">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <UserCircle className="mr-2 h-4 w-4" /> Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={viewEarningsDetails}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${totalEarnings}</div>
              <div className="flex items-center text-xs text-blue-600 mt-1">
                View details <ChevronRight className="h-3 w-3 ml-1" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Completed Jobs</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{completedJobs.length}</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}/5</div>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => {
                  const fullStars = Math.floor(averageRating);
                  const hasHalfStar = averageRating - fullStars >= 0.5;

                  return (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < fullStars
                          ? 'text-yellow-400 fill-yellow-400'
                          : i === fullStars && hasHalfStar
                          ? 'text-yellow-400 fill-yellow-400 opacity-50'
                          : 'text-gray-300'
                      }`}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <div className="mb-8">
          <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3">
              <h2 className="text-lg font-bold text-white">Monthly Earnings</h2>
            </div>
            <CardContent className="p-6">
              <EarningsChart data={monthlyEarnings} />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="job-requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white">
            <TabsTrigger 
              value="job-requests" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Job Requests ({pendingJobs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Completed Jobs ({completedJobs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Job Requests Tab */}
          <TabsContent value="job-requests">
            {loading.jobs ? (
              <div className="flex justify-center py-8">
                <p>Loading job requests...</p>
              </div>
            ) : pendingJobs.length > 0 ? (
              <div className="grid gap-6 mt-6">
                {pendingJobs.map(job => (
                  <Card key={job._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">{job.description}</h3>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          New Request
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Customer: {job.customerId.username}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Description</h4>
                          <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Customer Contact</h4>
                            <p className="text-sm text-gray-600 mt-1">{job.customerId.email}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Date & Slot</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(job.date).toLocaleDateString()}</span>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{job.time}</span>
                              <Tag className="h-4 w-4 ml-2" />
                              <span className="capitalize">{job.slot}</span> {/* Displays slot with first letter capitalized */}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Price</h4>
                          <p className="text-sm font-semibold text-blue-600 mt-1">${job.price}</p>
                        </div>
                      </div>
                    </CardContent>

                    {job.status === "pending" && (
                      <CardFooter className="flex justify-between bg-gray-50 px-6 py-4 border-t">
                        <Button 
                          variant="default" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleAcceptJob(job._id)}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => handleRejectJob(job._id)}
                        >
                          <X className="mr-2 h-4 w-4" /> Reject
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mt-6 bg-white rounded-xl shadow-md">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-600">No pending job requests at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Jobs Tab */}
          <TabsContent value="completed">
            {loading.earnings ? (
              <div className="flex justify-center py-8">
                <p>Loading completed jobs...</p>
              </div>
            ) : completedJobs.length > 0 ? (
              <div className="grid gap-6 mt-6">
                {completedJobs.map(job => (
                  <Card 
                    key={job.id} 
                    onClick={() => viewJobDetails(job.id)} 
                    className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">{job.service}</h3>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Customer: {job.customer}</p>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Completion Date</h4>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{new Date(job.completed).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Service</h4>
                          <p className="text-sm text-gray-600 mt-1">{job.service}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700">Earnings</h4>
                          <p className="text-sm font-semibold text-green-600 mt-1">${job.price}</p>
                        </div>
                      </div>
                      {job.rating && (
                        <div className="flex justify-end mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < job.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mt-6 bg-white rounded-xl shadow-md">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-600">No completed jobs yet.</p>
                  <Link to="/worker/dashboard">
                    <Button variant="ghost" size="sm" className="mt-4 text-blue-600 hover:bg-blue-50">
                      Check for new jobs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            {loading.reviews ? (
              <div className="flex justify-center py-8">
                <p>Loading reviews...</p>
              </div>
            ) : completedJobs.filter(job => job.customerReview).length > 0 ? (
              <div className="grid gap-6 mt-6">
                {completedJobs.map(job => (
                  job.customerReview && (
                    <Card key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">{job.customer}</h3>
                          {job.rating && (
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < job.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{new Date(job.completed).toLocaleDateString()}</p>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Service Provided</h4>
                            <p className="text-sm text-gray-600 mt-1">{job.service}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Customer Review</h4>
                            <p className="mt-1 text-gray-700">{job.customerReview}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                ))}
              </div>
            ) : (
              <Card className="mt-6 bg-white rounded-xl shadow-md">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-600">No reviews yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerDashboard;