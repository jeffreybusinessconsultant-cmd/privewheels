import { useQuery } from "@tanstack/react-query";
import { mockUsers } from "@/lib/mockData";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockUsers;
    },
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      const user = mockUsers.find(u => u.id === id);
      if (!user) throw new Error("User not found");
      return user;
    },
    enabled: !!id,
  });
}
