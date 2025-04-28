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

export class MemStorage implements IStorage {
  private usersMap: Map<number, User>;
  private tasksMap: Map<number, Task>;
  private subtasksMap: Map<number, Subtask>;
  private commentsMap: Map<number, Comment>;
  private requirementsMap: Map<number, Requirement>;
  
  private currentUserId: number;
  private currentTaskId: number;
  private currentSubtaskId: number;
  private currentCommentId: number;
  private currentRequirementId: number;

  constructor() {
    this.usersMap = new Map();
    this.tasksMap = new Map();
    this.subtasksMap = new Map();
    this.commentsMap = new Map();
    this.requirementsMap = new Map();
    
    this.currentUserId = 1;
    this.currentTaskId = 1;
    this.currentSubtaskId = 1;
    this.currentCommentId = 1;
    this.currentRequirementId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Add sample tasks here if needed
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.usersMap.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersMap.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.usersMap.set(id, user);
    return user;
  }
  
  // Task operations
  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasksMap.values());
  }
  
  async getTaskById(id: number): Promise<Task | undefined> {
    return this.tasksMap.get(id);
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const now = new Date();
    const task: Task = { 
      ...insertTask, 
      id, 
      createdAt: now
    };
    this.tasksMap.set(id, task);
    return task;
  }
  
  async updateTask(id: number, partialTask: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasksMap.get(id);
    if (!task) return undefined;
    
    const updatedTask: Task = { ...task, ...partialTask };
    this.tasksMap.set(id, updatedTask);
    return updatedTask;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    if (!this.tasksMap.has(id)) return false;
    
    // Delete the task
    this.tasksMap.delete(id);
    
    // Delete related subtasks
    for (const [subtaskId, subtask] of this.subtasksMap.entries()) {
      if (subtask.taskId === id) {
        this.subtasksMap.delete(subtaskId);
      }
    }
    
    // Delete related comments
    for (const [commentId, comment] of this.commentsMap.entries()) {
      if (comment.taskId === id) {
        this.commentsMap.delete(commentId);
      }
    }
    
    // Delete related requirements
    for (const [requirementId, requirement] of this.requirementsMap.entries()) {
      if (requirement.taskId === id) {
        this.requirementsMap.delete(requirementId);
      }
    }
    
    return true;
  }
  
  // Subtask operations
  async getSubtasksByTaskId(taskId: number): Promise<Subtask[]> {
    return Array.from(this.subtasksMap.values()).filter(
      (subtask) => subtask.taskId === taskId
    );
  }
  
  async createSubtask(insertSubtask: InsertSubtask): Promise<Subtask> {
    const id = this.currentSubtaskId++;
    const subtask: Subtask = { ...insertSubtask, id };
    this.subtasksMap.set(id, subtask);
    return subtask;
  }
  
  async updateSubtask(id: number, partialSubtask: Partial<InsertSubtask>): Promise<Subtask | undefined> {
    const subtask = this.subtasksMap.get(id);
    if (!subtask) return undefined;
    
    const updatedSubtask: Subtask = { ...subtask, ...partialSubtask };
    this.subtasksMap.set(id, updatedSubtask);
    return updatedSubtask;
  }
  
  async deleteSubtask(id: number): Promise<boolean> {
    return this.subtasksMap.delete(id);
  }
  
  // Comment operations
  async getCommentsByTaskId(taskId: number): Promise<Comment[]> {
    return Array.from(this.commentsMap.values()).filter(
      (comment) => comment.taskId === taskId
    );
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const now = new Date();
    const comment: Comment = { 
      ...insertComment, 
      id, 
      time: now 
    };
    this.commentsMap.set(id, comment);
    return comment;
  }
  
  // Requirement operations
  async getRequirementsByTaskId(taskId: number): Promise<Requirement[]> {
    return Array.from(this.requirementsMap.values()).filter(
      (requirement) => requirement.taskId === taskId
    );
  }
  
  async createRequirement(insertRequirement: InsertRequirement): Promise<Requirement> {
    const id = this.currentRequirementId++;
    const requirement: Requirement = { ...insertRequirement, id };
    this.requirementsMap.set(id, requirement);
    return requirement;
  }
}

export const storage = new MemStorage();
