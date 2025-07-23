import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, HardHat, Clock, DollarSign, Star, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced gradient intensity */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-900">
        <div className="container mx-auto px-6 md:px-12 lg:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Earn More as a Professional Handyman
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-lg mx-auto lg:mx-0">
                Join MistriConnect and connect with customers looking for your skills. Manage your schedule, set your rates, and grow your business.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/login">
                  <Button size="lg" className="bg-blue-600 text-white px-8 hover:bg-blue-700">
                    Worker Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:block">
              <img 
                src="https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Handyman at work" 
                className="rounded-lg shadow-xl w-full max-w-md object-cover"
                style={{ height: '400px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Why Join MistriConnect?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to help skilled workers find more clients and grow their business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <HardHat className="h-7 w-7 text-blue-600" />,
                title: "Find More Clients",
                description: "Connect with customers in your area who need your specific skills."
              },
              { 
                icon: <DollarSign className="h-7 w-7 text-blue-600" />,
                title: "Set Your Rates",
                description: "You decide how much to charge based on your skills and experience."
              },
              { 
                icon: <Clock className="h-7 w-7 text-blue-600" />,
                title: "Flexible Schedule",
                description: "Work when you want - accept jobs that fit your availability."
              },
              { 
                icon: <Star className="h-7 w-7 text-blue-600" />,
                title: "Build Reputation",
                description: "Collect reviews to boost your profile and attract more business."
              },
              { 
                icon: <CheckCircle2 className="h-7 w-7 text-blue-600" />,
                title: "Secure Payments",
                description: "Get paid quickly through our trusted payment system."
              },
              { 
                icon: <TrendingUp className="h-7 w-7 text-blue-600" />,
                title: "Growth Tools",
                description: "Access insights to help manage and grow your business."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className="bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-12 py-6 text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Skilled Workers</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">$10M+</div>
              <div className="text-gray-600">Earned by Workers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced gradient */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
            Join thousands of skilled professionals who have increased their earnings through MistriConnect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-blue-600 px-12 py-6 text-lg hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 px-12 py-6 text-lg hover:bg-gray-100">
                Existing Worker
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;