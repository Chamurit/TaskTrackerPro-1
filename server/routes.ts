import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertTaskSchema, 
  insertSubtaskSchema, 
  insertCommentSchema, 
  insertRequirementSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tasks
  app.get("/api/tasks", async (req, res) => {
    const tasks = await storage.getAllTasks();
    res.json(tasks);
  });

  // Get a single task with all related data
  app.get("/api/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await storage.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Get related data
    const subtasks = await storage.getSubtasksByTaskId(taskId);
    const comments = await storage.getCommentsByTaskId(taskId);
    const requirements = await storage.getRequirementsByTaskId(taskId);

    res.json({
      ...task,
      subtasks,
      comments,
      requirements
    });
  });

  // Create a new task
  app.post("/api/tasks", async (req, res) => {
    try {
      const taskData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(taskData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });

  // Update a task
  app.patch("/api/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
      const taskData = insertTaskSchema.partial().parse(req.body);
      const updatedTask = await storage.updateTask(taskId, taskData);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update task" });
    }
  });

  // Delete a task
  app.delete("/api/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const success = await storage.deleteTask(taskId);
    if (!success) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).send();
  });

  // Subtask routes
  app.post("/api/tasks/:taskId/subtasks", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
      const subtaskData = insertSubtaskSchema.parse({ ...req.body, taskId });
      const subtask = await storage.createSubtask(subtaskData);
      res.status(201).json(subtask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid subtask data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create subtask" });
    }
  });

  // Comment routes
  app.post("/api/tasks/:taskId/comments", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
      const commentData = insertCommentSchema.parse({ ...req.body, taskId });
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Requirement routes
  app.post("/api/tasks/:taskId/requirements", async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    if (isNaN(taskId)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    try {
      const requirementData = insertRequirementSchema.parse({ ...req.body, taskId });
      const requirement = await storage.createRequirement(requirementData);
      res.status(201).json(requirement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid requirement data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create requirement" });
    }
  });

  // Google Analytics mock integration routes
  app.get("/api/analytics/status", async (req, res) => {
    // Mock response for Google Analytics integration status
    res.json({
      connected: true,
      account: "marketing@company.com",
      propertyId: "UA-XXXXX-Y",
      trackingType: "GA4",
      connectedOn: "2025-04-18",
      lastSynced: new Date().toISOString()
    });
  });

  app.get("/api/analytics/events", async (req, res) => {
    // Mock response for Google Analytics events
    res.json([
      { name: "page_view", description: "Tracks when a user views a page", status: "Active" },
      { name: "newsletter_signup", description: "Tracks newsletter form submissions", status: "Active" },
      { name: "contact_form_submit", description: "Tracks contact form submissions", status: "Active" },
      { name: "product_view", description: "Tracks product page views", status: "Pending" },
      { name: "demo_request", description: "Tracks demo request form submissions", status: "Not Configured" }
    ]);
  });

  const httpServer = createServer(app);

  return httpServer;
}
