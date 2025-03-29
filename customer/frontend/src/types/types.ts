
export interface Booking {
    id: string;
    serviceName: string;
    handymanName: string;
    date: string;
    location: string;
    price: number;
    status: "pending" | "ongoing" | "completed" | "cancelled";
    rating?: number;
    updatedAt?: string;
  }
  
  export interface Handyman {
    id: string;
    name: string;
    category: string;
    description: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    location: string;
    availability: string;
    experience: number;
    profileImage?: string;
    isFavorite?: boolean;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
  }