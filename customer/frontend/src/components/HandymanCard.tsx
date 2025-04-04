import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handyman } from "@/types/types";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axios from "axios";
interface HandymanCardProps {
  handyman: Handyman;
}

export const HandymanCard = ({ handyman }: HandymanCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(handyman.isFavorite || false);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    address: "",
    description: "",
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast(
      isFavorite
        ? `${handyman.name} has been removed from your favorites`
        : `${handyman.name} has been added to your favorites}`
    );
  };

  const handleBookingSubmit = async () => {
    const userId = localStorage.getItem("customer_token"); // Retrieve userId from localStorage
    if (!userId) {
      toast.error("You need to be logged in to book a service.");
      return;
    }
  
    const bookingData = {
      WorkerId: handyman._id,
      description: bookingDetails.description,
      Area: bookingDetails.address,
      date: bookingDetails.date,
      slot: bookingDetails.time,
      price: handyman.price,
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8001/customer/book",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true, // Move it outside headers
        }
      );
      
  
      if (response.status === 201) {
        toast.success(`Your booking request with ${handyman.name} has been sent successfully.`);
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error("Booking error:", error);
      const err = error as import("axios").AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to book service. Please try again.");
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col border border-gray-300 rounded-lg shadow-sm">
      <CardContent className="p-4 flex flex-col gap-2">
        {/* Name & Category */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{handyman.name}</h3>
            <p className="text-sm text-gray-500">{handyman.category}</p>
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`w-8 h-8 rounded-full bg-gray-100 shadow flex items-center justify-center transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        {/* Location & Price */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium">{handyman.area}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Price:</span>
            <span className="font-medium">₹{handyman.price} per hour</span>
          </div>
        </div>

        {/* Availability Badge */}
        {handyman.availability === "Available Now" && (
          <Badge className="bg-green-500 text-white w-fit">Available Now</Badge>
        )}

        {/* Ratings */}
        <div className="flex items-center text-sm">
          <span className="ml-1 text-gray-600">({handyman.reviews} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600">{handyman.description}</p>
      </CardContent>

      {/* Book Now Button */}
      <CardFooter className="p-4 bg-gray-50 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Book Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book {handyman.name}</DialogTitle>
              <DialogDescription>Fill in the details below to book this handyman.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="date">Date</Label>
      <Input
        id="date"
        type="date"
        value={bookingDetails.date}
        onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="slot">Time Slot</Label>
      <select
        id="slot"
        value={bookingDetails.time}
        onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a time slot</option>
        <option value="forenoon">Forenoon</option>
        <option value="afternoon">Afternoon</option>
      </select>
    </div>
  </div>

  <div className="space-y-2">
    <Label htmlFor="address">Service Area</Label>
    <Input
      id="address"
      placeholder="Enter your address"
      value={bookingDetails.address}
      onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="description">Job Description</Label>
    <Textarea
      id="description"
      placeholder="Describe what you need help with..."
      value={bookingDetails.description}
      onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })}
    />
  </div>
</div>

            <DialogFooter>
              <Button onClick={handleBookingSubmit} className="w-full">
                Confirm Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
