import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MainLayout } from "@/components/MainLayout";
import { BookingCard } from "@/components/BookingCard";
import { mockBookings } from "@/data/mockData";

const Dashboard = () => {
  const [bookings, setBookings] = useState(mockBookings);

  const filterBookings = (status: string) => {
    return bookings.filter(booking => booking.status === status);
  };

  const handleCancelBooking = (id: string) => {
    setBookings(
      bookings.map(booking => 
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      )
    );
    
    toast("Your booking has been cancelled successfully");
  };

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
            {filterBookings("ongoing").length > 0 ? (
              filterBookings("ongoing").map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking}
                  onCancel={() => handleCancelBooking(booking.id)}
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
        
        {/* Recent Bookings */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterBookings("completed").slice(0, 3).length > 0 ? (
              filterBookings("completed").slice(0, 3).map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking}
                  showRating
                />
              ))
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No recent bookings to display.
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
              <p className="text-2xl font-bold">{bookings.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{filterBookings("completed").length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Ongoing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{filterBookings("ongoing").length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{filterBookings("cancelled").length}</p>
            </CardContent>
          </Card>
        </section>
        
        {/* Quick Access */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link to="/booking-history" className="w-full">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">📋</span>
                  <p className="font-medium">Booking History</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/favorites" className="w-full">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">⭐</span>
                  <p className="font-medium">Favorite Handymen</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/profile" className="w-full">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">👤</span>
                  <p className="font-medium">My Profile</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/support" className="w-full">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">🔧</span>
                  <p className="font-medium">Support</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
