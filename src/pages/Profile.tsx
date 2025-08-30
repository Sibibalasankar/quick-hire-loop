import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Camera, Star, MapPin, Phone, Mail, Briefcase, 
  Award, Plus, X, Edit, Save, Calendar, DollarSign
} from "lucide-react";

const Profile = () => {
  const { user, userType, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    skills: userType === 'worker' ? (user?.skills || []) : [],
    bio: userType === 'worker' 
      ? "Experienced and reliable worker looking for flexible opportunities."
      : "We are always looking for talented and reliable workers to join our team.",
    availability: userType === 'worker' ? "Full-time" : "",
    company: userType === 'employer' ? (user?.company || "") : "",
    industry: userType === 'employer' ? (user?.industry || "") : "",
  });

  const [newSkill, setNewSkill] = useState("");

  // Mock work history data
  const workHistory = userType === 'worker' ? [
    {
      id: 1,
      title: "Construction Helper",
      company: "BuildCorp NYC", 
      duration: "Jan 2024 - Present",
      rating: 4.9,
      earnings: "$1,200"
    },
    {
      id: 2,
      title: "Delivery Driver",
      company: "QuickDelivery",
      duration: "Dec 2023",
      rating: 4.7,
      earnings: "$480"
    }
  ] : [
    {
      id: 1,
      title: "Kitchen Helper Position",
      worker: "John Smith",
      duration: "Jan 2024",
      rating: 4.8,
      cost: "$640"
    },
    {
      id: 2,
      title: "Event Staff Position", 
      worker: "Sarah Johnson",
      duration: "Dec 2023",
      rating: 5.0,
      cost: "$400"
    }
  ];

  const skills = userType === 'worker' ? [
    "Construction", "Driving", "Cleaning", "Moving", "Event Setup",
    "Kitchen Work", "Retail", "Warehouse", "Landscaping", "Painting"
  ] : [];

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile(profileData);
      setIsEditing(false);
      
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      skills: userType === 'worker' ? (user?.skills || []) : [],
      bio: userType === 'worker' 
        ? "Experienced and reliable worker looking for flexible opportunities."
        : "We are always looking for talented and reliable workers to join our team.",
      availability: userType === 'worker' ? "Full-time" : "",
      company: userType === 'employer' ? (user?.company || "") : "",
      industry: userType === 'employer' ? (user?.industry || "") : "",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile information and {userType === 'worker' ? 'work history' : 'hiring history'}
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                <Save className="w-4 h-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="history">
            {userType === 'worker' ? 'Work History' : 'Hiring History'}
          </TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="absolute -bottom-2 -right-2 w-8 h-8"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-2xl font-bold">{user?.name}</h2>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{user?.rating || '0.0'}</span>
                      <span className="text-muted-foreground text-sm">
                        ({workHistory.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {user?.phone || "Phone not provided"}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {user?.location || "Location not provided"}
                    </div>
                    {userType === 'employer' && user?.company && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {user.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                {userType === 'employer' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        disabled={!isEditing}
                        onValueChange={(value) => setProfileData(prev => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={profileData.industry || "Select industry"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {userType === 'worker' && (
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select 
                      disabled={!isEditing}
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={profileData.availability || "Select availability"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  placeholder={userType === 'worker' 
                    ? "Tell employers about your experience and what makes you a great worker..."
                    : "Tell workers about your company and what you're looking for..."
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills (Worker Only) */}
          {userType === 'worker' && (
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>
                  Add skills that match the jobs you want
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {skill}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Select onValueChange={(value) => setNewSkill(value)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {skills.filter(skill => !profileData.skills.includes(skill)).map(skill => (
                          <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addSkill} variant="outline" size="icon">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Work/Hiring History */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {userType === 'worker' ? 'Work History' : 'Hiring History'}
              </CardTitle>
              <CardDescription>
                {userType === 'worker' 
                  ? 'Your completed jobs and ratings'
                  : 'Workers you have hired and their performance'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workHistory.map(item => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">
                          {userType === 'worker' ? item.title : item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {userType === 'worker' ? item.company : `Worker: ${item.worker}`}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          {userType === 'worker' ? `+${item.earnings}` : `-${item.cost}`}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {userType === 'worker' ? 'Earned' : 'Spent'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {workHistory.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {userType === 'worker' ? 'Jobs Completed' : 'Workers Hired'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {user?.rating || '0.0'}
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {userType === 'worker' ? '$2,340' : '$1,840'}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total {userType === 'worker' ? 'Earned' : 'Spent'}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {userType === 'worker' ? 'Job Completion Rate' : 'Successful Hires'}
                  </span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Response Time</span>
                  <span className="font-medium">2.5 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;