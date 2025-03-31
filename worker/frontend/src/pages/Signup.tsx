// src/pages/Signup.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { HardHat } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        serviceType: '',
        area: ''
    });
    const { signup, isLoading } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signup(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col items-center justify-center">
                    {/* Logo/Header Section */}
                    <div className="flex items-center mb-8">
                        <HardHat className="h-10 w-10 text-blue-600 mr-3" />
                        <span className="text-2xl font-bold text-blue-600">MistriConnect</span>
                    </div>

                    {/* Card Container with Shadow */}
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Blue Gradient Card Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
                            <h2 className="text-2xl font-bold text-white">Worker Registration</h2>
                            <p className="text-blue-100">Join our professional network</p>
                        </div>

                        {/* Card Content */}
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {Object.entries(formData).map(([field, value]) => (
                                    <div key={field} className="space-y-2">
                                        <Label htmlFor={field} className="text-gray-700">
                                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                        </Label>
                                        <Input
                                            id={field}
                                            name={field}
                                            type={field === 'password' ? 'password' : 'text'}
                                            placeholder={`Enter your ${field.toLowerCase().replace(/([A-Z])/g, ' $1')}`}
                                            value={value}
                                            onChange={handleChange}
                                            className="focus-visible:ring-blue-500"
                                            required
                                        />
                                    </div>
                                ))}

                                <div className="flex items-center pt-2">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        required
                                    />
                                    <Label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-md mt-4"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Registering..." : "Create Account"}
                                </Button>
                            </form>
                        </CardContent>

                        {/* Card Footer */}
                        <CardFooter className="bg-gray-50 px-6 py-4 border-t">
                            <p className="text-sm text-center text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </CardFooter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;