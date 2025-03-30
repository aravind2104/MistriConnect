import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-tool-blue to-blue-700 text-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Earn More as a Professional Handyman
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Join MistriConnect and connect with customers looking for your skills. Manage your schedule, set your rates, and grow your business.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button size="lg" className="bg-white text-tool-blue hover:bg-gray-100">
                    Worker Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Register as a Handyman
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45249ff49?q=80&w=2069&auto=format&fit=crop" 
                alt="Handyman at work" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join MistriConnect?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help skilled workers find more clients, manage their business, and increase their earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Find More Clients</h3>
              <p className="text-gray-600">
                Connect with customers in your area who need your specific skills and services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Set Your Own Rates</h3>
              <p className="text-gray-600">
                You decide how much you charge for your services based on your skills and experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Flexible Schedule</h3>
              <p className="text-gray-600">
                Work when you want - set your availability and accept jobs that fit your schedule.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Build Your Reputation</h3>
              <p className="text-gray-600">
                Collect reviews from satisfied customers to boost your profile and attract more business.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Simple Payment Process</h3>
              <p className="text-gray-600">
                Get paid quickly and securely through our trusted payment system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow border">
              <div className="bg-tool-blue/10 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-tool-blue" />
              </div>
              <h3 className="text-xl font-bold mb-4">Business Growth Tools</h3>
              <p className="text-gray-600">
                Access tools and insights to help you manage and grow your handyman business.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/signup">
              <Button size="lg" className="bg-tool-blue hover:bg-tool-blue/90">
                Join as a Handyman Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-gradient-to-r from-tool-brown to-tool-blue text-white rounded-xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Handyman Business?</h2>
                <p className="text-lg mb-8 opacity-90">
                  Join thousands of skilled professionals who have increased their earnings through MistriConnect.
                </p>
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-tool-blue hover:bg-gray-100">
                    Get Started Now
                  </Button>
                </Link>
              </div>
              <div className="text-center md:text-right">
                <div className="bg-white/10 p-6 rounded-lg inline-block">
                  <div className="text-5xl font-bold mb-2">5,000+</div>
                  <div className="text-xl">Registered Handymen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;