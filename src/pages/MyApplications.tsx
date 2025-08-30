import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, MapPin, DollarSign, MessageCircle, Eye, 
  Clock, Star, Briefcase, AlertCircle, CheckCircle, X
} from "lucide-react";

const MyApplications = () => {
  const [selectedTab, setSelectedTab] = useState("pending");

  // Mock application data
  const applications = {
    pending: [
      {
        id: 1,
        jobTitle: "Construction Helper",
        company: "BuildCorp NYC",
        location: "Manhattan, NY",
        pay: "$150/day",
        appliedDate: "2024-01-16",
        status: "pending",
        urgent: true,
        category: "Construction"
      },
      {
        id: 2,
        jobTitle: "Delivery Driver", 
        company: "QuickDelivery",
        location: "Brooklyn, NY",
        pay: "$18/hr",
        appliedDate: "2024-01-15",
        status: "pending",
        urgent: false,
        category: "Transportation"
      }
    ],
    interview: [
      {
        id: 3,
        jobTitle: "Event Staff",
        company: "Events Plus", 
        location: "Queens, NY",
        pay: "$100/day",
        appliedDate: "2024-01-14",
        status: "interview",
        interviewDate: "2024-01-18",
        interviewTime: "2:00 PM",
        urgent: false,
        category: "Events"
      }
    ],
    accepted: [
      {
        id: 4,
        jobTitle: "Kitchen Helper",
        company: "City Diner",
        location: "Manhattan, NY", 
        pay: "$16/hr",
        appliedDate: "2024-01-13",
        status: "accepted",
        startDate: "2024-01-20",
        urgent: false,
        category: "Food Service"
      }
    ],
    rejected: [
      {
        id: 5,
        jobTitle: "Moving Assistant",
        company: "MoveIt NYC",
        location: "Bronx, NY",
        pay: "$20/hr",
        appliedDate: "2024-01-12",
        status: "rejected",
        rejectionReason: "Position filled",
        urgent: false,
        category: "Services"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "default";
      case "interview": return "secondary"; 
      case "accepted": return "default";
      case "rejected": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-3 h-3" />;
      case "interview": return <AlertCircle className="w-3 h-3" />;
      case "accepted": return <CheckCircle className="w-3 h-3" />;
      case "rejected": return <X className="w-3 h-3" />;
      default: return null;
    }
  };

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card className="hover:shadow-card transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
              {application.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
              <Badge variant={getStatusColor(application.status)} className="text-xs gap-1">
                {getStatusIcon(application.status)}
                {application.status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="font-medium text-foreground">{application.company}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {application.location}
              </span>
              <span className="flex items-center gap-1 font-medium text-green-600">
                <DollarSign className="w-3 h-3" />
                {application.pay}
              </span>
              <Badge variant="outline" className="text-xs">{application.category}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Applied on {application.appliedDate}</span>
              </div>

              {application.status === "interview" && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300">
                    <AlertCircle className="w-4 h-4" />
                    Interview Scheduled
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Date: {application.interviewDate} at {application.interviewTime}
                  </div>
                </div>
              )}

              {application.status === "accepted" && (
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 font-medium text-green-700 dark:text-green-300">
                    <CheckCircle className="w-4 h-4" />
                    Congratulations! You got the job
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                    Start date: {application.startDate}
                  </div>
                </div>
              )}

              {application.status === "rejected" && (
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 font-medium text-red-700 dark:text-red-300">
                    <X className="w-4 h-4" />
                    Application Not Selected
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                    Reason: {application.rejectionReason}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              View Job
            </Button>
            
            {application.status !== "rejected" && (
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Message
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ type }: { type: string }) => (
    <Card>
      <CardContent className="p-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          No {type} applications
        </h3>
        <p className="text-muted-foreground mb-4">
          {type === "pending" && "You don't have any pending applications."}
          {type === "interview" && "No scheduled interviews at the moment."}
          {type === "accepted" && "No accepted applications yet."}
          {type === "rejected" && "No rejected applications."}
        </p>
        {(type === "pending" || type === "interview") && (
          <Button variant="cta">
            Browse Available Jobs
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track your job applications and their status</p>
        </div>
        
        <Button variant="cta">
          Find More Jobs
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{applications.pending.length}</div>
              <div className="text-sm text-muted-foreground">Pending Review</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{applications.interview.length}</div>
              <div className="text-sm text-muted-foreground">Interviews</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{applications.accepted.length}</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                {Object.values(applications).flat().length}
              </div>
              <div className="text-sm text-muted-foreground">Total Applied</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Listings */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="gap-2">
            Pending ({applications.pending.length})
          </TabsTrigger>
          <TabsTrigger value="interview" className="gap-2">
            Interviews ({applications.interview.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="gap-2">
            Accepted ({applications.accepted.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="gap-2">
            Rejected ({applications.rejected.length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="pending" className="space-y-4">
            {applications.pending.length > 0 ? (
              applications.pending.map(app => <ApplicationCard key={app.id} application={app} />)
            ) : (
              <EmptyState type="pending" />
            )}
          </TabsContent>

          <TabsContent value="interview" className="space-y-4">
            {applications.interview.length > 0 ? (
              applications.interview.map(app => <ApplicationCard key={app.id} application={app} />)
            ) : (
              <EmptyState type="interview" />
            )}
          </TabsContent>

          <TabsContent value="accepted" className="space-y-4">
            {applications.accepted.length > 0 ? (
              applications.accepted.map(app => <ApplicationCard key={app.id} application={app} />)
            ) : (
              <EmptyState type="accepted" />
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {applications.rejected.length > 0 ? (
              applications.rejected.map(app => <ApplicationCard key={app.id} application={app} />)
            ) : (
              <EmptyState type="rejected" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MyApplications;