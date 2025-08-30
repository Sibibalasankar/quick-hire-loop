import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Users, Briefcase, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [workerData, setWorkerData] = useState({
    name: "", email: "", password: "", phone: "", location: "", skills: ""
  });
  const [employerData, setEmployerData] = useState({
    name: "", email: "", password: "", phone: "", company: "", industry: "", location: ""
  });
  const [showWorkerPassword, setShowWorkerPassword] = useState(false);
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const industries = [
    "Construction", "Retail", "Hospitality", "Healthcare", "Transportation",
    "Manufacturing", "Food Service", "Cleaning", "Events", "Other"
  ];

  const handleSignup = async (type: 'worker' | 'employer') => {
    const data = type === 'worker' ? workerData : employerData;
    
    if (!data.name || !data.email || !data.password || !data.phone || !data.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (type === 'employer' && (!employerData.company || !employerData.industry)) {
      toast({
        title: "Error",
        description: "Please fill in company and industry information",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const signupData = type === 'worker' 
      ? { ...workerData, skills: workerData.skills.split(',').map(s => s.trim()).filter(Boolean) }
      : employerData;

    const success = await signup(signupData, type);
    
    if (success) {
      toast({
        title: "Success",
        description: `Welcome to QuickHire Loop! Account created as ${type}`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-cta rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Join QuickHire Loop</h1>
          <p className="text-muted-foreground">Create your account and start connecting</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Choose your account type to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="worker" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="worker" className="gap-2">
                  <Users className="w-4 h-4" />
                  Worker
                </TabsTrigger>
                <TabsTrigger value="employer" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Employer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="worker" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="worker-name">Full Name *</Label>
                    <Input
                      id="worker-name"
                      placeholder="John Doe"
                      value={workerData.name}
                      onChange={(e) => setWorkerData({ ...workerData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="worker-phone">Phone *</Label>
                    <Input
                      id="worker-phone"
                      placeholder="+1234567890"
                      value={workerData.phone}
                      onChange={(e) => setWorkerData({ ...workerData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="worker-email">Email *</Label>
                  <Input
                    id="worker-email"
                    type="email"
                    placeholder="john@example.com"
                    value={workerData.email}
                    onChange={(e) => setWorkerData({ ...workerData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="worker-password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="worker-password"
                      type={showWorkerPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={workerData.password}
                      onChange={(e) => setWorkerData({ ...workerData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowWorkerPassword(!showWorkerPassword)}
                    >
                      {showWorkerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="worker-location">Location *</Label>
                  <Input
                    id="worker-location"
                    placeholder="New York, NY"
                    value={workerData.location}
                    onChange={(e) => setWorkerData({ ...workerData, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="worker-skills">Skills (optional)</Label>
                  <Textarea
                    id="worker-skills"
                    placeholder="Construction, Driving, Cleaning (comma separated)"
                    value={workerData.skills}
                    onChange={(e) => setWorkerData({ ...workerData, skills: e.target.value })}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={() => handleSignup('worker')} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Worker Account"}
                </Button>
              </TabsContent>

              <TabsContent value="employer" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employer-name">Full Name *</Label>
                    <Input
                      id="employer-name"
                      placeholder="Jane Smith"
                      value={employerData.name}
                      onChange={(e) => setEmployerData({ ...employerData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employer-phone">Phone *</Label>
                    <Input
                      id="employer-phone"
                      placeholder="+1234567890"
                      value={employerData.phone}
                      onChange={(e) => setEmployerData({ ...employerData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer-email">Email *</Label>
                  <Input
                    id="employer-email"
                    type="email"
                    placeholder="jane@company.com"
                    value={employerData.email}
                    onChange={(e) => setEmployerData({ ...employerData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer-password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="employer-password"
                      type={showEmployerPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={employerData.password}
                      onChange={(e) => setEmployerData({ ...employerData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowEmployerPassword(!showEmployerPassword)}
                    >
                      {showEmployerPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer-company">Company Name *</Label>
                  <Input
                    id="employer-company"
                    placeholder="ABC Construction Co."
                    value={employerData.company}
                    onChange={(e) => setEmployerData({ ...employerData, company: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer-industry">Industry *</Label>
                  <Select onValueChange={(value) => setEmployerData({ ...employerData, industry: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employer-location">Location *</Label>
                  <Input
                    id="employer-location"
                    placeholder="New York, NY"
                    value={employerData.location}
                    onChange={(e) => setEmployerData({ ...employerData, location: e.target.value })}
                  />
                </div>

                <Button 
                  onClick={() => handleSignup('employer')} 
                  className="w-full" 
                  disabled={isLoading}
                  variant="cta"
                >
                  {isLoading ? "Creating Account..." : "Create Employer Account"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;