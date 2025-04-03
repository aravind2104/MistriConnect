import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { skills } from "@/data/mockData";
import { SkillType } from "@/types";
import { toast } from "sonner";

const WorkerRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    skill: "" as SkillType | "",
    bio: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (value: string) => {
    setFormData((prev) => ({ ...prev, skill: value as SkillType }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.skill) {
      toast("Please fill in all required fields");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:5000/api/workers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast(`${formData.fullName} has been added as a ${formData.skill}`);
        navigate("/workers");
      } else {
        toast.error(data.error || "Failed to register worker");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was a problem registering the worker");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link to="/workers">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Register New Worker</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">
                Enter the worker's basic information
              </p>
            </div>

            <div className="grid gap-3">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter worker's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="worker@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="555-123-4567"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skill">Skill/Profession *</Label>
                <Select
                  value={formData.skill}
                  onValueChange={handleSkillChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Enter a brief description about the worker's experience and expertise"
                  className="min-h-32"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/workers")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Worker"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkerRegistration;
