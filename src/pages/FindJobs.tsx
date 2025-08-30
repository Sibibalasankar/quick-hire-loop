import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Filter, MapPin, DollarSign, Clock, Star, 
  Briefcase, Calendar, Users, AlertCircle 
} from "lucide-react";

const FindJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [payRangeFilter, setPayRangeFilter] = useState("");

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: "Construction Helper",
      company: "BuildCorp NYC",
      location: "Manhattan, NY",
      distance: "0.5 miles",
      pay: "$150/day",
      payType: "daily",
      category: "Construction",
      urgent: true,
      posted: "2 hours ago",
      description: "Looking for reliable construction helpers for residential building project. Must have basic tools.",
      requirements: ["Physical fitness", "Basic tool knowledge", "Reliability"],
      rating: 4.8,
      reviews: 156,
      duration: "2-3 days",
      startDate: "Tomorrow"
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "QuickDelivery",
      location: "Brooklyn, NY", 
      distance: "1.2 miles",
      pay: "$18/hr",
      payType: "hourly",
      category: "Transportation",
      urgent: false,
      posted: "4 hours ago",
      description: "Part-time delivery driver needed for food delivery service. Flexible hours.",
      requirements: ["Valid driver's license", "Own vehicle", "Clean driving record"],
      rating: 4.6,
      reviews: 89,
      duration: "Ongoing",
      startDate: "This week"
    },
    {
      id: 3,
      title: "Event Setup Staff",
      company: "Events Plus",
      location: "Queens, NY",
      distance: "2.1 miles", 
      pay: "$100/day",
      payType: "daily",
      category: "Events",
      urgent: true,
      posted: "1 hour ago",
      description: "Setting up tables, chairs, and decorations for weekend wedding event.",
      requirements: ["Physical fitness", "Attention to detail", "Team player"],
      rating: 4.7,
      reviews: 203,
      duration: "1 day",
      startDate: "This Saturday"
    },
    {
      id: 4,
      title: "Kitchen Helper",
      company: "City Diner",
      location: "Manhattan, NY",
      distance: "0.8 miles",
      pay: "$16/hr",
      payType: "hourly", 
      category: "Food Service",
      urgent: false,
      posted: "6 hours ago",
      description: "Kitchen assistant needed for busy diner. Food prep, cleaning, and basic cooking tasks.",
      requirements: ["Food safety knowledge", "Fast-paced environment", "Teamwork"],
      rating: 4.5,
      reviews: 74,
      duration: "Part-time",
      startDate: "Next week"
    },
    {
      id: 5,
      title: "Moving Assistant",
      company: "MoveIt NYC",
      location: "Bronx, NY",
      distance: "3.2 miles",
      pay: "$20/hr",
      payType: "hourly",
      category: "Services",
      urgent: false,
      posted: "8 hours ago", 
      description: "Help with residential moving. Heavy lifting and careful handling of furniture.",
      requirements: ["Physical strength", "Careful handling", "Punctuality"],
      rating: 4.9,
      reviews: 312,
      duration: "1-2 days",
      startDate: "Flexible"
    }
  ];

  const categories = ["All", "Construction", "Transportation", "Events", "Food Service", "Services", "Retail", "Cleaning"];
  const payRanges = ["All", "Under $15/hr", "$15-20/hr", "$20-25/hr", "Over $25/hr", "Daily rate"];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "All" || job.category === categoryFilter;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleApply = (jobId: number) => {
    // In a real app, this would handle the application process
    console.log(`Applied to job ${jobId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Jobs</h1>
        <p className="text-muted-foreground">Discover opportunities near you and apply instantly</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setPayRangeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Pay Range" />
              </SelectTrigger>
              <SelectContent>
                {payRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            {filteredJobs.length} Jobs Found
          </h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select defaultValue="newest">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="pay">Highest Pay</SelectItem>
              <SelectItem value="rating">Best Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map(job => (
          <Card key={job.id} className="hover:shadow-card transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Job Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        {job.urgent && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground mb-2">
                        <span className="font-medium text-foreground">{job.company}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{job.rating}</span>
                          <span className="text-sm">({job.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location} • {job.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {job.posted}
                        </span>
                        <Badge variant="secondary">{job.category}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{job.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium">{job.duration}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <div className="font-medium">{job.startDate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pay:</span>
                        <div className="font-medium text-green-600 text-lg">{job.pay}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-3 lg:w-48">
                  <Button 
                    onClick={() => handleApply(job.id)}
                    className="flex-1 lg:w-full"
                    variant={job.urgent ? "default" : "cta"}
                  >
                    Apply Now
                  </Button>
                  <Button variant="outline" className="flex-1 lg:w-full">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 lg:w-full gap-2">
                    <Users className="w-4 h-4" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or location
            </p>
            <Button variant="outline">Clear Filters</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FindJobs;