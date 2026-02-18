import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === TABLE DEFINITIONS ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  avatarUrl: text("avatar_url"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  color: text("color").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(), // Total price
  shares: integer("shares").default(12).notNull(), // Number of shares (e.g. 12)
  sharePrice: integer("share_price").notNull(), // Price per share in INR
  description: text("description"),
  specs: text("specs"), // JSON string or simple text of specs
  location: text("location"), // City in India
  contactNumber: text("contact_number"),
  status: text("status").default("available"), // available, sold_out
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  carId: integer("car_id").notNull(),
  userId: integer("user_id").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: text("status").default("confirmed"), // confirmed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===

export const carsRelations = relations(cars, ({ many }) => ({
  bookings: many(bookings),
}));

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  car: one(cars, {
    fields: [bookings.carId],
    references: [cars.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertCarSchema = createInsertSchema(cars).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, createdAt: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// === API TYPES ===

export type CreateBookingRequest = InsertBooking;
export type UpdateBookingRequest = Partial<InsertBooking>;

export type BookingResponse = Booking & { car?: Car; user?: User };
