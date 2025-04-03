
export type SkillType = 
  | "Plumber" 
  | "Electrician" 
  | "Carpenter" 
  | "Painter" 
  | "Cleaner" 
  | "Gardener" 
  | "HVAC Technician" 
  | "Mason" 
  | "Welder" 
  | "Roofer";

export interface Worker {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  skill: SkillType;
  profilePicture: string;
  rating: number;
  jobsCompleted: number;
  revenueGenerated: number;
  dateJoined: string;
  status: "active" | "inactive";
}

export interface MonthlyData {
  month: string;
  workers: number;
  jobs: number;
  revenue: number;
}
