// src/pages/Login.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent} from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { HardHat } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
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
              <h2 className="text-2xl font-bold text-white">Worker Login</h2>
              <p className="text-blue-100">Sign in to your professional account</p>
            </div>

            {/* Card Content */}
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus-visible:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus-visible:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </Label>
                  </div>
                  <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>

    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;