import React from "react";
import { Task } from "@/data/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskContext } from "@/context/TaskContext";
import { Clock, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { selectedTask, setSelectedTask, toggleTaskCompletion } = useTaskContext();
  const isSelected = selectedTask?.id === task.id;

  const handleTaskClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedTask(task);
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  // Task priority badge styling
  const priorityClasses = {
    low: "bg-green-100 text-green-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800"
  };

  return (
    <div 
      className={cn(
        "p-3 bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        isSelected ? "border-primary bg-blue-50" : ""
      )}
      onClick={handleTaskClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <Checkbox 
            checked={task.completed} 
            onClick={handleCheckboxChange}
            className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
            aria-label="Mark task as complete"
          />
        </div>
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-900">{task.title}</p>
            <span className={`ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded ${priorityClasses[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
          <div className="mt-1">
            <p className="text-xs text-neutral-500 line-clamp-2">{task.description}</p>
          </div>
          <div className="mt-2 flex items-center text-xs text-neutral-500">
            <span className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>{task.dueTime}</span>
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Folder className="mr-1 h-3 w-3" />
              <span>{task.project}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
