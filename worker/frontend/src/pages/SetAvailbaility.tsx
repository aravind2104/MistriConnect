import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle } from "lucide-react"; // Icons
import { toast } from "sonner"; // Notifications

const SetUnavailability: React.FC = () => {
  const [unavailability, setUnavailability] = useState<{ date: string; slot: string }[]>([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("forenoon");

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", { withCredentials: true });
        if (response.data.availability) {
          setUnavailability(response.data.availability);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to fetch profile data.");
      }
    };
    fetchProfile();
  }, []);

  // Handle Unavailability Update
  const handleUnavailabilityChange = async () => {
    if (!date) {
      toast.error("Please select a valid date.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/workers/availability",
        { date, slot },
        { withCredentials: true }
      );

      setUnavailability([...unavailability, { date, slot }]);
      toast.success(response.data.message);
      setDate("");
    } catch (error) {
      console.error("Error updating unavailability:", error);
      toast.error("Error updating unavailability.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg rounded-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6 text-red-600" />
            Set Your Unavailability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Label className="font-medium text-gray-700">Select Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 w-full" />
          </div>

          <div className="mb-4">
            <Label className="font-medium text-gray-700">Select Slot</Label>
            <select value={slot} onChange={(e) => setSlot(e.target.value)} className="border p-2 w-full">
              <option value="forenoon">Forenoon</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </div>

          <Button onClick={handleUnavailabilityChange} className="w-full bg-red-600 hover:bg-red-700 mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Save Unavailability
          </Button>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Unavailability/Booked Slots</h3>
            <div className="space-y-2">
              {unavailability.length > 0 ? (
                unavailability.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-200 p-2 rounded-md text-sm font-medium">
                    <span>{entry.date} - {entry.slot}</span>

                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">No unavailability set.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetUnavailability;
