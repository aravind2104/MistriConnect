import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { workers, skills } from "@/data/mockData";
import { Worker } from "@/types";
import { Search, Plus, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const WorkersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleAddWorkerClick = () => {
    toast("Redirecting to worker registration page");
  };

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch = worker.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      worker.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSkill = skillFilter === "all" || worker.skill === skillFilter;
    const matchesStatus = statusFilter === "all" || worker.status === statusFilter;
    
    return matchesSearch && matchesSkill && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workers</h2>
          <p className="text-muted-foreground">
            Manage your worker profiles and assignments
          </p>
        </div>
        <Link to="/workers/register">
          <Button className="gap-2" onClick={handleAddWorkerClick}>
            <Plus className="h-4 w-4" />
            Add Worker
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search workers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={skillFilter}
          onValueChange={(value) => setSkillFilter(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            {skills.map((skill) => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
        
        {filteredWorkers.length === 0 && (
          <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-lg font-medium">No workers found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard = ({ worker }: WorkerCardProps) => {
  return (
    <Link to={`/workers/${worker.id}`} className="block">
      <div className="card-hover rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{worker.fullName}</h3>
            <p className="text-sm text-muted-foreground">{worker.skill}</p>
            <div className="mt-1 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{worker.rating}</span>
            </div>
          </div>
          <div
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              worker.status === "active"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {worker.status === "active" ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Jobs</p>
            <p className="font-medium">{worker.jobsCompleted}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Revenue</p>
            <p className="font-medium">${worker.revenueGenerated}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkersList;
