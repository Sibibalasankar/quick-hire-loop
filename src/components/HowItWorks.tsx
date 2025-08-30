import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Search, 
  Handshake, 
  CreditCard, 
  Star,
  ArrowRight 
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Post or Browse",
      description: "Employers post jobs with details. Workers browse opportunities near them.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: Search,
      title: "Smart Matching",
      description: "Our algorithm instantly connects the right workers with the right opportunities.",
      color: "bg-secondary/10 text-secondary"
    },
    {
      icon: Handshake,
      title: "Connect & Hire",
      description: "Chat directly, confirm details, and hire with a single click.",
      color: "bg-accent/10 text-accent"
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Complete the work and get paid instantly through our secure payment system.",
      color: "bg-success/10 text-success"
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Build trust in the community with honest ratings and reviews.",
      color: "bg-primary/10 text-primary"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How QuickHire Loop Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From posting to payment, we've streamlined the entire hiring process 
            to be as simple and secure as possible.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary via-accent via-success to-primary opacity-30" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-6 text-center shadow-card hover:shadow-float transition-smooth relative z-10 bg-card">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${step.color}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </Card>
                
                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-4 md:hidden">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-hero rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 text-white/90">
              Join thousands of workers and employers who trust QuickHire Loop
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" className="px-8">
                I Need Workers
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 border-white/30 text-white hover:bg-white/10"
              >
                I'm Looking for Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;