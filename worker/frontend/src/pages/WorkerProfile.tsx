import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { HardHat } from 'lucide-react';

interface Availability {
  [key: string]: { startTime: string; endTime: string }[];
}

interface WorkerProfileData {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  area: string;
  availability: Availability;
  bio?: string;
}

const WorkerProfile = () => {
  const [profileData, setProfileData] = useState<WorkerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState({
    phoneNumber: '',
    area: '',
    serviceType: '' // Added serviceType to editable fields
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          withCredentials: true
        });
        setProfileData(response.data);
        setEditableFields({
          phoneNumber: response.data.phoneNumber,
          area: response.data.area,
          serviceType: response.data.serviceType // Initialize with current serviceType
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error(error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableFields(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/auth/profile', {
        phoneNumber: editableFields.phoneNumber,
        area: editableFields.area,
        serviceType: editableFields.serviceType // Include serviceType in submission
      }, {
        withCredentials: true
      });

      toast.success("Your profile has been updated.");
      // Refresh data
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        withCredentials: true
      });
      setProfileData(response.data);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const formatAvailability = (availability: Availability) => {
    return Object.entries(availability).map(([day, slots]) => (
      <div key={day} className="mb-2">
        <h4 className="capitalize font-medium text-gray-700">{day}</h4>
        {slots.length > 0 ? (
          <ul className="ml-4">
            {slots.map((slot, index) => (
              <li key={index} className="text-gray-600">
                {slot.startTime} - {slot.endTime}
              </li>
            ))}
          </ul>
        ) : (
          <p className="ml-4 text-gray-500">Not available</p>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 flex items-center justify-center">
        <p>Loading profile data...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 flex items-center justify-center">
        <p>Failed to load profile data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <HardHat className="h-10 w-10 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Worker Profile</h1>
        </div>

        <div className="flex justify-end mb-6">
          <Link to="/worker/dashboard">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <Card className="bg-white rounded-xl shadow-md">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
              <CardTitle>Personal Information</CardTitle>
            </div>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={profileData.name}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input 
                      value={profileData.username}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input 
                      value={profileData.email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber"
                      name="phoneNumber"
                      value={editableFields.phoneNumber}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Service Area</Label>
                    <Input 
                      id="area"
                      name="area"
                      value={editableFields.area}
                      onChange={handleFieldChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Input 
                      id="serviceType"
                      name="serviceType"
                      value={editableFields.serviceType}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Availability Card */}
          <Card className="bg-white rounded-xl shadow-md">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Your Availability</CardTitle>
                <Link to="/worker/setavailability">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Edit Availability
                  </Button>
                </Link>
              </div>
            </div>
            <CardContent className="p-6">
              {profileData.availability ? (
                formatAvailability(profileData.availability)
              ) : (
                <p className="text-gray-600">No availability set</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bio Card */}
        {profileData.bio && (
          <Card className="mt-6 bg-white rounded-xl shadow-md">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
              <CardTitle>About You</CardTitle>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700">{profileData.bio}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;