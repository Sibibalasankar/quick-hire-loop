import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase, MapPin, Clock, Star, TrendingUp, Calendar,
  Search, Filter, DollarSign, Users
} from "lucide-react";

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [availabilityStatus, setAvailabilityStatus] = useState(true);

  // Mock data
  const recentJobs = [
    { id: 1, title: "Construction Helper", company: "BuildCorp", location: "Manhattan", date: "2024-01-15", status: "completed", pay: "$150" },
    { id: 2, title: "Delivery Driver", company: "QuickDelivery", location: "Brooklyn", date: "2024-01-10", status: "completed", pay: "$120" },
    { id: 3, title: "Event Staff", company: "Events Plus", location: "Queens", date: "2024-01-08", status: "completed", pay: "$100" },
  ];

  const activeApplications = [
    { id: 1, title: "Warehouse Worker", company: "LogisticsPro", location: "Bronx", applied: "2024-01-16", status: "pending" },
    { id: 2, title: "Kitchen Helper", company: "City Diner", location: "Manhattan", applied: "2024-01-14", status: "interview" },
  ];

  const nearbyJobs = [
    { id: 1, title: "Cleaning Staff", company: "CleanCorp", location: "0.5 miles away", pay: "$18/hr", urgent: true },
    { id: 2, title: "Moving Assistant", company: "MoveIt", location: "1.2 miles away", pay: "$20/hr", urgent: false },
    { id: 3, title: "Retail Associate", company: "QuickMart", location: "2.1 miles away", pay: "$16/hr", urgent: false },
  ];

  const stats = {
    totalEarnings: "$2,340",
    jobsCompleted: 15,
    avgRating: 4.8,
    responseRate: "95%"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Ready to find your next opportunity?</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${availabilityStatus ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm font-medium">
              {availabilityStatus ? 'Available for work' : 'Not available'}
            </span>
            <Button
              variant="outline" 
              size="sm"
              onClick={() => setAvailabilityStatus(!availabilityStatus)}
            >
              Toggle
            </Button>
          </div>
          <Link to="/find-jobs">
            <Button variant="cta">
              <Search className="w-4 h-4 mr-2" />
              Find Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <h3 className="text-2xl font-bold text-green-600">{stats.totalEarnings}</h3>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jobs Completed</p>
                <h3 className="text-2xl font-bold">{stats.jobsCompleted}</h3>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                <h3 className="text-2xl font-bold flex items-center gap-1">
                  {stats.avgRating}
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </h3>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                <h3 className="text-2xl font-bold">{stats.responseRate}</h3>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nearby Jobs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Jobs Near You
                </CardTitle>
                <CardDescription>Available opportunities in your area</CardDescription>
              </div>
              <Link to="/find-jobs">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nearbyJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{job.title}</h4>
                      {job.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-medium text-green-600">
                        <DollarSign className="w-3 h-3" />
                        {job.pay}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Active Applications
                </CardTitle>
                <CardDescription>Track your job applications</CardDescription>
              </div>
              <Link to="/my-applications">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeApplications.map(app => (
                <div key={app.id} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{app.title}</h4>
                    <Badge variant={app.status === 'interview' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {app.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Applied {app.applied}
                    </span>
                  </div>
                </div>
              ))}

              {activeApplications.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active applications</p>
                  <Link to="/find-jobs">
                    <Button variant="outline" className="mt-2">Browse Jobs</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Work History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Recent Work History
            </CardTitle>
            <CardDescription>Your completed jobs and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-medium">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {job.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{job.pay}</div>
                    <Badge variant="secondary" className="mt-1">
                      {job.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkerDashboard;