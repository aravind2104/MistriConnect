import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HardHat } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <HardHat className="h-12 w-12 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-center text-gray-900">About MistriConnect</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4">
              <CardTitle className="text-white text-center text-2xl">Our Mission</CardTitle>
            </div>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-gray-700 mb-6">
                MistriConnect is revolutionizing the way skilled workers connect with customers. 
                We're building a trusted platform that empowers tradespeople while ensuring 
                homeowners get quality service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-600 mb-3">For Workers</h3>
                  <p className="text-gray-600">
                    Find more clients, set your own rates, and grow your business with our 
                    powerful tools and support.
                  </p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-600 mb-3">For Customers</h3>
                  <p className="text-gray-600">
                    Get reliable, vetted professionals for all your home service needs with 
                    transparent pricing and reviews.
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "1. Create Profile",
                    description: "Workers showcase their skills and experience"
                  },
                  {
                    title: "2. Get Hired",
                    description: "Customers find and book qualified professionals"
                  },
                  {
                    title: "3. Complete Jobs",
                    description: "Secure payments and build your reputation"
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                    <h3 className="font-medium text-blue-600 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Join Our Community</h2>
                <p className="text-gray-600 mb-6">
                  Whether you're a skilled worker looking for more opportunities or a homeowner 
                  needing reliable service, MistriConnect is here to help.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;