import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { type Car } from "@shared/schema";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const [, setLocation] = useLocation();

  // Parse specs safely
  let specsObj: Record<string, string> = {};
  try {
    specsObj = car.specs ? JSON.parse(car.specs) : {};
  } catch (e) {
    // fallback if simple string
  }

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocation(`/contact?car=${car.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-white/5 shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-primary font-bold text-sm tracking-wider mb-1">{car.year} MODEL</p>
          <h3 className="text-2xl font-display font-bold text-white leading-none">
            {car.make} {car.model}
          </h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{car.shares} Shares Total</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-md bg-white/5 text-white text-xs border border-white/10">
              {car.location || "Mumbai, MH"}
            </span>
            <span className="px-2 py-1 rounded-md bg-white/5 text-white text-xs border border-white/10">
              {car.status === 'available' ? 'Available' : 'Sold Out'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Share Price</span>
            <span className="text-lg font-bold text-white">
              ₹{(car.sharePrice / 100000).toFixed(1)}L
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Total Price</span>
            <span className="text-lg font-bold text-white">
              ₹{(car.price / 10000000).toFixed(1)}Cr
            </span>
          </div>
        </div>

        <Button 
          onClick={handleBookNow}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        >
          Book Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}
