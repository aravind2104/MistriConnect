import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/types";
import { toast } from "sonner";

interface BookingCardProps {
  booking: Booking;
  showRating?: boolean;
  onCancel?: () => void;
}

export const BookingCard = ({ booking, showRating = false, onCancel }: BookingCardProps) => {
  const [rating, setRating] = useState(booking.rating || 0);
  
  const statusColors = {
    ongoing: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };
  
  const handleRating = (newRating: number) => {
    setRating(newRating);
    toast(`You rated this service ${newRating} stars.`);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{booking.serviceName}</h3>
              <p className="text-sm text-gray-500">{booking.handymanName}</p>
            </div>
            <Badge 
              className={statusColors[booking.status as keyof typeof statusColors]}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          
          <div className="mt-3 text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Date:</span>
              <span>{formatDate(booking.date)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-500">Location:</span>
              <span>{booking.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Price:</span>
              <span>${booking.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 bg-gray-50 border-t">
        {booking.status === "ongoing" && onCancel && (
          <div className="flex gap-2 w-full">
            <Button size="sm" variant="outline" className="flex-1">
              Contact
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-red-600 hover:text-red-700" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        )}
        
        {booking.status === "completed" && showRating && (
          <div className="w-full">
            <div className="text-sm mb-1">Your Rating:</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${
                    star <= rating
                      ? "text-yellow-500 hover:text-yellow-600"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        )}
        
        {booking.status === "pending" && (
          <Button size="sm" variant="outline" className="w-full">
            Confirm Booking
          </Button>
        )}
        
        {booking.status === "cancelled" && (
          <div className="text-sm text-gray-500">
            This booking was cancelled on {formatDate(booking.updatedAt || booking.date)}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};