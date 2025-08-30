import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Users, Briefcase, MessageCircle, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const NavigationItems = () => (
    <>
      {user ? (
        // Authenticated navigation
        <>
          <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Briefcase className="w-4 h-4" />
            Dashboard
          </Link>
          {userType === 'employer' ? (
            <>
              <Link to="/post-job" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Briefcase className="w-4 h-4" />
                Post Job
              </Link>
              <Link to="/my-jobs" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Briefcase className="w-4 h-4" />
                My Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/find-jobs" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Briefcase className="w-4 h-4" />
                Find Jobs
              </Link>
              <Link to="/my-applications" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Briefcase className="w-4 h-4" />
                Applications
              </Link>
            </>
          )}
          <Link to="/messages" className="flex items-center gap-2 hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" />
            Messages
          </Link>
          <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition-colors">
            <User className="w-4 h-4" />
            Profile
          </Link>
        </>
      ) : (
        // Public navigation
        <>
          <Link to="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link to="/find-jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-cta rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            QuickHire Loop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationItems />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user.name}
              </span>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="cta">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-6">
              <NavigationItems />
              
              {user ? (
                <div className="flex flex-col gap-4 pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.name}
                  </span>
                  <Button variant="outline" onClick={handleLogout} className="gap-2 justify-start">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-4 border-t">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button variant="cta" className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;