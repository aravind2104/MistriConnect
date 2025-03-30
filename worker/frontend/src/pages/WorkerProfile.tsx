import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const WorkerProfile = () => {
// Personal details state
const [personalDetails, setPersonalDetails] = useState({
fullName: 'John Doe',
email: 'john.doe@example.com',
phone: '(555) 123-4567',
location: 'New York, NY',
address: '123 Main St, Apt 4B',
city: 'New York',
state: 'NY',
zip: '10001',
});

// Work details state
const [workDetails, setWorkDetails] = useState({
specialties: 'Plumbing, Electrical, Carpentry',
experience: '5 years',
hourlyRate: '50',
workingHoursStart: '09:00',
workingHoursEnd: '17:00',
workingDays: 'Monday to Friday',
bio: 'Professional handyman with over 5 years of experience in residential and commercial repairs.',
});

// Account settings state
const [accountSettings, setAccountSettings] = useState({
currentPassword: '',
newPassword: '',
confirmPassword: '',
emailNotifications: true,
smsNotifications: true,
appNotifications: true,
});

const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
setPersonalDetails(prev => ({
...prev,
[name]: value,
}));
};

const handleWorkDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value } = e.target;
setWorkDetails(prev => ({
...prev,
[name]: value,
}));
};

const handleAccountSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const { name, value, type, checked } = e.target;
setAccountSettings(prev => ({
...prev,
[name]: type === 'checkbox' ? checked : value,
}));
};

const handlePersonalDetailsSubmit = (e: React.FormEvent) => {
e.preventDefault();
toast( "Your personal details have been saved.");
};

const handleWorkDetailsSubmit = (e: React.FormEvent) => {
e.preventDefault();
toast("Your work details have been saved.");
};

const handleAccountSettingsSubmit = (e: React.FormEvent) => {
e.preventDefault();
if (accountSettings.newPassword !== accountSettings.confirmPassword) {
toast("Please ensure your passwords match.");
return;
}
toast("Your account settings have been saved.");
};

return (
<div className="min-h-screen bg-gray-50 py-8">
<div className="container px-4 mx-auto">
<div className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold text-gray-900">Worker Profile</h1>
<Link to="/worker/dashboard">
<Button variant="outline">Back to Dashboard</Button>
</Link>
</div>

<Tabs defaultValue="personal" className="w-full">
<TabsList className="grid w-full grid-cols-3">
<TabsTrigger value="personal">Personal Details</TabsTrigger>
<TabsTrigger value="work">Work Details</TabsTrigger>
<TabsTrigger value="account">Account Settings</TabsTrigger>
</TabsList>

<TabsContent value="personal">
<Card>
<CardHeader>
<CardTitle>Personal Details</CardTitle>
<CardDescription>Update your personal information</CardDescription>
</CardHeader>
<CardContent>
<form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="fullName">Full Name</Label>
<Input 
id="fullName" 
name="fullName" 
value={personalDetails.fullName}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="email">Email</Label>
<Input 
id="email" 
name="email" 
type="email" 
value={personalDetails.email}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="phone">Phone</Label>
<Input 
id="phone" 
name="phone" 
value={personalDetails.phone}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="location">Location</Label>
<Input 
id="location" 
name="location" 
value={personalDetails.location}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="address">Address</Label>
<Input 
id="address" 
name="address" 
value={personalDetails.address}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="city">City</Label>
<Input 
id="city" 
name="city" 
value={personalDetails.city}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="state">State</Label>
<Input 
id="state" 
name="state" 
value={personalDetails.state}
onChange={handlePersonalDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="zip">ZIP Code</Label>
<Input 
id="zip" 
name="zip" 
value={personalDetails.zip}
onChange={handlePersonalDetailsChange}
/>
</div>
</div>
<Button type="submit" className="mt-6">Save Changes</Button>
</form>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="work">
<Card>
<CardHeader>
<CardTitle>Work Details</CardTitle>
<CardDescription>Update your professional information</CardDescription>
</CardHeader>
<CardContent>
<form onSubmit={handleWorkDetailsSubmit} className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<Label htmlFor="specialties">Specialties</Label>
<Input 
id="specialties" 
name="specialties" 
value={workDetails.specialties}
onChange={handleWorkDetailsChange}
placeholder="e.g., Plumbing, Electrical, Carpentry"
/>
</div>
<div className="space-y-2">
<Label htmlFor="experience">Experience</Label>
<Input 
id="experience" 
name="experience" 
value={workDetails.experience}
onChange={handleWorkDetailsChange}
placeholder="e.g., 5 years"
/>
</div>
<div className="space-y-2">
<Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
<Input 
id="hourlyRate" 
name="hourlyRate" 
type="number"
value={workDetails.hourlyRate}
onChange={handleWorkDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="workingDays">Working Days</Label>
<Input 
id="workingDays" 
name="workingDays" 
value={workDetails.workingDays}
onChange={handleWorkDetailsChange}
placeholder="e.g., Monday to Friday"
/>
</div>
<div className="space-y-2">
<Label htmlFor="workingHoursStart">Working Hours Start</Label>
<Input 
id="workingHoursStart" 
name="workingHoursStart" 
type="time"
value={workDetails.workingHoursStart}
onChange={handleWorkDetailsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="workingHoursEnd">Working Hours End</Label>
<Input 
id="workingHoursEnd" 
name="workingHoursEnd" 
type="time"
value={workDetails.workingHoursEnd}
onChange={handleWorkDetailsChange}
/>
</div>
</div>
<div className="space-y-2">
<Label htmlFor="bio">Bio/Description</Label>
<Textarea 
id="bio" 
name="bio" 
value={workDetails.bio}
onChange={handleWorkDetailsChange}
placeholder="Tell customers about your skills and experience"
rows={5}
/>
</div>
<Button type="submit" className="mt-6">Save Changes</Button>
</form>
</CardContent>
</Card>
</TabsContent>

<TabsContent value="account">
<Card>
<CardHeader>
<CardTitle>Account Settings</CardTitle>
<CardDescription>Update your account preferences</CardDescription>
</CardHeader>
<CardContent>
<form onSubmit={handleAccountSettingsSubmit} className="space-y-6">
<div className="space-y-4">
<h3 className="text-lg font-medium">Change Password</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="space-y-2">
<Label htmlFor="currentPassword">Current Password</Label>
<Input 
id="currentPassword" 
name="currentPassword" 
type="password"
value={accountSettings.currentPassword}
onChange={handleAccountSettingsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="newPassword">New Password</Label>
<Input 
id="newPassword" 
name="newPassword" 
type="password"
value={accountSettings.newPassword}
onChange={handleAccountSettingsChange}
/>
</div>
<div className="space-y-2">
<Label htmlFor="confirmPassword">Confirm Password</Label>
<Input 
id="confirmPassword" 
name="confirmPassword" 
type="password"
value={accountSettings.confirmPassword}
onChange={handleAccountSettingsChange}
/>
</div>
</div>
</div>

<div className="space-y-4">
<h3 className="text-lg font-medium">Notification Settings</h3>
<div className="space-y-2">
<div className="flex items-center space-x-2">
<input 
type="checkbox" 
id="emailNotifications" 
name="emailNotifications"
checked={accountSettings.emailNotifications}
onChange={handleAccountSettingsChange}
className="rounded text-tool-blue focus:ring-tool-blue"
/>
<Label htmlFor="emailNotifications">Email Notifications</Label>
</div>
<p className="text-sm text-gray-500">Receive new job alerts and updates via email</p>
</div>
<div className="space-y-2">
<div className="flex items-center space-x-2">
<input 
type="checkbox" 
id="smsNotifications" 
name="smsNotifications"
checked={accountSettings.smsNotifications}
onChange={handleAccountSettingsChange}
className="rounded text-tool-blue focus:ring-tool-blue"
/>
<Label htmlFor="smsNotifications">SMS Notifications</Label>
</div>
<p className="text-sm text-gray-500">Receive text message alerts for urgent jobs</p>
</div>
<div className="space-y-2">
<div className="flex items-center space-x-2">
<input 
type="checkbox" 
id="appNotifications" 
name="appNotifications"
checked={accountSettings.appNotifications}
onChange={handleAccountSettingsChange}
className="rounded text-tool-blue focus:ring-tool-blue"
/>
<Label htmlFor="appNotifications">App Notifications</Label>
</div>
<p className="text-sm text-gray-500">Receive push notifications in the mobile app</p>
</div>
</div>

<Button type="submit" className="mt-6">Save Settings</Button>
</form>
</CardContent>
</Card>
</TabsContent>
</Tabs>
</div>
</div>
);
};

export default WorkerProfile;
