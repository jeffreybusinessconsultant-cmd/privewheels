import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Check, Shield, Users, Trophy, Calendar, CreditCard, UserCheck } from "lucide-react";

export default function About() {
  const howItWorksSteps = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Choose Your Membership",
      description: "Select a plan that fits your needs—whether you're looking for a basic package or an all-inclusive premium experience. Each membership comes with unique benefits to suit your goals."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Schedule Your Time",
      description: "Once you've chosen a membership, book your preferred date and time to get started. Our flexible scheduling system makes it easy to find slots that work for you."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Make the Payment",
      description: "Complete your enrollment with a secure and very simple valuable payment process. Multiple payment methods are available, ensuring a smooth and fast checkout."
    }
  ];

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
            About <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We make luxury car ownership hassle-free with Fractional Car Sharing, allowing members to drive premium cars like Mercedes, BMW, and Rolls-Royce at a fraction of the cost. With no worries about maintenance, insurance, or depreciation, members enjoy chauffeur-driven experiences for business, events, or leisure.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed mt-4">
            Our flexible membership plans offer resale options and access to multiple cars. We prioritize safety, sustainability, and convenience with GPS tracking, 24/7 assistance, and eco-friendly EV options. Join now and experience luxury without the burden of ownership!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in Mumbai, Prive Wheels was born out of a passion for automotive excellence and a desire to solve the inefficiencies of traditional luxury car ownership. We handle the complexities—insurance, maintenance, storage—so you can focus on the drive.
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

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We provide innovative solutions with a client-centric approach, ensuring timely delivery and exceptional quality backed by years of industry expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}
