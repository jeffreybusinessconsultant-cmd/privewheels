import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { insertUserSchema, insertCarSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Cars
  app.get(api.cars.list.path, async (req, res) => {
    const cars = await storage.getAllCars();
    res.json(cars);
  });

  app.get(api.cars.get.path, async (req, res) => {
    const car = await storage.getCar(Number(req.params.id));
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  });

  // Users
  app.get(api.users.list.path, async (req, res) => {
    const users = await storage.getAllUsers();
    res.json(users);
  });

  app.get(api.users.get.path, async (req, res) => {
    const user = await storage.getUser(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  // Bookings
  app.get(api.bookings.list.path, async (req, res) => {
    const carId = req.query.carId ? Number(req.query.carId) : undefined;
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const bookings = await storage.getBookings({ carId, userId });
    res.json(bookings);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse({
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      });

      // Check availability
      const isAvailable = await storage.checkAvailability(input.carId, input.startDate, input.endDate);
      if (!isAvailable) {
        return res.status(400).json({ message: 'Car is not available for these dates' });
      }

      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.bookings.delete.path, async (req, res) => {
    await storage.deleteBooking(Number(req.params.id));
    res.status(204).send();
  });

  // Seed Data Function
  // We'll call this if no cars exist
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingCars = await storage.getAllCars();
  if (existingCars.length === 0) {
    console.log("Seeding database...");
    
    // Seed Users
    const user1 = await storage.createUser({
      username: "john_doe",
      fullName: "John Doe",
      email: "john@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      isAdmin: false,
    });
    
    const user2 = await storage.createUser({
      username: "jane_smith",
      fullName: "Jane Smith",
      email: "jane@example.com",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      isAdmin: false,
    });

    // Seed Cars with Indian context
    await storage.createCar({
      make: "Lamborghini",
      model: "Urus",
      year: 2024,
      color: "Giallo Auge",
      imageUrl: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1000",
      price: 45000000, // 4.5 Crore INR
      shares: 11,
      sharePrice: 4090909, // ~41 Lakh per share
      description: "The world's first Super Sport Utility Vehicle. Lamborghini Urus is a visionary approach based on the infusion of Lamborghini DNA into the most versatile vehicle, the SUV.",
      specs: "4.0L V8 Twin-Turbo, 650 CV, 0-100 km/h 3.6s",
      location: "Mumbai, Maharashtra",
      contactNumber: "+91 98765 43210",
      status: "available",
    });

    await storage.createCar({
      make: "Rolls-Royce",
      model: "Ghost",
      year: 2023,
      color: "Diamond Black",
      imageUrl: "https://images.unsplash.com/photo-1631215160805-4f0566373199?auto=format&fit=crop&q=80&w=1000",
      price: 70000000, // 7 Crore INR
      shares: 12,
      sharePrice: 5833333, // ~58 Lakh per share
      description: "Ghost is the most technologically advanced Rolls-Royce ever. It is a masterpiece of craftsmanship and engineering, designed to provide the ultimate in luxury and refinement.",
      specs: "6.75L V12, 563 hp, 0-100 km/h 4.8s",
      location: "Delhi, NCR",
      contactNumber: "+91 91234 56789",
      status: "available",
    });

    await storage.createCar({
      make: "Mercedes-Benz",
      model: "G-Class G63",
      year: 2024,
      color: "Obsidian Black",
      imageUrl: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000",
      price: 33000000, // 3.3 Crore INR
      shares: 11,
      sharePrice: 3000000, // 30 Lakh per share
      description: "The Mercedes-AMG G 63 is the performance version of the Mercedes-Benz G-Class. It features a powerful V8 engine and iconic design.",
      specs: "4.0L V8, 577 hp, 0-100 km/h 4.5s",
      location: "Bangalore, Karnataka",
      contactNumber: "+91 88888 77777",
      status: "available",
    });
    
    console.log("Database seeded successfully.");
  }
}
