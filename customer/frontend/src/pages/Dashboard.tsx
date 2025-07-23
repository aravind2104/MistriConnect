import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MainLayout } from "@/components/MainLayout";
import { BookingCard } from "@/components/BookingCard";
import {getBookings} from "./custAPI";
import { Booking } from "@/types/types";
import axios from "axios";
const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const filterBookings = async() => {
    const bookingsData = await getBookings();
    if (!bookingsData) {
      toast.error("Failed to fetch bookings");
      return;
    }
    setBookings(bookingsData);
    return bookingsData;
  };
  useEffect(() => {
    filterBookings();
  }, []);
  const handleCancelBooking = async(_id: string) => {
    try {
      const response = await axios.put(`http://localhost:8001/customer/deleteBooking/${_id}`,
        { withCredentials: true } // Include credentials if needed
      ); // or DELETE if that's what your API expects
  
      if (response.status === 200) {
        toast.success("Your booking has been cancelled successfully");
  
        // Optionally update the UI:
        // e.g., remove from state:
        // setBookings(prev => prev.filter(booking => booking._id !== _id));
      } else {
        toast.error("Failed to cancel the booking. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while cancelling the booking.");
    }
  };
  const total = bookings.length;
  const ongoing = bookings.filter(b => b.status === "accepted").length;
  const cancelled = bookings.filter(b => b.status === "rejected").length;

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link to="/search">
            <Button>Find New Service</Button>
          </Link>
        </div>

        {/* Ongoing Bookings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ongoing Bookings</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.length > 0 ? (
              bookings.filter(booking => booking.status === "accepted" || booking.status === "pending").map(booking => (
                <BookingCard 
                  key={booking._id}
                  booking={booking}
                  date={booking.date}
                  slot={booking.slot}
                  workerName={booking.handymanName}
                  Phone={booking.Phone}
                  onCancel={() => handleCancelBooking(booking._id)}
                />
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No ongoing bookings at the moment.
                    <div className="mt-2">
                      <Link to="/search">
                        <Button variant="outline" size="sm">Book a service</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
        
        
        {/* Quick Stats */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{total}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">Ongoing</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{ongoing}</p>
    </CardContent>
  </Card>

  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">Cancelled</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{cancelled}</p>
    </CardContent>
  </Card>
</section>

        {/* Quick Access */}

      </div>
    </MainLayout>
  );
};

export default Dashboard;
