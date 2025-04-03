import { useParams, Link } from "react-router-dom";
import { workers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Mail, Phone, Calendar, DollarSign, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold">Worker Not Found</h2>
        <p className="mb-4 text-muted-foreground">
          The worker profile you're looking for doesn't exist.
        </p>
        <Link to="/workers">
          <Button>Return to Workers List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link to="/workers">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Worker Profile</h2>
        </div>
        
        <div className="flex gap-2">
          <Link to={`/workers/${id}/edit`}>
            <Button variant="outline">Edit Profile</Button>
          </Link>
          <Button 
            variant="default" 
            className={worker.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}
          >
            {worker.status === "active" ? "Deactivate Worker" : "Activate Worker"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <img
                src={worker.profilePicture}
                alt={worker.fullName}
                className="h-32 w-32 rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold">{worker.fullName}</h3>
              <Badge variant="secondary" className="mt-2">
                {worker.skill}
              </Badge>
              <div
                className={`mt-3 rounded-full px-3 py-1 text-sm font-medium ${
                  worker.status === "active"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                {worker.status === "active" ? "Active" : "Inactive"}
              </div>

              <Separator className="my-4" />

              <div className="w-full space-y-3 text-left">
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{worker.phoneNumber}</p>
                    <p className="text-xs text-muted-foreground">Phone</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{worker.email}</p>
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{new Date(worker.dateJoined).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground">Joined</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Statistics</CardTitle>
              <CardDescription>Worker's activity and revenue metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total Jobs</span>
                  <div className="mt-1 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="text-2xl font-bold">{worker.jobsCompleted}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <div className="mt-1 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-500" />
                    <span className="text-2xl font-bold">${worker.revenueGenerated}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(worker.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : i < worker.rating
                              ? "fill-yellow-400/50 text-yellow-400/50"
                              : "fill-muted text-muted"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-bold">{worker.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <h4 className="font-medium">Performance Insights</h4>
                <p className="text-sm text-muted-foreground">
                  {worker.fullName} has completed {worker.jobsCompleted} jobs since joining on {new Date(worker.dateJoined).toLocaleDateString()}, 
                  generating ${worker.revenueGenerated} in revenue. 
                  {worker.rating >= 4.5 ? (
                    <span> They maintain an excellent rating of {worker.rating.toFixed(1)}, making them one of our top performers.</span>
                  ) : worker.rating >= 4.0 ? (
                    <span> They maintain a very good rating of {worker.rating.toFixed(1)} and consistently deliver quality work.</span>
                  ) : (
                    <span> Their current rating is {worker.rating.toFixed(1)}, indicating there may be room for improvement.</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent jobs and customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Job history and customer feedback will be integrated with the backend system.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
