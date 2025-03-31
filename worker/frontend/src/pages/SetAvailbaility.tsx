import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from "lucide-react"; // Icons
import { toast } from "sonner"; // Notifications

interface Availability {
  startTime: string;
  endTime: string;
}

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
type Day = (typeof days)[number];

const SetAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<Record<Day, Availability[]>>({
    monday: [], tuesday: [], wednesday: [],
    thursday: [], friday: [], saturday: [], sunday: []
  });

  const [selectedDay, setSelectedDay] = useState<Day>("monday");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true });
        if (response.data.availability) {
          setAvailability(response.data.availability);
        }
      } catch (error) {
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, []);

  // Handle Availability Update
  const handleAvailabilityChange = async () => {
    if (!startTime || !endTime) {
      toast.error("Please select a valid start and end time.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/workers/availability",
        { day: selectedDay, startTime, endTime },
        { withCredentials: true }
      );

      setAvailability({
        ...availability,
        [selectedDay]: [...availability[selectedDay], { startTime, endTime }]
      });

      toast.success(response.data.message);
      setStartTime("");
      setEndTime("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error updating availability: " + (error.response?.data?.message || error.message));
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Set Your Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="font-medium text-gray-700">Select Day</Label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as Day)}
              className="border rounded p-2 w-full mt-1"
            >
              {days.map((day) => (
                <option key={day} value={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-medium text-gray-700">Start Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <Label className="font-medium text-gray-700">End Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleAvailabilityChange}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-4 flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Save Availability
          </Button>

          {/* Display Selected Availability */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Availability</h3>
            <div className="space-y-2">
              {availability[selectedDay]?.length > 0 ? (
                availability[selectedDay].map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-200 p-2 rounded-md text-sm font-medium"
                  >
                    <span>{slot.startTime} - {slot.endTime}</span>
                    <button
                      onClick={() => {
                        const updatedDayAvailability = availability[selectedDay].filter((_, i) => i !== index);
                        setAvailability({ ...availability, [selectedDay]: updatedDayAvailability });

                        // Make API call to remove availability slot
                        axios.delete(`http://localhost:5000/api/workers/availability`, {
                          data: { day: selectedDay, startTime: slot.startTime, endTime: slot.endTime },
                          withCredentials: true
                        }).then(() => {
                          toast.success("Availability removed.");
                        }).catch(() => {
                          toast.error("Failed to remove availability.");
                        });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">No availability set for this day.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetAvailability;
