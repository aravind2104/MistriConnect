
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
    _id: string;
    name: string;
    username: string;
    phoneNumber: string;
    email: string;
    serviceType: string;
    area: string;
    status: "active" | "inactive";
    availability: {
      date: string; // Format: YYYY-MM-DD
      slot: "forenoon" | "afternoon";
    }[];
    earnings: {
      month: string;
      totalEarned: number;
      jobs: string[]; // Array of Job IDs (MongoDB ObjectId)
    }[];
  }
  
export interface MonthlyData {
  month: string;
  workers: number;
  jobs: number;
  revenue: number;
}
