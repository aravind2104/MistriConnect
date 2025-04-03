
import { MonthlyData, SkillType, Worker } from "../types";

export const workers: Worker[] = [
  {
    id: "w1",
    fullName: "John Doe",
    phoneNumber: "555-123-4567",
    email: "john.doe@example.com",
    skill: "Plumber",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.8,
    jobsCompleted: 47,
    revenueGenerated: 3850,
    dateJoined: "2023-03-15",
    status: "active"
  },
  {
    id: "w2",
    fullName: "Sarah Johnson",
    phoneNumber: "555-234-5678",
    email: "sarah.j@example.com",
    skill: "Electrician",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.9,
    jobsCompleted: 62,
    revenueGenerated: 5450,
    dateJoined: "2023-02-10",
    status: "active"
  },
  {
    id: "w3",
    fullName: "Michael Brown",
    phoneNumber: "555-345-6789",
    email: "michael.b@example.com",
    skill: "Carpenter",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4.7,
    jobsCompleted: 38,
    revenueGenerated: 3150,
    dateJoined: "2023-04-22",
    status: "active"
  },
  {
    id: "w4",
    fullName: "Emily Davis",
    phoneNumber: "555-456-7890",
    email: "emily.d@example.com",
    skill: "Painter",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4.6,
    jobsCompleted: 29,
    revenueGenerated: 2350,
    dateJoined: "2023-05-05",
    status: "inactive"
  },
  {
    id: "w5",
    fullName: "David Wilson",
    phoneNumber: "555-567-8901",
    email: "david.w@example.com",
    skill: "HVAC Technician",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4.9,
    jobsCompleted: 55,
    revenueGenerated: 6200,
    dateJoined: "2023-01-18",
    status: "active"
  },
  {
    id: "w6",
    fullName: "Lisa Martinez",
    phoneNumber: "555-678-9012",
    email: "lisa.m@example.com",
    skill: "Cleaner",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4.8,
    jobsCompleted: 73,
    revenueGenerated: 2920,
    dateJoined: "2023-06-12",
    status: "active"
  },
  {
    id: "w7",
    fullName: "Robert Taylor",
    phoneNumber: "555-789-0123",
    email: "robert.t@example.com",
    skill: "Gardener",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 4.5,
    jobsCompleted: 31,
    revenueGenerated: 1860,
    dateJoined: "2023-07-25",
    status: "inactive"
  },
  {
    id: "w8",
    fullName: "Amanda Clark",
    phoneNumber: "555-890-1234",
    email: "amanda.c@example.com",
    skill: "Mason",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 4.7,
    jobsCompleted: 42,
    revenueGenerated: 4150,
    dateJoined: "2023-02-28",
    status: "active"
  }
];

export const monthlyData: MonthlyData[] = [
  { month: "Jan", workers: 12, jobs: 87, revenue: 7800 },
  { month: "Feb", workers: 15, jobs: 103, revenue: 9450 },
  { month: "Mar", workers: 18, jobs: 132, revenue: 11200 },
  { month: "Apr", workers: 20, jobs: 156, revenue: 13500 },
  { month: "May", workers: 22, jobs: 175, revenue: 15800 },
  { month: "Jun", workers: 25, jobs: 204, revenue: 18600 },
  { month: "Jul", workers: 27, jobs: 218, revenue: 19750 },
  { month: "Aug", workers: 28, jobs: 231, revenue: 21300 },
  { month: "Sep", workers: 30, jobs: 256, revenue: 23100 },
  { month: "Oct", workers: 32, jobs: 278, revenue: 25400 },
  { month: "Nov", workers: 35, jobs: 301, revenue: 27800 },
  { month: "Dec", workers: 38, jobs: 326, revenue: 30200 }
];

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

export const getWorkerStats = () => {
  const totalWorkers = workers.length;
  const activeWorkers = workers.filter(worker => worker.status === "active").length;
  const totalJobs = workers.reduce((acc, worker) => acc + worker.jobsCompleted, 0);
  const totalRevenue = workers.reduce((acc, worker) => acc + worker.revenueGenerated, 0);
  
  return {
    totalWorkers,
    activeWorkers,
    totalJobs,
    totalRevenue
  };
};

export const getSkillDistribution = () => {
  const distribution: Record<SkillType, number> = {
    Plumber: 0,
    Electrician: 0,
    Carpenter: 0,
    Painter: 0,
    Cleaner: 0,
    Gardener: 0,
    "HVAC Technician": 0,
    Mason: 0,
    Welder: 0,
    Roofer: 0
  };
  
  workers.forEach(worker => {
    distribution[worker.skill]++;
  });
  
  return Object.entries(distribution)
    .filter(([_, count]) => count > 0)
    .map(([skill, count]) => ({
      skill,
      count
    }));
};
