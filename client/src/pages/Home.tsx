import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, ShieldCheck, Calendar, Car, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* unsplash photo of luxury dark sports car */}
          <img 
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Sports Car" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now accepting new members
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              Own the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#B8860B]">Extraordinary</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the thrill of fractional supercar ownership in India. Drive the world's most exclusive vehicles for a fraction of the cost, with none of the hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/fleet">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold shadow-lg shadow-primary/20">
                  View Indian Fleet
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/5 rounded-full backdrop-blur-sm">
                How it Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Smart Ownership</h2>
            <p className="text-muted-foreground">
              We handle insurance, maintenance, and storage. You just arrive and drive.
              Our fractional model makes luxury accessible.
            </p>
          </div>

            <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Car className="w-8 h-8 text-primary" />,
                title: "Curated Indian Fleet",
                desc: "Access a rotating collection of the world's most desirable supercars like Lamborghini Urus and Rolls-Royce Ghost, right here in India."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Comprehensive Coverage",
                desc: "Full zero-dep insurance, professional detailing, and scheduled maintenance are all handled by our expert team."
              },
              {
                icon: <Calendar className="w-8 h-8 text-primary" />,
                title: "Fair Share Scheduling",
                desc: "Our proprietary algorithm ensures every co-owner gets equal access to prime weekend slots and holiday bookings."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-card border border-white/5 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Why Choose <span className="text-primary">Fractional Ownership?</span></h2>
              <div className="space-y-6">
                {[
                  { title: "Asset Optimization", desc: "Most supercars sit in garages 95% of the time. We optimize usage so you only pay for what you use." },
                  { title: "Diversified Portfolio", desc: "Instead of one car, own shares in three different vehicles for the same investment." },
                  { title: "Professional Management", desc: "We handle the complex logistics of luxury car maintenance in the Indian environment." }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Lifestyle" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] p-12 md:p-24 border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 relative z-10">
              Ready to take the wheel?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 relative z-10">
              Join an exclusive community of automotive enthusiasts. Limited shares available for the 2024 season.
            </p>
            <Link href="/fleet">
              <Button size="lg" className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold relative z-10">
                Explore Cars <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
