import React from "react";
import TaskList from "./TaskList";
import { useTaskContext } from "@/context/TaskContext";
import { Search, Filter, SortDesc, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/useMobile";

interface TaskListPanelProps {
  onMenuClick: () => void;
  className?: string;
}

const TaskListPanel: React.FC<TaskListPanelProps> = ({ onMenuClick, className = "" }) => {
  const { isMobile } = useMobile();
  const { tasks, stats } = useTaskContext();
  const [activeTab, setActiveTab] = React.useState("all");

  // Group tasks by date
  const todayTasks = tasks.filter(task => task.group === "today");
  const tomorrowTasks = tasks.filter(task => task.group === "tomorrow");
  const laterTasks = tasks.filter(task => task.group === "later");

  const handleNewTask = () => {
    // Implement new task creation logic
    console.log("Create new task");
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className={`${className} border-r border-neutral-200 bg-white flex flex-col h-full panel-transition`}>
      {/* Mobile Header with Menu Button */}
      {isMobile && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-200">
          <button 
            onClick={onMenuClick}
            className="p-1 rounded-md text-neutral-700 hover:bg-neutral-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">Tasks</h1>
          <button className="p-1 rounded-md text-neutral-700 hover:bg-neutral-100">
            <Search className="h-6 w-6" />
          </button>
        </div>
      )}
      
      {/* Task Panel Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Tasks</h2>
          <p className="text-sm text-neutral-500">{stats.totalTasks} tasks, {stats.completedTasks} completed</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100" title="Search">
            <Search className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100" title="Filter">
            <Filter className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100" title="Sort">
            <SortDesc className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Task Filter Tabs */}
      <div className="flex p-2 border-b border-neutral-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === tab.id 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-neutral-500 hover:text-primary hover:bg-neutral-50'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Task List */}
      <div className="flex-1 overflow-y-auto">
        {todayTasks.length > 0 && (
          <div className="p-4">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Today - April 20, 2025</h3>
            <TaskList tasks={todayTasks} />
          </div>
        )}
        
        {tomorrowTasks.length > 0 && (
          <div className="p-4 pt-0">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Tomorrow - April 21, 2025</h3>
            <TaskList tasks={tomorrowTasks} />
          </div>
        )}
        
        {laterTasks.length > 0 && (
          <div className="p-4 pt-0">
            <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Later This Week</h3>
            <TaskList tasks={laterTasks} />
          </div>
        )}
      </div>
      
      {/* New Task Button */}
      <div className="p-4 border-t border-neutral-200">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={handleNewTask}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span>New Task</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskListPanel;
