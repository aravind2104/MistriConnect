import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MainLayout } from "@/components/MainLayout";
import { HandymanCard } from "@/components/HandymanCard";
import { Badge } from "@/components/ui/badge";
import { mockHandymen, categories } from "@/data/mockData";

interface FilterState {
  search: string;
  category: string;
  location: string;
  rating: number;
  availability: string;
  price: number;
  showFilters: boolean;
}

const Search = () => {
  //const [handymen, setHandymen] = useState(mockHandymen);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    location: "",
    rating: 0,
    availability: "",
    price: 100,
    showFilters: false,
  });
  const [filteredHandymen, setFilteredHandymen] = useState(mockHandymen);

  useEffect(() => {
    const filtered = mockHandymen.filter((handyman) => {
      // Search term filter (name or description)
      if (
        filters.search &&
        !handyman.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !handyman.description.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      
      // Category filter
      if (filters.category && handyman.category !== filters.category) {
        return false;
      }
      
      // Location filter
      if (
        filters.location &&
        !handyman.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }
      
      // Rating filter
      if (filters.rating > 0 && handyman.rating < filters.rating) {
        return false;
      }
      
      // Availability filter
      if (filters.availability && handyman.availability !== filters.availability) {
        return false;
      }
      
      // Price filter
      if (handyman.hourlyRate > filters.price) {
        return false;
      }
      
      return true;
    });
    
    setFilteredHandymen(filtered);
  }, [filters]);

  const toggleFilters = () => {
    setFilters({ ...filters, showFilters: !filters.showFilters });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      location: "",
      rating: 0,
      availability: "",
      price: 100,
      showFilters: true,
    });
  };

  const handleRatingChange = (value: number[]) => {
    setFilters({ ...filters, rating: value[0] });
  };

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, price: value[0] });
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Find a Handyman</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search for a handyman or service..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="flex-grow"
            />
            <Button variant="outline" onClick={toggleFilters}>
              {filters.showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Applied filters display */}
          {(filters.category || filters.location || filters.rating > 0 || 
            filters.availability || filters.price < 100) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {filters.category && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.category}
                  <button 
                    onClick={() => setFilters({ ...filters, category: "" })}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {filters.location && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.location}
                  <button 
                    onClick={() => setFilters({ ...filters, location: "" })}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {filters.rating > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {`${filters.rating}+ Stars`}
                  <button 
                    onClick={() => setFilters({ ...filters, rating: 0 })}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {filters.availability && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filters.availability}
                  <button 
                    onClick={() => setFilters({ ...filters, availability: "" })}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              {filters.price < 100 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {`Max $${filters.price}/hr`}
                  <button 
                    onClick={() => setFilters({ ...filters, price: 100 })}
                    className="ml-1 rounded-full w-4 h-4 flex items-center justify-center hover:bg-gray-200"
                  >
                    ×
                  </button>
                </Badge>
              )}
              
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8">
                Reset All
              </Button>
            </div>
          )}
        </div>
        
        {/* Filter Options */}
        {filters.showFilters && (
          <Card className="p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter area or zip code"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select 
                  value={filters.availability} 
                  onValueChange={(value) => setFilters({ ...filters, availability: value })}
                >
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Availability</SelectItem>
                    <SelectItem value="Available Now">Available Now</SelectItem>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="This Week">This Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Rating (Minimum)</Label>
                <div className="pt-2 px-3">
                  <Slider
                    value={[filters.rating]}
                    min={0}
                    max={5}
                    step={1}
                    onValueChange={handleRatingChange}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Any</span>
                    <span>⭐</span>
                    <span>⭐⭐</span>
                    <span>⭐⭐⭐</span>
                    <span>⭐⭐⭐⭐</span>
                    <span>⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 lg:col-span-4">
                <Label>Maximum Price ($ / Hour)</Label>
                <div className="pt-2 px-3">
                  <Slider
                    value={[filters.price]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={handlePriceChange}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$10</span>
                    <span>$25</span>
                    <span>$50</span>
                    <span>$75</span>
                    <span>$100+</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={() => setFilters({ ...filters, showFilters: false })}>
                Apply Filters
              </Button>
            </div>
          </Card>
        )}
        
        {/* Results */}
        <div className="mb-2 text-sm text-gray-500">
          Showing {filteredHandymen.length} results
        </div>
        
        {filteredHandymen.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHandymen.map((handyman) => (
              <HandymanCard key={handyman.id} handyman={handyman} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <h3 className="font-semibold mb-2">No handymen found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search filters to find available handymen.
            </p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
