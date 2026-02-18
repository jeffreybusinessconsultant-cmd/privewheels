import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { mockBookings, mockCars, mockUsers } from "@/lib/mockData";
import type { Booking } from "@shared/schema";

export function useBookings(params?: { carId?: string; userId?: string }) {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let filteredBookings = [...mockBookings];
      
      if (params?.carId) {
        filteredBookings = filteredBookings.filter(b => b.carId === parseInt(params.carId!));
      }
      if (params?.userId) {
        filteredBookings = filteredBookings.filter(b => b.userId === parseInt(params.userId!));
      }
      
      // Add car and user details
      return filteredBookings.map(booking => ({
        ...booking,
        car: mockCars.find(c => c.id === booking.carId),
        user: mockUsers.find(u => u.id === booking.userId)
      }));
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (booking: Omit<Booking, "id" | "createdAt">) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newBooking: Booking = {
        ...booking,
        id: mockBookings.length + 1,
        createdAt: new Date(),
        status: "confirmed"
      };
      
      mockBookings.push(newBooking);
      return newBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking Confirmed",
        description: "Your reservation has been successfully created.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockBookings.findIndex(b => b.id === id);
      if (index > -1) {
        mockBookings.splice(index, 1);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast({
        title: "Booking Cancelled",
        description: "Your reservation has been cancelled.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
