import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Users, Briefcase, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [workerData, setWorkerData] = useState({ email: "", password: "" });
  const [employerData, setEmployerData] = useState({ email: "", password: "" });
  const [showWorkerPassword, setShowWorkerPassword] = useState(false);
  const [showEmployerPassword, setShowEmployerPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (type: 'worker' | 'employer') => {
    const data = type === 'worker' ? workerData : employerData;
    
    if (!data.email || !data.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(data.email, data.password, type);
    
    if (success) {
      toast({
        title: "Success",
        description: `Welcome back! Logged in as ${type}`,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
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
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your QuickHire Loop account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Choose your account type to continue</CardDescription>
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
                <div className="space-y-2">
                  <Label htmlFor="worker-email">Email</Label>
                  <Input
                    id="worker-email"
                    type="email"
                    placeholder="worker@example.com"
                    value={workerData.email}
                    onChange={(e) => setWorkerData({ ...workerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="worker-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="worker-password"
                      type={showWorkerPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                <Button 
                  onClick={() => handleLogin('worker')} 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login as Worker"}
                </Button>
              </TabsContent>

              <TabsContent value="employer" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="employer-email">Email</Label>
                  <Input
                    id="employer-email"
                    type="email"
                    placeholder="employer@company.com"
                    value={employerData.email}
                    onChange={(e) => setEmployerData({ ...employerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="employer-password"
                      type={showEmployerPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                <Button 
                  onClick={() => handleLogin('employer')} 
                  className="w-full" 
                  disabled={isLoading}
                  variant="cta"
                >
                  {isLoading ? "Logging in..." : "Login as Employer"}
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                Forgot your password?
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

export default Login;