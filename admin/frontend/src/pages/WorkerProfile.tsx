import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";

interface Worker {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  skill: string;
  profilePicture?: string;
  dateJoined: string;
  price: string;
  area: string;
  bio: string;
  status: "active" | "inactive";
  earnings: {
    month: string;
    totalEarned: number;
    jobs: string[];
  }[];
}

const API_URL = "http://localhost:8000/api/workers"; // Backend API URL

const WorkerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setWorker(response.data);
      } catch (err) {
        console.error("Error fetching worker details:", err);
        setError("Failed to fetch worker details");
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  const toggleWorkerStatus = async () => {
    if (!worker) return;

    try {
      const newStatus = worker.status === "active" ? "inactive" : "active";
      await axios.patch(`${API_URL}/${worker._id}`, { status: newStatus });

      setWorker({ ...worker, status: newStatus });
      toast.success(`Worker ${worker.fullName} is now ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update worker status");
    }
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (error || !worker) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <h2 className="text-2xl font-bold">Worker Not Found</h2>
        <p className="mb-4 text-muted-foreground">
          {error || "The worker profile you're looking for doesn't exist."}
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
          <Button variant="default" className={worker.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-emerald-500 hover:bg-emerald-600"}
            onClick={toggleWorkerStatus} >
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
                src={worker.profilePicture || "/default-profile.png"}
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
                    <p className="text-sm font-medium">
                      {new Date(worker.dateJoined).toLocaleDateString()}
                    </p>
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
            <span className="text-2xl font-bold">{worker.earnings.reduce((total, month) => total + month.jobs.length, 0)}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <div className="mt-1 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            <span className="text-2xl font-bold">${worker.earnings.reduce((total, month) => total + month.totalEarned, 0)}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Job Cost</span>
          <div className="mt-1 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-500" />
            <span className="text-2xl font-bold">${worker.price}</span>
          </div>
        </div>
      </div>

      {/* New Section for Location & Bio */}
      <Separator className="my-4" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Location</span>
          <div className="mt-1 flex items-center gap-2">
                <span className="text-2xl font-bold">{worker.area}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Bio</span>
                  <div className="mt-1">
                    <p className="text-base text-gray-700 dark:text-gray-300">{worker.bio || "No bio available"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
