import { useQuery } from "@tanstack/react-query";
import { mockCars } from "@/lib/mockData";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockCars;
    },
  });
}

export function useCar(id: number) {
  return useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const car = mockCars.find(c => c.id === id);
      if (!car) throw new Error("Car not found");
      return car;
    },
    enabled: !!id,
  });
}
