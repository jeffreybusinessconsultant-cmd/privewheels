import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Shield, Users, Trophy } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Redefining <span className="text-primary">Luxury Ownership</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Shared Wheels is India's premier fractional car ownership platform. We believe that the joy of driving premium automobiles should be accessible, hassle-free, and intelligently managed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in Mumbai, Shared Wheels was born out of a passion for automotive excellence and a desire to solve the inefficiencies of traditional luxury car ownership. We handle the complexities—insurance, maintenance, storage—so you can focus on the drive.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6">
              {[
                { icon: <Shield className="text-primary" />, label: "Secure & Insured" },
                { icon: <Users className="text-primary" />, label: "Exclusive Community" },
                { icon: <Trophy className="text-primary" />, label: "Premium Fleet" },
                { icon: <Check className="text-primary" />, label: "Transparent Model" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-medium">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 h-[400px] bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Car" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
