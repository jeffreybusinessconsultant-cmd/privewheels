import { useParams, Link } from "wouter";
import { useCar } from "@/hooks/use-cars";
import { useBookings } from "@/hooks/use-bookings";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Loader2, ArrowLeft, Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const carId = Number(id);
  
  const { data: car, isLoading: loadingCar } = useCar(carId);
  const { data: bookings, isLoading: loadingBookings } = useBookings({ carId: String(carId) });

  if (loadingCar || loadingBookings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Car not found</h1>
        <Link href="/fleet" className="text-primary hover:underline">Back to Fleet</Link>
      </div>
    );
  }

  const specs = car.specs ? JSON.parse(car.specs) : {};

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <div className="pt-24 container mx-auto px-4">
        <Link href="/fleet" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Fleet
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Car Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl relative">
              <img 
                src={car.imageUrl} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <Badge variant="secondary" className="bg-black/50 backdrop-blur-md text-white border-white/10 px-4 py-2 text-sm">
                  {car.year} Model
                </Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                  {car.make} <span className="text-primary">{car.model}</span>
                </h1>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Share Price</p>
                  <p className="text-3xl font-bold text-white">₹{(car.sharePrice / 100000).toFixed(1)} Lakh</p>
                  <p className="text-xs text-muted-foreground">Total: ₹{(car.price / 10000000).toFixed(1)} Cr</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {car.location}
                </Badge>
                <span>Contact: {car.contactNumber}</span>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed mt-4">
                {car.description}
              </p>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-bold text-white">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
              <h3 className="flex items-center text-lg font-bold text-primary mb-4">
                <Info className="w-5 h-5 mr-2" /> Ownership Includes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {['Comprehensive Insurance', 'Routine Maintenance', 'Secure Storage', 'Professional Detailing', '24/7 Roadside Assist', 'Concierge Service'].map(item => (
                  <div key={item} className="flex items-center text-sm text-white/80">
                    <Check className="w-4 h-4 mr-2 text-primary" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Booking */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              <BookingCalendar 
                carId={car.id} 
                existingBookings={bookings}
              />
              
              <div className="mt-8 p-6 rounded-2xl bg-card border border-white/5">
                 <h4 className="font-bold text-white mb-2">Fractional Details</h4>
                 <div className="space-y-3 text-sm">
                   <div className="flex justify-between text-muted-foreground">
                     <span>Total Shares</span>
                     <span className="text-white">12</span>
                   </div>
                   <div className="flex justify-between text-muted-foreground">
                     <span>Shares Available</span>
                     <span className="text-primary font-bold">{car.shares}</span>
                   </div>
                   <div className="flex justify-between text-muted-foreground">
                     <span>Days per Share</span>
                     <span className="text-white">33 days/year</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
