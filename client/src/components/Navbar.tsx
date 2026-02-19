import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // Base links that are always visible
  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/fleet", label: "Browse Cars" },
    { href: "/membership", label: "Membership Plans" },
    { href: "/contact", label: "Contact" },
  ];

  // Add dashboard link only if user is authenticated
  const links = isAuthenticated 
    ? [...baseLinks, { href: "/dashboard", label: "My Dashboard" }]
    : baseLinks;

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <Car className="w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-white">
              PRIVE<span className="text-primary">WHEELS</span>
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="relative cursor-pointer py-2">
                <span className={`text-sm font-medium transition-colors ${
                  location === link.href ? "text-primary" : "text-muted-foreground hover:text-white"
                }`}>
                  {link.label}
                </span>
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-white hover:bg-white/10">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border-2 border-primary">
                    {user?.fullName?.charAt(0)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-white/10">
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem 
                  onClick={() => setLocation("/dashboard")}
                  className="cursor-pointer text-white hover:bg-white/5"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 hover:bg-red-500/10 hover:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-white/5">
                <UserIcon className="w-5 h-5" />
              </Button>
            </Link>
          )}
          
          <Link href="/fleet">
             <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold">
              Reserve Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
