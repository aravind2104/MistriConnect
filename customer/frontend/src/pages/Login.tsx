import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MistriLogo } from "@/components/MistriLogo";

const Login = () => {
  const navigate = useNavigate();

  // Email-Password Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP Login State
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [activeOtpMethod, setActiveOtpMethod] = useState("email");

  const handlePasswordLogin = () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    // Mock login check
    if (email === "user@example.com" && password === "123") {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  const handleSendOtp = () => {
    if (activeOtpMethod === "email" && !email) {
      toast.error("Please enter your email address");
      return;
    }
    if (activeOtpMethod === "phone" && !phone) {
      toast.error("Please enter your phone number");
      return;
    }

    toast.success(`OTP sent to your ${activeOtpMethod === "email" ? "email" : "phone"}`);
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    if (otp === "1234") {
      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      toast.error("Invalid OTP. Please try again");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mb-8">
        <MistriLogo />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to MistriConnect</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="password">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="password">Password Login</TabsTrigger>
              <TabsTrigger value="otp">OTP Login</TabsTrigger>
            </TabsList>

            {/* Email & Password Login */}
            <TabsContent value="password">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={handlePasswordLogin}>
                  Login
                </Button>
              </div>
            </TabsContent>

            {/* OTP-Based Login */}
            <TabsContent value="otp">
              <Tabs defaultValue="email" onValueChange={setActiveOtpMethod}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="phone">Phone</TabsTrigger>
                </TabsList>

                <TabsContent value="email">
                  {!isOtpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" onClick={handleSendOtp}>
                        Send OTP
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" onClick={handleVerifyOtp}>
                        Verify & Login
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setIsOtpSent(false)}>
                        Back
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="phone">
                  {!isOtpSent ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" onClick={handleSendOtp}>
                        Send OTP
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <Button className="w-full" onClick={handleVerifyOtp}>
                        Verify & Login
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setIsOtpSent(false)}>
                        Back
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center w-full">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
