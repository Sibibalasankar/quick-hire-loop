import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-2xl font-bold mb-4">QuickHire Loop</h4>
            <p className="text-background/80 mb-6 max-w-md">
              Connecting workers with instant opportunities. The fastest way to find 
              temporary jobs or hire skilled workers for your business needs.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4 text-background">For Workers</h5>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-smooth">Find Jobs</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Create Profile</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">How It Works</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Success Stories</a></li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h5 className="font-semibold mb-4 text-background">For Employers</h5>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-background transition-smooth">Post a Job</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Find Workers</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Pricing</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Business Solutions</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-background/60 text-sm">
            © 2024 QuickHire Loop. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-background/80">
            <a href="#" className="hover:text-background transition-smooth">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-smooth">Terms of Service</a>
            <a href="#" className="hover:text-background transition-smooth">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;