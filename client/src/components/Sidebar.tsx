import React from "react";
import { useLocation } from "wouter";
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Users, 
  Plus, 
  Settings
} from "lucide-react";

interface SidebarProps {
  visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ visible }) => {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <Home className="mr-2 h-4 w-4" />, path: "/dashboard" },
    { name: "Tasks", icon: <CheckSquare className="mr-2 h-4 w-4" />, path: "/" },
    { name: "Calendar", icon: <Calendar className="mr-2 h-4 w-4" />, path: "/calendar" },
    { name: "Documents", icon: <FileText className="mr-2 h-4 w-4" />, path: "/documents" },
    { name: "Team", icon: <Users className="mr-2 h-4 w-4" />, path: "/team" },
  ];

  const projects = [
    { name: "Marketing Campaign", color: "bg-green-500" },
    { name: "Website Redesign", color: "bg-blue-500" },
    { name: "Mobile App Development", color: "bg-purple-500" },
  ];

  return (
    <div className={`${visible ? 'block' : 'hidden'} w-64 bg-white border-r border-neutral-200 flex flex-col h-full shadow-sm md:block panel-transition`}>
      {/* App Logo */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <div className="text-white text-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </div>
          </div>
          <h1 className="text-lg font-semibold text-neutral-900">Workspace</h1>
        </div>
      </div>
      
      {/* Workspace Selection */}
      <div className="p-3">
        <button className="w-full flex items-center justify-between p-2 rounded-md hover:bg-neutral-100 transition-colors">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-accent/10 text-accent rounded-md flex items-center justify-center mr-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
                <path d="M20 5h-8.586L9.707 3.293A.997.997 0 0 0 9 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"/>
              </svg>
            </span>
            <span className="text-sm font-medium">Personal Space</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-1">
              <a 
                href={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md 
                  ${location === item.path 
                    ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary'
                  } transition-colors`}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        
        <div className="pt-4 mt-4 border-t border-neutral-200">
          <h3 className="px-3 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Projects</h3>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="mb-1">
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${project.color} mr-2`}></span>
                  <span>{project.name}</span>
                </a>
              </li>
            ))}
            <li>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add New Project</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* User Profile Section */}
      <div className="p-3 border-t border-neutral-200">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-neutral-300 flex-shrink-0 overflow-hidden">
            <div className="w-full h-full bg-neutral-300"></div>
          </div>
          <div className="ml-2 flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">Alex Morgan</p>
            <p className="text-xs text-neutral-500 truncate">alex@workspace.com</p>
          </div>
          <button className="text-neutral-500 hover:text-neutral-700">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
