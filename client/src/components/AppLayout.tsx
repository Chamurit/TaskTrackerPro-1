import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TaskListPanel from "./TaskListPanel";
import TaskDetailPanel from "./TaskDetailPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import { useMobile } from "@/hooks/useMobile";
import { useTaskContext } from "@/context/TaskContext";

const AppLayout: React.FC = () => {
  const { isMobile, isTablet } = useMobile();
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile);
  const [analyticsVisible, setAnalyticsVisible] = useState(false);
  const { selectedTask } = useTaskContext();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const showAnalyticsPanel = () => {
    setAnalyticsVisible(true);
  };

  const hideAnalyticsPanel = () => {
    setAnalyticsVisible(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar visible={sidebarVisible} />

      {/* Task List Panel */}
      <TaskListPanel 
        onMenuClick={toggleSidebar} 
        className={`${isMobile && selectedTask ? 'hidden' : 'flex'} w-full md:w-1/2 lg:w-1/3`}
      />

      {/* Task Detail Panel */}
      <TaskDetailPanel 
        onBack={() => {}}
        onShowAnalytics={showAnalyticsPanel}
        className={`${isMobile && !selectedTask ? 'hidden' : 'flex'} ${!selectedTask && !isMobile ? 'hidden' : ''} md:flex-1`}
      />

      {/* Analytics Panel (Third Pane) */}
      {analyticsVisible && (
        <AnalyticsPanel
          onClose={hideAnalyticsPanel}
          className="hidden lg:flex lg:w-1/3"
        />
      )}
    </div>
  );
};

export default AppLayout;
