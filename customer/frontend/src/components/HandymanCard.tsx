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

interface HandymanCardProps {
  handyman: Handyman;
}

export const HandymanCard = ({ handyman }: HandymanCardProps) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(handyman.isFavorite || false);
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    address: "",
    description: "",
  });

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast( isFavorite
        ? `${handyman.name} has been removed from your favorites`
        : `${handyman.name} has been added to your favorites`,
   );
  };

  const handleBookingSubmit = () => {
    // In a real app, this would send the booking request to the API
    toast(`Your booking request with ${handyman.name} has been sent successfully.`);
    
    // Navigate to dashboard after booking
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ));
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex-grow">
        <div className="h-36 bg-gray-200 relative">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {handyman.profileImage ? (
              <img 
                src={handyman.profileImage} 
                alt={handyman.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span>No Image Available</span>
            )}
          </div>
          
          {handyman.availability === "Available Now" && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              Available Now
            </Badge>
          )}
          
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 left-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-colors ${
              isFavorite ? "text-red-500" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{handyman.name}</h3>
              <p className="text-sm text-gray-500">{handyman.category}</p>
            </div>
            <div className="flex text-sm">
              {renderStars(handyman.rating)}
              <span className="ml-1 text-gray-600">({handyman.reviews})</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {handyman.description}
          </p>
          
          {showDetails && (
            <div className="mt-3 text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Location:</span>
                <span>{handyman.location}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-500">Hourly Rate:</span>
                <span>${handyman.hourlyRate.toFixed(2)}/hr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Experience:</span>
                <span>{handyman.experience} years</span>
              </div>
            </div>
          )}
          
          <Button
            variant="link"
            size="sm"
            className="p-0 h-auto mt-2 text-blue-600"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Show less" : "Show more"}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 bg-gray-50 border-t">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Book Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Book {handyman.name}</DialogTitle>
              <DialogDescription>
                Fill in the details below to request a booking with this handyman.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={bookingDetails.date}
                    onChange={(e) =>
                      setBookingDetails({ ...bookingDetails, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={bookingDetails.time}
                    onChange={(e) =>
                      setBookingDetails({ ...bookingDetails, time: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={bookingDetails.address}
                  onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, address: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you need help with..."
                  value={bookingDetails.description}
                  onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, description: e.target.value })
                  }
                />
              </div>
              
              <div className="space-y-1">
                <Label>Estimated Price</Label>
                <div className="text-lg font-semibold">${handyman.hourlyRate.toFixed(2)}/hr</div>
                <p className="text-xs text-gray-500">
                  Final price may vary based on job complexity and duration
                </p>
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