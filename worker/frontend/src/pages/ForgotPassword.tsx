import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { HardHat } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md bg-white rounded-xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
          <div className="flex items-center space-x-3">
            <HardHat className="h-8 w-8 text-white" />
            <CardTitle className="text-white text-lg">Forgot Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 text-sm mb-4">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-gray-600 px-6 py-4 border-t">
          <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
