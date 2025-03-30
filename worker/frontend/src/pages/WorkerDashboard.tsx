import { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// Mock data
const jobRequests = [
  {
    id: 'job-1',
    customer: 'Sarah Johnson',
    service: 'Plumbing',
    description: 'Leaking pipe under kitchen sink',
    address: '123 Main St, Apt 4B, New York, NY',
    date: '2023-07-15',
    time: '10:00 AM',
    status: 'pending',
    price: 85
  },
  {
    id: 'job-2',
    customer: 'Michael Chen',
    service: 'Electrical',
    description: 'Replace light fixtures in living room',
    address: '456 Park Ave, Brooklyn, NY',
    date: '2023-07-16',
    time: '2:00 PM',
    status: 'pending',
    price: 120
  },
  {
    id: 'job-3',
    customer: 'Emily Rodriguez',
    service: 'Carpentry',
    description: 'Build custom bookshelf',
    address: '789 Broadway, Queens, NY',
    date: '2023-07-17',
    time: '9:30 AM',
    status: 'pending',
    price: 250
  }
];

const recentJobs = [
  {
    id: 'completed-1',
    customer: 'David Wong',
    service: 'Plumbing',
    completed: '2023-07-10',
    price: 95,
    rating: 5
  },
  {
    id: 'completed-2',
    customer: 'Lisa Martinez',
    service: 'Electrical',
    completed: '2023-07-08',
    price: 135,
    rating: 4
  },
  {
    id: 'completed-3',
    customer: 'Robert Smith',
    service: 'Carpentry',
    completed: '2023-07-05',
    price: 210,
    rating: 5
  }
];

const reviews = [
  {
    id: 'review-1',
    customer: 'David Wong',
    rating: 5,
    comment: 'Excellent work! Fixed the leaky pipe quickly and professionally.',
    date: '2023-07-10'
  },
  {
    id: 'review-2',
    customer: 'Lisa Martinez',
    rating: 4,
    comment: 'Good work on the electrical fixtures. Very professional.',
    date: '2023-07-08'
  },
  {
    id: 'review-3',
    customer: 'Robert Smith',
    rating: 5,
    comment: 'Amazing craftsmanship on the bookshelf. Highly recommend!',
    date: '2023-07-05'
  }
];

const WorkerDashboard = () => {
  const [pendingJobs, setPendingJobs] = useState(jobRequests);
  const [completedJobs, setCompletedJobs] = useState(recentJobs);
  const [customerReviews, setCustomerReviews] = useState(reviews);
  const [availability, setAvailability] = useState(true);

  // Calculate earnings
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.price, 0);
  const averageRating = completedJobs.reduce((sum, job) => sum + job.rating, 0) / completedJobs.length;

  const handleAcceptJob = (jobId: string) => {
    toast("You've accepted this job request.");
    
    setPendingJobs(pendingJobs.map(job => 
      job.id === jobId ? { ...job, status: 'accepted' } : job
    ));
  };

  const handleRejectJob = (jobId: string) => {
    toast( "You've rejected this job request.");
    
    setPendingJobs(pendingJobs.filter(job => job.id !== jobId));
  };

  const toggleAvailability = () => {
    setAvailability(!availability);
    toast(availability 
        ? "You won't receive new job requests until you go online again." 
        : "You're now available to receive new job requests.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Worker Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, John Doe</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={toggleAvailability}
              variant={availability ? "default" : "outline"}
              className={availability ? "bg-status-success hover:bg-status-success/90" : ""}
            >
              {availability ? 'Available for Work' : 'Currently Offline'}
            </Button>
            <Link to="/worker/profile" className="ml-2">
              <Button variant="outline">
                <UserCircle className="mr-2 h-4 w-4" /> Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedJobs.length}</div>
              <p className="text-xs text-muted-foreground">3 jobs this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}/5</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="job-requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="job-requests">Job Requests</TabsTrigger>
            <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
            <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="job-requests">
            <div className="grid gap-6">
              {pendingJobs.length > 0 ? (
                pendingJobs.map(job => (
                  <Card key={job.id} className={job.status === 'accepted' ? 'border-green-500' : ''}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.service}</CardTitle>
                          <CardDescription>Customer: {job.customer}</CardDescription>
                        </div>
                        <Badge variant={job.status === 'accepted' ? 'default' : 'outline'}>
                          {job.status === 'accepted' ? 'Accepted' : 'New Request'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium">Description</h4>
                          <p className="text-sm text-gray-500">{job.description}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Location</h4>
                            <p className="text-sm text-gray-500">{job.address}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Date & Time</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>{job.date}</span>
                              <Clock className="h-4 w-4 ml-2" />
                              <span>{job.time}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Estimated Price</h4>
                          <p className="text-sm font-semibold text-tool-blue">${job.price}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      {job.status === 'pending' ? (
                        <>
                          <Button 
                            variant="outline" 
                            className="border-status-danger text-status-danger hover:bg-red-50"
                            onClick={() => handleRejectJob(job.id)}
                          >
                            <X className="mr-2 h-4 w-4" /> Reject
                          </Button>
                          <Button 
                            className="bg-status-success hover:bg-status-success/90"
                            onClick={() => handleAcceptJob(job.id)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Accept
                          </Button>
                        </>
                      ) : (
                        <div className="w-full flex justify-between">
                          <Button variant="outline">
                            <MessageSquare className="mr-2 h-4 w-4" /> Message Customer
                          </Button>
                          <Button variant="outline">View Details</Button>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p>No pending job requests at the moment.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid gap-6">
              {completedJobs.map(job => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <div>
                        <CardTitle>{job.service}</CardTitle>
                        <CardDescription>Customer: {job.customer}</CardDescription>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 font-medium">${job.price}</span>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < job.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <span className="text-gray-500">Completed on: </span>
                      {job.completed}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid gap-6">
              {customerReviews.map(review => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{review.customer}</CardTitle>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription>{review.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerDashboard;