import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useBookings, useDeleteBooking, useCreateBooking } from "@/hooks/use-bookings";
import { useCars } from "@/hooks/use-cars";
import { useAuth } from "@/lib/authContext";
import { Loader2, Calendar as CalendarIcon, Car, X, Clock } from "lucide-react";
import { format, isPast, startOfToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: bookings, isLoading: loadingBookings } = useBookings({ 
    userId: user?.id ? String(user.id) : undefined 
  });
  const { data: cars } = useCars();
  const deleteBooking = useDeleteBooking();
  const createBooking = useCreateBooking();
  
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    setLocation("/login");
    return null;
  }

  if (loadingBookings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  // Split bookings into upcoming and past
  const upcomingBookings = bookings?.filter(b => !isPast(new Date(b.endDate))) || [];
  const pastBookings = bookings?.filter(b => isPast(new Date(b.endDate))) || [];

  // Get disabled dates for selected car
  const getDisabledDates = () => {
    if (!selectedCar) return [{ before: startOfToday() }];
    
    const carBookings = bookings?.filter(b => b.carId === parseInt(selectedCar)) || [];
    return [
      { before: startOfToday() },
      ...carBookings.map((b) => ({
        from: new Date(b.startDate),
        to: new Date(b.endDate),
      })),
    ];
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedCar || !user) return;

    const startDate = new Date(selectedDate);
    startDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(selectedDate);
    endDate.setHours(18, 0, 0, 0);

    createBooking.mutate({
      carId: parseInt(selectedCar),
      userId: user.id,
      startDate,
      endDate,
      status: "confirmed",
    });

    // Reset form
    setSelectedCar("");
    setSelectedDate(undefined);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <div className="pt-32 container mx-auto px-4">
        {/* User Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border-2 border-primary">
            {user?.fullName?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Welcome, {user?.fullName}</h1>
            <p className="text-muted-foreground">Manage your reservations and ownership shares</p>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-6 mb-4">
            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Shares</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Drives</p>
                  <p className="text-2xl font-bold text-white">{upcomingBookings.length}</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-bold text-white">Upcoming Reservations</h2>
            
            {upcomingBookings.length === 0 ? (
              <div className="p-12 rounded-2xl bg-card border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-white mb-2">No upcoming drives</h3>
                <p className="text-muted-foreground mb-6">You haven't booked any slots yet.</p>
                <Button className="bg-primary text-primary-foreground" asChild>
                  <a href="/fleet">Browse Fleet</a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="p-6 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-16 rounded-lg overflow-hidden bg-white/5 shrink-0">
                        {booking.car?.imageUrl && (
                          <img src={booking.car.imageUrl} alt="Car" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">
                          {booking.car?.make} {booking.car?.model}
                        </h3>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {format(new Date(booking.startDate), "MMM do, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                       <div className="text-right mr-4">
                         <p className="text-xs text-muted-foreground uppercase">Status</p>
                         <p className="text-green-500 font-medium">Confirmed</p>
                       </div>

                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-red-500/10 hover:text-red-500">
                            <X className="w-5 h-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card border-white/10 text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Reservation?</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Are you sure you want to cancel your booking for the {booking.car?.make} {booking.car?.model}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border-white/10 hover:bg-white/5 hover:text-white">Keep Booking</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteBooking.mutate(booking.id)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Cancel Reservation
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Past Bookings History */}
             {pastBookings.length > 0 && (
               <div className="mt-12">
                 <h2 className="text-xl font-display font-bold text-white mb-6">Past Drives</h2>
                 <div className="space-y-4 opacity-60 hover:opacity-100 transition-opacity">
                   {pastBookings.map((booking) => (
                      <div key={booking.id} className="p-4 rounded-xl border border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <span className="text-muted-foreground">{format(new Date(booking.startDate), "MMM do, yyyy")}</span>
                           <span className="font-medium text-white">{booking.car?.make} {booking.car?.model}</span>
                         </div>
                         <span className="text-xs bg-white/10 px-2 py-1 rounded text-white/70">Completed</span>
                      </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Booking Calendar */}
            <div className="p-6 rounded-2xl bg-card border border-white/5">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                Quick Booking
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Select Car</label>
                  <Select value={selectedCar} onValueChange={setSelectedCar}>
                    <SelectTrigger className="bg-background/50 border-white/10">
                      <SelectValue placeholder="Choose a car" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      {cars?.map((car) => (
                        <SelectItem key={car.id} value={String(car.id)} className="text-white hover:bg-white/5">
                          {car.make} {car.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCar && (
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Select Date</label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={getDisabledDates()}
                      className="rounded-xl border border-white/10 bg-black/20"
                    />
                  </div>
                )}

                {selectedDate && selectedCar && (
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-muted-foreground">Selected</p>
                    <p className="text-sm font-bold text-primary">
                      {format(selectedDate, "MMM do, yyyy")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">9:00 AM - 6:00 PM</p>
                  </div>
                )}

                <Button 
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedCar || createBooking.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <h3 className="font-bold text-primary mb-2">Member Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Need to change a booking or report an issue? Our concierge team is available 24/7.
              </p>
              <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-black">
                Contact Concierge
              </Button>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-white/5">
              <h3 className="font-bold text-white mb-4">Ownership Rules</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  Max 4 active bookings at once
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  Cancellations required 48h in advance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  Fuel tank must be returned full
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
