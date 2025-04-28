import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Get project color based on project name
export function getProjectColor(projectName: string): string {
  switch (projectName) {
    case "Marketing Campaign":
      return "bg-green-500";
    case "Website Redesign":
      return "bg-blue-500";
    case "Mobile App Development":
      return "bg-purple-500";
    case "Finance":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}

// Get priority style class based on priority level
export function getPriorityClass(priority: string): string {
  switch (priority.toLowerCase()) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "urgent":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Format date for display
export function formatDateForDisplay(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
