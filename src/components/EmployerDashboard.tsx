import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase, Users, Clock, Star, TrendingUp, Calendar,
  Plus, Eye, MessageCircle, DollarSign
} from "lucide-react";

const EmployerDashboard = () => {
  const { user } = useAuth();

  // Mock data
  const activeJobs = [
    { 
      id: 1, 
      title: "Construction Helper", 
      location: "Manhattan", 
      posted: "2024-01-16", 
      applications: 12, 
      status: "active",
      pay: "$150/day",
      urgent: true
    },
    { 
      id: 2, 
      title: "Delivery Driver", 
      location: "Brooklyn", 
      posted: "2024-01-15", 
      applications: 8, 
      status: "active",
      pay: "$18/hr",
      urgent: false
    },
    { 
      id: 3, 
      title: "Event Staff", 
      location: "Queens", 
      posted: "2024-01-14", 
      applications: 15, 
      status: "filled",
      pay: "$100/day",
      urgent: false
    },
  ];

  const recentApplications = [
    { 
      id: 1, 
      jobTitle: "Construction Helper", 
      applicant: "John Smith", 
      rating: 4.8, 
      experience: "5+ years", 
      applied: "2 hours ago",
      status: "new"
    },
    { 
      id: 2, 
      jobTitle: "Delivery Driver", 
      applicant: "Mike Johnson", 
      rating: 4.6, 
      experience: "3+ years", 
      applied: "4 hours ago",
      status: "reviewed"
    },
    { 
      id: 3, 
      jobTitle: "Construction Helper", 
      applicant: "David Lee", 
      rating: 4.9, 
      experience: "7+ years", 
      applied: "6 hours ago",
      status: "new"
    },
  ];

  const stats = {
    activeJobs: 5,
    totalApplications: 47,
    hiredWorkers: 23,
    avgResponseTime: "2.5 hrs"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Manage your jobs and find the perfect workers</p>
        </div>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link to="/post-job">
            <Button variant="cta">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
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
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Workers Hired</p>
                <h3 className="text-2xl font-bold text-green-600">{stats.hiredWorkers}</h3>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <h3 className="text-2xl font-bold">{stats.avgResponseTime}</h3>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Job Posts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Active Job Posts
                </CardTitle>
                <CardDescription>Your current job listings</CardDescription>
              </div>
              <Link to="/my-jobs">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map(job => (
                <div key={job.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{job.title}</h4>
                        {job.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
                        <Badge variant={job.status === 'filled' ? 'secondary' : 'default'} className="text-xs">
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span className="font-medium text-green-600">{job.pay}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Posted {job.posted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {job.applications} applications
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Recent Applications
                </CardTitle>
                <CardDescription>New applicants for your jobs</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map(app => (
                <div key={app.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{app.applicant}</h4>
                      <p className="text-sm text-muted-foreground">{app.jobTitle}</p>
                    </div>
                    <Badge variant={app.status === 'new' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {app.rating}
                    </span>
                    <span>{app.experience}</span>
                    <span>{app.applied}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button variant="default" size="sm">Message</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get things done faster</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/post-job">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Plus className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <h3 className="font-medium">Post a Job</h3>
                    <p className="text-sm text-muted-foreground">Create a new job listing</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/messages">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2 text-secondary" />
                    <h3 className="font-medium">Messages</h3>
                    <p className="text-sm text-muted-foreground">Chat with applicants</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/my-jobs">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <h3 className="font-medium">Manage Jobs</h3>
                    <p className="text-sm text-muted-foreground">View all job posts</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;