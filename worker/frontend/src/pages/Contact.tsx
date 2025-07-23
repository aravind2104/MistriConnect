import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, HardHat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <HardHat className="h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-center text-gray-900">Contact MistriConnect</h1>
          <p className="text-gray-600 mt-2 text-center max-w-lg">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
              <CardTitle className="text-white text-center text-2xl">Get In Touch</CardTitle>
            </div>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your name" 
                      className="focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="focus-visible:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="What's this about?" 
                    className="focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={5}
                    className="focus-visible:ring-blue-500"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send Message
                </Button>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">Our Contact Information</h2>
                <div className="space-y-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700">support@mistriconnect.com</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700">+1 234 567 8900</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-center">
                      123 Mistri Street<br />
                      Handyman City, USA
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;