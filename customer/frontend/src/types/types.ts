
export interface Booking {
  _id: string;
  serviceName: string;
  handymanName: string;
  date: string;
  slot: string;
  Phone: string;
  location: string;
  price: number;
  status: "pending" | "ongoing" | "completed" | "cancelled";
  rating?: number;
  updatedAt?: string;
}

export interface Handyman {
  _id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  area: string;
  availability: string;
  experience: number;
  profileImage?: string;
  isFavorite?: boolean;
  serviceType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
}