import { useState } from "react";
import { format, startOfToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { type Booking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { useAuth } from "@/lib/authContext";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

interface BookingCalendarProps {
  carId: number;
  existingBookings?: Booking[];
}

export function BookingCalendar({ carId, existingBookings = [] }: BookingCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const createBooking = useCreateBooking();
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // Calculate disabled dates (past dates + existing bookings)
  const disabledDates = [
    { before: startOfToday() },
    ...existingBookings.map((b) => ({
      from: new Date(b.startDate),
      to: new Date(b.endDate),
    })),
  ];

  const handleBook = () => {
    if (!isAuthenticated) {
      setLocation("/login");
      return;
    }

    if (!date || !user) return;

    // For simplicity, we're booking single days (09:00 to 18:00)
    const startDate = new Date(date);
    startDate.setHours(9, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(18, 0, 0, 0);

    createBooking.mutate({
      carId,
      userId: user.id,
      startDate,
      endDate,
      status: "confirmed",
    });
  };

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-display font-bold mb-6">Check Availability</h3>
      
      <div className="flex justify-center mb-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDates}
          className="rounded-xl border border-white/10 bg-black/20"
        />
      </div>

      <div className="space-y-4">
        {date ? (
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm text-primary-foreground/80">Selected Date</p>
            <p className="text-lg font-bold text-primary">
              {format(date, "EEEE, MMMM do, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              09:00 AM - 06:00 PM
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-muted/50 border border-white/5 text-center">
            <p className="text-sm text-muted-foreground">Select a date to book this vehicle</p>
          </div>
        )}

        <Button 
          className="w-full h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!date || createBooking.isPending}
          onClick={handleBook}
        >
          {createBooking.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : isAuthenticated ? (
            "Confirm Booking"
          ) : (
            "Login to Book"
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          {isAuthenticated 
            ? "By booking, you agree to our terms of service and insurance policy."
            : "Please login to make a booking"
          }
        </p>
      </div>
    </div>
  );
}
