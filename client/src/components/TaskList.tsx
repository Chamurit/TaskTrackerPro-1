import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "@/data/mockData";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
