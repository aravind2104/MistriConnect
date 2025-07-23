import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { Calendar, Clock, HardHat } from 'lucide-react';

interface Unavailability {
  date: string;
  slot: string;
}

interface WorkerProfileData {
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  area: string;
  availability: Unavailability[];
  bio?: string;
}

const WorkerProfile = () => {
  const [profileData, setProfileData] = useState<WorkerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState({
    phoneNumber: '',
    area: '',
    serviceType: ''
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
          serviceType: response.data.serviceType
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
        serviceType: editableFields.serviceType
      }, {
        withCredentials: true
      });

      toast.success("Your profile has been updated.");
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        withCredentials: true
      });
      setProfileData(response.data);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const formatUnavailability = (unavailability: Unavailability[]) => {
    if (unavailability.length === 0) {
      return <p className="text-gray-600">No unavailable slots.</p>;
    }
  
    return (
      <ul className="space-y-3">
        {unavailability.map((entry, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-700">
            <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">{entry.date}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {entry.slot}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
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
                    <Input value={profileData.name} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input value={profileData.username} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profileData.email} readOnly />
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

          {/* Unavailable or Booked Slots Card */}
          <Card className="bg-white rounded-xl shadow-md">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-3 border-b">
              <div className="flex justify-between items-center">
                <CardTitle>Unavailable or Booked Slots</CardTitle>
                <Link to="/worker/setavailability">
                  <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Edit Slots
                  </Button>
                </Link>
              </div>
            </div>
            <CardContent className="p-6">
              {formatUnavailability(profileData.availability)}
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
