import React, { createContext, useState, useContext, useEffect } from "react";
import { Task, mockTasks, TaskStats, mockStats } from "@/data/mockData";

interface TaskContextProps {
  tasks: Task[];
  selectedTask: Task | null;
  stats: TaskStats;
  setSelectedTask: (task: Task | null) => void;
  toggleTaskCompletion: (id: number) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps>({
  tasks: [],
  selectedTask: null,
  stats: { totalTasks: 0, completedTasks: 0 },
  setSelectedTask: () => {},
  toggleTaskCompletion: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [stats, setStats] = useState<TaskStats>(mockStats);

  // Update stats when tasks change
  useEffect(() => {
    const completedCount = tasks.filter(task => task.completed).length;
    setStats({
      totalTasks: tasks.length,
      completedTasks: completedCount
    });
  }, [tasks]);

  // Toggle task completion status
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    
    // Also update selected task if it's the same task
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask({
        ...selectedTask,
        completed: !selectedTask.completed
      });
    }
  };

  // Add new task
  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Math.max(...tasks.map(t => t.id), 0) + 1
    };
    setTasks([...tasks, newTask]);
  };

  // Update existing task
  const updateTask = (id: number, updatedFields: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
    
    // Also update selected task if it's the same task
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask({
        ...selectedTask,
        ...updatedFields
      });
    }
  };

  // Delete task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    // Clear selected task if it was deleted
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(null);
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      selectedTask,
      stats,
      setSelectedTask,
      toggleTaskCompletion,
      addTask,
      updateTask,
      deleteTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};
