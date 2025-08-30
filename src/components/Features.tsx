import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Clock, 
  Shield, 
  CreditCard, 
  Star, 
  Zap,
  Users,
  MessageCircle,
  Briefcase
} from "lucide-react";

const Features = () => {
  const workerFeatures = [
    {
      icon: MapPin,
      title: "Jobs Near You",
      description: "Find opportunities within walking distance or your preferred travel radius."
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Choose daily gigs, weekend work, or project-based opportunities that fit your life."
    },
    {
      icon: CreditCard,
      title: "Instant Payments",
      description: "Get paid immediately after job completion through secure digital payments."
    },
    {
      icon: Star,
      title: "Build Your Reputation",
      description: "Earn ratings and reviews to unlock better opportunities and higher pay."
    }
  ];

  const employerFeatures = [
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Post a job and get matched with qualified workers in under 2 minutes."
    },
    {
      icon: Shield,
      title: "Verified Workers",
      description: "All workers are background-checked with verified skills and ratings."
    },
    {
      icon: Users,
      title: "Bulk Hiring",
      description: "Need multiple workers? Hire teams for events, construction, or seasonal work."
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Chat directly with workers to discuss job details and requirements."
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Built for Both Sides of the Market
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're looking for work or looking to hire, we've got the tools 
            to make it happen fast and securely.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Worker Features */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-feature px-6 py-3 rounded-full text-white font-semibold mb-4">
                <Users className="w-5 h-5" />
                For Workers
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Find Your Next Opportunity
              </h3>
              <p className="text-muted-foreground text-lg">
                Discover jobs that match your skills, schedule, and location preferences.
              </p>
            </div>

            <div className="grid gap-6">
              {workerFeatures.map((feature, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-float transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="feature" size="lg" className="px-8">
                Start Finding Work
              </Button>
            </div>
          </div>

          {/* Employer Features */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-cta px-6 py-3 rounded-full text-white font-semibold mb-4">
                <Briefcase className="w-5 h-5" />
                For Employers
              </div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Hire Faster Than Ever
              </h3>
              <p className="text-muted-foreground text-lg">
                Connect with skilled workers instantly and get your projects done right.
              </p>
            </div>

            <div className="grid gap-6">
              {employerFeatures.map((feature, index) => (
                <Card key={index} className="p-6 shadow-card hover:shadow-float transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="cta" size="lg" className="px-8">
                Post a Job Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;