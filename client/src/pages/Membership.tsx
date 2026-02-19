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
      subtitle: "Get Started",
      icon: <Star className="w-8 h-8" />,
      carRange: "Cars below 50 lakhs",
      basePrice: "₹999/-",
      priceNote: "(To be adjusted in the initial membership)",
      features: [
        { label: "Initial Membership - One Time", value: "9.33% Of Total Cost" },
        { label: "Annual Subscription charges", value: "0.5% of total cost" },
        { label: "Annual Maintenance charges", value: "1.5% of total cost" },
        { label: "Usage duration", value: "45 days", subtext: "Total - 225 days in 5 years" }
      ],
      color: "border-slate-400",
      bgGradient: "from-slate-500/10 to-slate-600/5"
    },
    {
      name: "Gold",
      subtitle: "Most Popular",
      icon: <Zap className="w-8 h-8" />,
      carRange: "Cars between 51L-100 L",
      basePrice: "₹999/-",
      priceNote: "(To be adjusted in the initial membership)",
      features: [
        { label: "Initial Membership - One Time", value: "9.33% Of Total Cost" },
        { label: "Annual Subscription charges", value: "0.5% of total cost" },
        { label: "Annual Maintenance charges", value: "1.5% of total cost" },
        { label: "Usage duration", value: "45 days", subtext: "Total - 225 days in 5 years" }
      ],
      color: "border-yellow-600",
      bgGradient: "from-yellow-600/20 to-yellow-700/10",
      popular: true
    },
    {
      name: "Platinum",
      subtitle: "Biggest Savings",
      icon: <Crown className="w-8 h-8" />,
      carRange: "Cars 101L +",
      basePrice: "₹999/-",
      priceNote: "(To be adjusted in the initial membership)",
      features: [
        { label: "Initial Membership - One Time", value: "9.33% Of Total Cost" },
        { label: "Annual Subscription charges", value: "0.5% of total cost" },
        { label: "Annual Maintenance charges", value: "1.5% of total cost" },
        { label: "Usage duration", value: "45 days", subtext: "Total - 225 days in 5 years" }
      ],
      color: "border-blue-400",
      bgGradient: "from-blue-500/20 to-blue-600/10"
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

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${plan.bgGradient} border-2 ${plan.color} relative overflow-hidden group hover:shadow-2xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {plan.subtitle}
                </div>
              )}
              
              {/* Header Badge */}
              <div className="mb-6 inline-block">
                <div className="px-6 py-2 rounded-full bg-white/90 border-2 border-current">
                  <h3 className="text-xl font-display font-bold text-gray-900">
                    {plan.name.toUpperCase()} MEMBERSHIP
                  </h3>
                </div>
                {!plan.popular && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">{plan.subtitle}</p>
                )}
              </div>

              {/* Car Range */}
              <div className="mb-6">
                <h4 className="text-2xl font-bold text-white mb-2">{plan.carRange}</h4>
                <p className="text-sm text-muted-foreground">% of on road costing</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white/90 font-medium">{feature.label}</p>
                      <p className="text-sm text-white font-bold">{feature.value}</p>
                      {feature.subtext && (
                        <p className="text-xs text-muted-foreground mt-1">{feature.subtext}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-6 p-4 rounded-xl bg-black/20 border border-white/10">
                <p className="text-3xl font-bold text-white mb-1">{plan.basePrice}</p>
                <p className="text-xs text-muted-foreground">{plan.priceNote}</p>
              </div>

              {/* CTA Button */}
              <Link href="/contact">
                <Button className={`w-full h-12 rounded-full font-bold text-base ${
                  plan.popular 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'bg-white text-gray-900 hover:bg-white/90'
                }`}>
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
