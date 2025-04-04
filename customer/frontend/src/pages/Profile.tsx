import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { MainLayout } from "@/components/MainLayout";

interface Booking {
  _id: string;
  workerName: string;
  description: string;
  date: string;
  slot: string;
  status: string;
}

interface Customer {
  username: string;
  email: string;
  phone?: string;
}

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const [profileRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:8001/customer/profile", { withCredentials: true }),
        axios.get("http://localhost:8001/customer/viewBookings", { withCredentials: true }),
      ]);
      setCustomer(profileRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Failed to load profile", error);
      toast.error("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-32 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <MainLayout>
    <div className="container mx-auto p-4">
      <Card className="mb-6 p-4">
        <h2 className="text-xl font-bold mb-2">Customer Info</h2>
        <p><strong>Name:</strong> {customer?.username}</p>
        <p><strong>Email:</strong> {customer?.email}</p>
        {customer?.phone && <p><strong>Phone:</strong> {customer.phone}</p>}
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Booking History</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking._id} className="p-3 border border-gray-200">
                <p><strong>Worker:</strong> {booking.workerName}</p>
                <p><strong>Date:</strong> {booking.date} | <strong>Slot:</strong> {booking.slot}</p>
                <p><strong>Description:</strong> {booking.description}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`font-semibold ${
                    booking.status === "accepted" ? "text-green-600" : 
                    booking.status === "rejected" ? "text-red-600" : 
                    "text-yellow-500"
                  }`}>
                    {booking.status}
                  </span>
                </p>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
    </MainLayout>
  );
};


export default CustomerProfile;