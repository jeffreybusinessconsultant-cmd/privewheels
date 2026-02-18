import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Link } from "wouter";

export default function Membership() {
  const plans = [
    {
      name: "Silver",
      icon: <Star className="w-8 h-8" />,
      price: "₹15,000",
      period: "/month",
      features: ["Access to Entry-Level Supercars", "10 Driving Days / Year", "Standard Concierge", "Shared Storage Access"],
      color: "border-slate-400"
    },
    {
      name: "Gold",
      icon: <Zap className="w-8 h-8" />,
      price: "₹35,000",
      period: "/month",
      features: ["Access to Full Fleet", "25 Driving Days / Year", "Priority Booking", "VIP Event Access", "Doorstep Delivery"],
      color: "border-primary",
      popular: true
    },
    {
      name: "Platinum",
      icon: <Crown className="w-8 h-8" />,
      price: "₹75,000",
      period: "/month",
      features: ["Unlimited Fleet Access", "50+ Driving Days / Year", "Dedicated Account Manager", "International Track Day Access", "Custom Livery Options"],
      color: "border-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="pt-32 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Membership <span className="text-primary">Plans</span></h1>
          <p className="text-muted-foreground text-lg">Choose a tier that matches your lifestyle and passion for driving.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2.5rem] bg-card border ${plan.color} relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <div className="mb-8 p-4 rounded-2xl bg-white/5 w-fit text-primary">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 text-white">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/fleet">
                <Button className={`w-full h-12 rounded-full font-bold ${plan.popular ? 'bg-primary text-primary-foreground' : 'variant-outline'}`}>
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
