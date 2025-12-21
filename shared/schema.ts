import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact message schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof contactMessageSchema>;

// Team registration schema for Google Sheets
export const teamRegistrationSchema = z.object({
  teamName: z.string().min(2, "Team name is required"),
  college: z.string().min(2, "College name is required"),
  year: z.string().min(1, "Year is required"),
  teamSize: z.string().min(1, "Team size is required"),
  leaderName: z.string().min(2, "Leader name is required"),
  leaderResume: z.string().url("Valid Resume URL required (include https://)"),
  email: z.string().email("Invalid email address").refine(
    (email) => email.endsWith("@somaiya.edu"),
    "Only @somaiya.edu email addresses are allowed"
  ),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  members: z.array(z.object({
    name: z.string().min(2, "Member name is required"),
    resume: z.string().url("Valid Resume URL required (include https://)")
  })).optional(),
});

export type TeamRegistration = z.infer<typeof teamRegistrationSchema>;
