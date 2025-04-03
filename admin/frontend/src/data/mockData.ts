import { MonthlyData, SkillType, Worker } from "@/types";

// Mock workers data
export const workers: Worker[] = [
  {
    id: "w1",
    fullName: "John Smith",
    phoneNumber: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    skill: "Plumber",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    jobsCompleted: 127,
    revenueGenerated: 12450,
    dateJoined: "2023-01-15",
    status: "active"
  },
  {
    id: "w2",
    fullName: "Maria Garcia",
    phoneNumber: "+1 (555) 234-5678",
    email: "maria.garcia@example.com",
    skill: "Electrician",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    jobsCompleted: 93,
    revenueGenerated: 10780,
    dateJoined: "2023-02-20",
    status: "active"
  },
  {
    id: "w3",
    fullName: "David Johnson",
    phoneNumber: "+1 (555) 345-6789",
    email: "david.johnson@example.com",
    skill: "Carpenter",
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.5,
    jobsCompleted: 68,
    revenueGenerated: 7650,
    dateJoined: "2023-03-10",
    status: "active"
  },
  {
    id: "w4",
    fullName: "Sarah Williams",
    phoneNumber: "+1 (555) 456-7890",
    email: "sarah.williams@example.com",
    skill: "Painter",
    profilePicture: "https://randomuser.me/api/portraits/women/24.jpg",
    rating: 4.3,
    jobsCompleted: 42,
    revenueGenerated: 4580,
    dateJoined: "2023-04-05",
    status: "inactive"
  },
  {
    id: "w5",
    fullName: "Michael Brown",
    phoneNumber: "+1 (555) 567-8901",
    email: "michael.brown@example.com",
    skill: "Plumber",
    profilePicture: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4.6,
    jobsCompleted: 82,
    revenueGenerated: 8970,
    dateJoined: "2023-02-28",
    status: "active"
  },
  {
    id: "w6",
    fullName: "Jennifer Martinez",
    phoneNumber: "+1 (555) 678-9012",
    email: "jennifer.martinez@example.com",
    skill: "Cleaner",
    profilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4.8,
    jobsCompleted: 55,
    revenueGenerated: 5320,
    dateJoined: "2023-03-20",
    status: "active"
  },
  {
    id: "w7",
    fullName: "James Wilson",
    phoneNumber: "+1 (555) 789-0123",
    email: "james.wilson@example.com",
    skill: "HVAC Technician",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 4.4,
    jobsCompleted: 37,
    revenueGenerated: 8250,
    dateJoined: "2023-05-15",
    status: "active"
  },
  {
    id: "w8",
    fullName: "Robert Anderson",
    phoneNumber: "+1 (555) 890-1234",
    email: "robert.anderson@example.com",
    skill: "Electrician",
    profilePicture: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 3.9,
    jobsCompleted: 24,
    revenueGenerated: 3180,
    dateJoined: "2023-06-01",
    status: "inactive"
  }
];

// Available skills
export const skills: SkillType[] = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Cleaner",
  "Gardener",
  "HVAC Technician",
  "Mason",
  "Welder",
  "Roofer"
];

// Monthly data for charts
export const monthlyData: MonthlyData[] = [
  { month: "Jan", workers: 5, jobs: 28, revenue: 3200 },
  { month: "Feb", workers: 7, jobs: 42, revenue: 4800 },
  { month: "Mar", workers: 10, jobs: 67, revenue: 7500 },
  { month: "Apr", workers: 12, jobs: 85, revenue: 9200 },
  { month: "May", workers: 14, jobs: 96, revenue: 10800 },
  { month: "Jun", workers: 16, jobs: 112, revenue: 12500 },
  { month: "Jul", workers: 17, jobs: 120, revenue: 13800 },
  { month: "Aug", workers: 18, jobs: 132, revenue: 15400 },
  { month: "Sep", workers: 20, jobs: 145, revenue: 16900 },
  { month: "Oct", workers: 21, jobs: 152, revenue: 17800 },
  { month: "Nov", workers: 22, jobs: 158, revenue: 18500 },
  { month: "Dec", workers: 24, jobs: 175, revenue: 20200 }
];

// Function to get worker statistics
export const getWorkerStats = () => {
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(worker => worker.status === "active").length;
  const totalJobs = workers.reduce((sum, worker) => sum + worker.jobsCompleted, 0);
  const totalRevenue = workers.reduce((sum, worker) => sum + worker.revenueGenerated, 0);

  return {
    totalWorkers,
    activeWorkers,
    totalJobs,
    totalRevenue
  };
};

// Function to get skill distribution
export const getSkillDistribution = () => {
  const distribution: Record<string, number> = {};
  
  workers.forEach(worker => {
    if (distribution[worker.skill]) {
      distribution[worker.skill]++;
    } else {
      distribution[worker.skill] = 1;
    }
  });
  
  return Object.entries(distribution).map(([skill, count]) => ({
    skill,
    count
  }));
};
