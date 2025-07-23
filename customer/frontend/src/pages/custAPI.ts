import axios from "axios";
import { Booking, Handyman } from "../types/types";

export const getBookings = async (): Promise<Booking[] | null> => {
    try {
        const response = await axios.get("http://localhost:8001/customer/viewBookings", {
            withCredentials: true
        });
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching bookings:", error.response?.data?.message || error.message);
        } else {
            console.error("Error fetching bookings:", (error as Error).message);
        }
        return null;
    }
};

export const search = async (serviceType: string, area: string): Promise<Handyman[] | null> => {
    try {
        if (process.env.NODE_ENV === "development") {
            console.log("Service Type:", serviceType);
            console.log("Area:", area);
        }
        
        const response = await axios.get(`http://localhost:8001/customer/search?serviceType=${serviceType}&area=${area}`, {
            withCredentials: true
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error fetching search results:", error.response?.data?.message || error.message);
        } else {
            console.error("Error fetching search results:", (error as Error).message);
        }
        return null;
    }
};
