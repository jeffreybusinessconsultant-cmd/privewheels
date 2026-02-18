import { db } from "./db";
import {
  users, cars, bookings,
  type User, type InsertUser,
  type Car, type InsertCar,
  type Booking, type InsertBooking,
} from "@shared/schema";
import { eq, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Cars
  getAllCars(): Promise<Car[]>;
  getCar(id: number): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;

  // Bookings
  getBookings(filters?: { carId?: number; userId?: number }): Promise<(Booking & { car: Car | null; user: User | null })[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  deleteBooking(id: number): Promise<void>;
  
  // Checking availability
  checkAvailability(carId: number, startDate: Date, endDate: Date): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async getAllCars(): Promise<Car[]> {
    return await db.select().from(cars);
  }

  async getCar(id: number): Promise<Car | undefined> {
    const [car] = await db.select().from(cars).where(eq(cars.id, id));
    return car;
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const [car] = await db.insert(cars).values(insertCar).returning();
    return car;
  }

  async getBookings(filters?: { carId?: number; userId?: number }): Promise<(Booking & { car: Car | null; user: User | null })[]> {
    let query = db.select({
        // Spread all columns from bookings
        id: bookings.id,
        carId: bookings.carId,
        userId: bookings.userId,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        status: bookings.status,
        createdAt: bookings.createdAt,
        // Nest relations
        car: cars,
        user: users
    })
    .from(bookings)
    .leftJoin(cars, eq(bookings.carId, cars.id))
    .leftJoin(users, eq(bookings.userId, users.id));

    if (filters?.carId) {
      query.where(eq(bookings.carId, filters.carId));
    }
    if (filters?.userId) {
      // If we already have a where clause, we need to handle AND logic, but simplified here for now:
      // In Drizzle, chaining .where() usually replaces or requires 'and()'.
      // Let's use array of conditions if both present.
      const conditions = [];
      if (filters.carId) conditions.push(eq(bookings.carId, filters.carId));
      if (filters.userId) conditions.push(eq(bookings.userId, filters.userId));
      
      if (conditions.length > 0) {
          // @ts-ignore
          query.where(and(...conditions));
      }
    }

    const results = await query;
    return results;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async deleteBooking(id: number): Promise<void> {
    await db.delete(bookings).where(eq(bookings.id, id));
  }

  async checkAvailability(carId: number, startDate: Date, endDate: Date): Promise<boolean> {
    // Check if any booking overlaps
    // Overlap: (StartA <= EndB) and (EndA >= StartB)
    const conflictingBookings = await db.select().from(bookings).where(
      and(
        eq(bookings.carId, carId),
        lte(bookings.startDate, endDate),
        gte(bookings.endDate, startDate)
      )
    );
    return conflictingBookings.length === 0;
  }
}

export const storage = new DatabaseStorage();
