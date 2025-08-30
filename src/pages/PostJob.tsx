import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, DollarSign, Calendar, Clock, Users, AlertCircle,
  Plus, X, Briefcase
} from "lucide-react";

const PostJob = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    payType: "",
    payAmount: "",
    duration: "",
    startDate: "",
    urgentHiring: false,
    requirements: [],
    benefits: []
  });

  const [currentRequirement, setCurrentRequirement] = useState("");
  const [currentBenefit, setCurrentBenefit] = useState("");

  const categories = [
    "Construction", "Transportation", "Events", "Food Service", 
    "Services", "Retail", "Cleaning", "Manufacturing", 
    "Healthcare", "Hospitality", "Other"
  ];

  const payTypes = [
    { value: "hourly", label: "Per Hour" },
    { value: "daily", label: "Per Day" },
    { value: "weekly", label: "Per Week" },
    { value: "fixed", label: "Fixed Project" }
  ];

  const durations = [
    "1 day", "2-3 days", "1 week", "2 weeks", 
    "1 month", "2-3 months", "Ongoing", "Project-based"
  ];

  const addRequirement = () => {
    if (currentRequirement.trim() && !jobData.requirements.includes(currentRequirement.trim())) {
      setJobData(prev => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()]
      }));
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (requirement: string) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req !== requirement)
    }));
  };

  const addBenefit = () => {
    if (currentBenefit.trim() && !jobData.benefits.includes(currentBenefit.trim())) {
      setJobData(prev => ({
        ...prev,
        benefits: [...prev.benefits, currentBenefit.trim()]
      }));
      setCurrentBenefit("");
    }
  };

  const removeBenefit = (benefit: string) => {
    setJobData(prev => ({
      ...prev,
      benefits: prev.benefits.filter(ben => ben !== benefit)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobData.title || !jobData.category || !jobData.description || 
        !jobData.location || !jobData.payType || !jobData.payAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Job posted successfully! You'll start receiving applications soon.",
      });
      
      navigate("/my-jobs");
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
        <p className="text-muted-foreground">
          Fill out the details below to find the perfect workers for your job
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Information
                </CardTitle>
                <CardDescription>
                  Provide basic details about the position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Construction Helper"
                      value={jobData.title}
                      onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setJobData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job responsibilities, what you're looking for, and any important details..."
                    rows={6}
                    value={jobData.description}
                    onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location & Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location & Schedule
                </CardTitle>
                <CardDescription>
                  Where and when will the work take place?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Work Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., 123 Main St, Manhattan, NY"
                    value={jobData.location}
                    onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select onValueChange={(value) => setJobData(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How long is this job?" />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map(duration => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={jobData.startDate}
                      onChange={(e) => setJobData(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={jobData.urgentHiring}
                    onCheckedChange={(checked) => 
                      setJobData(prev => ({ ...prev, urgentHiring: checked as boolean }))
                    }
                  />
                  <Label 
                    htmlFor="urgent" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    This is urgent hiring (will be marked as priority)
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Compensation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Compensation
                </CardTitle>
                <CardDescription>
                  How much will you pay for this work?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payType">Pay Type *</Label>
                    <Select onValueChange={(value) => setJobData(prev => ({ ...prev, payType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="How do you want to pay?" />
                      </SelectTrigger>
                      <SelectContent>
                        {payTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payAmount">
                      Amount * {jobData.payType && `(${payTypes.find(t => t.value === jobData.payType)?.label})`}
                    </Label>
                    <Input
                      id="payAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={jobData.payAmount}
                      onChange={(e) => setJobData(prev => ({ ...prev, payAmount: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements & Benefits</CardTitle>
                <CardDescription>
                  What skills or qualifications are needed? What benefits do you offer?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label>Requirements</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add a requirement (e.g., Physical fitness)"
                        value={currentRequirement}
                        onChange={(e) => setCurrentRequirement(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                      />
                      <Button type="button" onClick={addRequirement} variant="outline" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {jobData.requirements.map((req, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {req}
                          <button
                            type="button"
                            onClick={() => removeRequirement(req)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Benefits (Optional)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Add a benefit (e.g., Free lunch)"
                        value={currentBenefit}
                        onChange={(e) => setCurrentBenefit(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                      />
                      <Button type="button" onClick={addBenefit} variant="outline" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {jobData.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="gap-1">
                          {benefit}
                          <button
                            type="button"
                            onClick={() => removeBenefit(benefit)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Job Preview</CardTitle>
                <CardDescription>How your job will appear to workers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">
                    {jobData.title || "Job Title"}
                  </h3>
                  <p className="text-muted-foreground">{user?.company || "Your Company"}</p>
                  {jobData.urgentHiring && (
                    <Badge variant="destructive" className="mt-2">Urgent</Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{jobData.location || "Location not specified"}</span>
                  </div>
                  
                  {jobData.payAmount && jobData.payType && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-green-600">
                        ${jobData.payAmount}/{jobData.payType === 'hourly' ? 'hr' : 
                         jobData.payType === 'daily' ? 'day' : 
                         jobData.payType === 'weekly' ? 'week' : 'project'}
                      </span>
                    </div>
                  )}

                  {jobData.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{jobData.duration}</span>
                    </div>
                  )}
                </div>

                {jobData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {jobData.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Better Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <p>Be specific about what you need - clear job descriptions get better applicants</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <p>Competitive pay attracts quality workers faster</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <p>Mark as urgent only if you need workers immediately</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <p>Respond to applications quickly to secure the best candidates</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                variant="cta"
              >
                {isLoading ? "Posting Job..." : "Post Job"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/dashboard")}
              >
                Save as Draft
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;