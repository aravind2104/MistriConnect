import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setIsLoading(true);

// Simulate login process - in a real app, this would be connected to an API
setTimeout(() => {
toast.success("Redirecting to your dashboard...");
setIsLoading(false);
// In a real app, redirect to dashboard
window.location.href = '/worker/dashboard';
}, 1500);
};

return (
<div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
<div className="w-full max-w-md">
<div className="text-center mb-8">
<h2 className="text-3xl font-bold text-gray-900">Worker Login</h2>
<p className="mt-2 text-sm text-gray-600">
Sign in to your MistriConnect account
</p>
</div>

<Card>
<CardHeader>
<CardTitle>Login</CardTitle>
<CardDescription>Enter your credentials below</CardDescription>
</CardHeader>
<CardContent>
<form onSubmit={handleSubmit} className="space-y-4">
<div className="space-y-2">
<Label htmlFor="email">Email</Label>
<Input
id="email"
type="email"
placeholder="your@email.com"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/>
</div>
<div className="space-y-2">
<Label htmlFor="password">Password</Label>
<Input
id="password"
type="password"
placeholder="••••••••"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
<div className="text-right text-sm">
<a href="#" className="text-tool-blue hover:underline">
Forgot password?
</a>
</div>
<Button type="submit" className="w-full" disabled={isLoading}>
{isLoading ? "Signing in..." : "Sign in"}
</Button>
</form>
</CardContent>
<CardFooter className="justify-center border-t p-4">
<p className="text-sm text-gray-600">
Don't have an account?{' '}
<Link to="/signup" className="text-tool-blue font-medium hover:underline">
Sign Up Here
</Link>
</p>
</CardFooter>
</Card>
</div>
</div>
);
};

export default Login;