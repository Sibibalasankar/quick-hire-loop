import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreHorizontal, Eye, Edit, Trash2, MessageCircle, Users,
  Calendar, MapPin, DollarSign, Plus, AlertCircle, CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MyJobs = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  // Mock job data
  const jobs = {
    active: [
      {
        id: 1,
        title: "Construction Helper",
        location: "Manhattan, NY",
        pay: "$150/day",
        posted: "2024-01-16",
        applications: 12,
        views: 45,
        status: "active",
        urgent: true,
        category: "Construction"
      },
      {
        id: 2,
        title: "Delivery Driver",
        location: "Brooklyn, NY", 
        pay: "$18/hr",
        posted: "2024-01-15",
        applications: 8,
        views: 32,
        status: "active",
        urgent: false,
        category: "Transportation"
      }
    ],
    filled: [
      {
        id: 3,
        title: "Event Staff",
        location: "Queens, NY",
        pay: "$100/day",
        posted: "2024-01-14",
        applications: 15,
        views: 67,
        status: "filled",
        urgent: false,
        category: "Events",
        hiredWorker: "John Smith"
      }
    ],
    draft: [
      {
        id: 4,
        title: "Kitchen Helper",
        location: "Manhattan, NY",
        pay: "$16/hr", 
        posted: "2024-01-16",
        applications: 0,
        views: 0,
        status: "draft",
        urgent: false,
        category: "Food Service"
      }
    ],
    expired: [
      {
        id: 5,
        title: "Moving Assistant",
        location: "Bronx, NY",
        pay: "$20/hr",
        posted: "2024-01-10", 
        applications: 5,
        views: 23,
        status: "expired",
        urgent: false,
        category: "Services"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "filled": return "secondary";
      case "draft": return "outline";
      case "expired": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filled": return <CheckCircle className="w-3 h-3" />;
      case "active": return <AlertCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const JobCard = ({ job }: { job: any }) => (
    <Card className="hover:shadow-card transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              {job.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
              <Badge variant={getStatusColor(job.status)} className="text-xs gap-1">
                {getStatusIcon(job.status)}
                {job.status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>
              <span className="flex items-center gap-1 font-medium text-green-600">
                <DollarSign className="w-3 h-3" />
                {job.pay}
              </span>
              <Badge variant="outline" className="text-xs">{job.category}</Badge>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Posted {job.posted}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span>{job.applications} applications</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span>{job.views} views</span>
              </div>
            </div>

            {job.hiredWorker && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <span className="text-sm font-medium">Hired: </span>
                <span className="text-sm">{job.hiredWorker}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {job.status === "active" && (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Messages ({job.applications})
                </Button>
                <Button variant="outline" size="sm">
                  View Applications
                </Button>
              </>
            )}

            {job.status === "draft" && (
              <Button variant="default" size="sm">
                Publish Job
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Job
                </DropdownMenuItem>
                {job.status === "active" && (
                  <DropdownMenuItem className="gap-2">
                    <Users className="w-4 h-4" />
                    Manage Applications
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive">
                  <Trash2 className="w-4 h-4" />
                  Delete Job
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No {type} jobs
        </h3>
        <p className="text-muted-foreground mb-4">
          {type === "active" && "You don't have any active job listings."}
          {type === "filled" && "No jobs have been filled yet."}
          {type === "draft" && "No draft jobs saved."}
          {type === "expired" && "No expired jobs."}
        </p>
        {type === "active" && (
          <Link to="/post-job">
            <Button variant="cta" className="gap-2">
              <Plus className="w-4 h-4" />
              Post Your First Job
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Jobs</h1>
          <p className="text-muted-foreground">Manage your job postings and applications</p>
        </div>
        
        <Link to="/post-job">
          <Button variant="cta" className="gap-2 mt-4 md:mt-0">
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{jobs.active.length}</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {jobs.active.reduce((sum, job) => sum + job.applications, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{jobs.filled.length}</div>
              <div className="text-sm text-muted-foreground">Jobs Filled</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{jobs.draft.length}</div>
              <div className="text-sm text-muted-foreground">Draft Jobs</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active" className="gap-2">
            Active ({jobs.active.length})
          </TabsTrigger>
          <TabsTrigger value="filled" className="gap-2">
            Filled ({jobs.filled.length})
          </TabsTrigger>
          <TabsTrigger value="draft" className="gap-2">
            Drafts ({jobs.draft.length})
          </TabsTrigger>
          <TabsTrigger value="expired" className="gap-2">
            Expired ({jobs.expired.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="active" className="space-y-4">
            {jobs.active.length > 0 ? (
              jobs.active.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <EmptyState type="active" />
            )}
          </TabsContent>

          <TabsContent value="filled" className="space-y-4">
            {jobs.filled.length > 0 ? (
              jobs.filled.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <EmptyState type="filled" />
            )}
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            {jobs.draft.length > 0 ? (
              jobs.draft.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <EmptyState type="draft" />
            )}
          </TabsContent>

          <TabsContent value="expired" className="space-y-4">
            {jobs.expired.length > 0 ? (
              jobs.expired.map(job => <JobCard key={job.id} job={job} />)
            ) : (
              <EmptyState type="expired" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MyJobs;