import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/MainLayout";
import { HandymanCard } from "@/components/HandymanCard";
import { Card } from "@/components/ui/card";
import { search } from "./custAPI";
import { Handyman } from "@/types/types";

const serviceOptions: string[] = ["Plumber", "Electrician", "Carpenter", "Painter", "Mechanic"];

const Search = () => {
  const [serviceType, setServiceType] = useState(serviceOptions[0]); // Default to first option
  const [area, setArea] = useState("");
  const [handymen, setHandymen] = useState<Handyman[]>([]);

  const filterSearch = async () => {
    const handymen = await search(serviceType, area);
    if (handymen) {
      setHandymen(handymen);
    }
  };

  useEffect(() => {
    filterSearch();
  }, [area, serviceType]);

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Find a Handyman</h1>

        {/* Search Fields */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dropdown for Service Type */}
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select service type"
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Input for Area */}
          <Input
            placeholder="Enter area or location"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        {/* Results */}
        <div className="mb-2 text-sm text-gray-500">
          Showing {handymen.length} results
        </div>

        {handymen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {handymen.map((handyman) => (
              <HandymanCard key={handyman._id} handyman={handyman} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="font-semibold mb-2">No handymen found</h3>
            <p className="text-gray-500 mb-4">Try changing your search criteria.</p>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
