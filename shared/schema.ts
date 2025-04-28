import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table 
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(), // 'low', 'medium', 'high', 'urgent'
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  dueDate: timestamp("due_date"),
  dueTime: text("due_time"),
  project: text("project").notNull(),
  group: text("group").notNull(), // 'today', 'tomorrow', 'later'
  hasGoogleAnalytics: boolean("has_google_analytics").default(false),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
});

// Subtasks table
export const subtasks = pgTable("subtasks", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").notNull().default(false),
  taskId: integer("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
});

// Comments table
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  text: text("text").notNull(),
  time: timestamp("time").notNull().defaultNow(),
  taskId: integer("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
});

// Requirement items table
export const requirements = pgTable("requirements", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  parentId: integer("parent_id").references(() => requirements.id, { onDelete: "cascade" }),
  taskId: integer("task_id").notNull().references(() => tasks.id, { onDelete: "cascade" }),
});

// Schemas
export const insertTaskSchema = createInsertSchema(tasks).omit({ 
  id: true, 
  createdAt: true 
});

export const insertSubtaskSchema = createInsertSchema(subtasks).omit({ 
  id: true 
});

export const insertCommentSchema = createInsertSchema(comments).omit({ 
  id: true, 
  time: true 
});

export const insertRequirementSchema = createInsertSchema(requirements).omit({ 
  id: true 
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertSubtask = z.infer<typeof insertSubtaskSchema>;
export type Subtask = typeof subtasks.$inferSelect;

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export type InsertRequirement = z.infer<typeof insertRequirementSchema>;
export type Requirement = typeof requirements.$inferSelect;
