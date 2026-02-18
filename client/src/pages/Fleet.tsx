import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCars } from "@/hooks/use-cars";
import { CarCard } from "@/components/CarCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Fleet() {
  const { data: cars, isLoading } = useCars();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <div className="pt-32 pb-12 container mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Our <span className="text-primary">Indian Fleet</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our collection of available vehicles across Mumbai, Delhi, and Bangalore. Each car is limited to 11-12 exclusive shares.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
