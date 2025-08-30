import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Clock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Hero image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Workers and employers connecting through QuickHire Loop" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mb-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">10,000+ Active Workers</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium">5,000+ Jobs Posted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Same-Day Hiring</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect Workers with
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Instant Opportunities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
            The fastest way to find temporary jobs or hire skilled workers. 
            From daily gigs to project-based work - get matched in minutes, not days.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              variant="cta" 
              size="lg" 
              className="text-lg px-8 py-6 shadow-hero"
            >
              Find Workers Now
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Looking for Work
            </Button>
          </div>

          {/* Quick stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">&lt; 2 Min</div>
              <div className="text-white/80">Average Matching Time</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">Successful Matches</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;