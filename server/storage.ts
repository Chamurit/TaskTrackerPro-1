import { 
  users, 
  tasks, 
  subtasks, 
  comments, 
  requirements, 
  type User, 
  type InsertUser,
  type Task,
  type InsertTask,
  type Subtask,
  type InsertSubtask,
  type Comment,
  type InsertComment,
  type Requirement,
  type InsertRequirement
} from "@shared/schema";
import { db } from './db';
import { and, eq } from 'drizzle-orm';

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Task operations
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  
  // Subtask operations
  getSubtasksByTaskId(taskId: number): Promise<Subtask[]>;
  createSubtask(subtask: InsertSubtask): Promise<Subtask>;
  updateSubtask(id: number, subtask: Partial<InsertSubtask>): Promise<Subtask | undefined>;
  deleteSubtask(id: number): Promise<boolean>;
  
  // Comment operations
  getCommentsByTaskId(taskId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  
  // Requirement operations
  getRequirementsByTaskId(taskId: number): Promise<Requirement[]>;
  createRequirement(requirement: InsertRequirement): Promise<Requirement>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Task operations
  async getAllTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }
  
  async getTaskById(id: number): Promise<Task | undefined> {
    const result = await db.select().from(tasks).where(eq(tasks.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const result = await db.insert(tasks).values(insertTask).returning();
    return result[0];
  }
  
  async updateTask(id: number, partialTask: Partial<InsertTask>): Promise<Task | undefined> {
    const result = await db.update(tasks)
      .set(partialTask)
      .where(eq(tasks.id, id))
      .returning();
    
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    const result = await db.delete(tasks)
      .where(eq(tasks.id, id))
      .returning({ id: tasks.id });
    
    return result.length > 0;
  }
  
  // Subtask operations
  async getSubtasksByTaskId(taskId: number): Promise<Subtask[]> {
    return await db.select().from(subtasks).where(eq(subtasks.taskId, taskId));
  }
  
  async createSubtask(insertSubtask: InsertSubtask): Promise<Subtask> {
    const result = await db.insert(subtasks).values(insertSubtask).returning();
    return result[0];
  }
  
  async updateSubtask(id: number, partialSubtask: Partial<InsertSubtask>): Promise<Subtask | undefined> {
    const result = await db.update(subtasks)
      .set(partialSubtask)
      .where(eq(subtasks.id, id))
      .returning();
    
    return result.length > 0 ? result[0] : undefined;
  }
  
  async deleteSubtask(id: number): Promise<boolean> {
    const result = await db.delete(subtasks)
      .where(eq(subtasks.id, id))
      .returning({ id: subtasks.id });
    
    return result.length > 0;
  }
  
  // Comment operations
  async getCommentsByTaskId(taskId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.taskId, taskId));
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const result = await db.insert(comments).values(insertComment).returning();
    return result[0];
  }
  
  // Requirement operations
  async getRequirementsByTaskId(taskId: number): Promise<Requirement[]> {
    return await db.select().from(requirements).where(eq(requirements.taskId, taskId));
  }
  
  async createRequirement(insertRequirement: InsertRequirement): Promise<Requirement> {
    const result = await db.insert(requirements).values(insertRequirement).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
