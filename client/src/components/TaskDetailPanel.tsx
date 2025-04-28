import React, { useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { ArrowLeft, Share, MoreHorizontal, ArrowRight, X, Folder, Calendar, Clock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMobile } from "@/hooks/useMobile";

interface TaskDetailPanelProps {
  onBack: () => void;
  onShowAnalytics: () => void;
  className?: string;
}

const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({ onBack, onShowAnalytics, className = "" }) => {
  const { isMobile } = useMobile();
  const { selectedTask, toggleTaskCompletion } = useTaskContext();
  const [comment, setComment] = useState("");

  if (!selectedTask) {
    return (
      <div className={`${className} bg-white flex flex-col h-full panel-transition items-center justify-center`}>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="h-6 w-6 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No Task Selected</h3>
          <p className="text-sm text-neutral-500">Select a task from the list to view its details</p>
        </div>
      </div>
    );
  }

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className={`${className} bg-white flex flex-col h-full panel-transition`}>
      {/* Task Detail Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={onBack}
              className="md:hidden p-2 mr-2 rounded-md text-neutral-700 hover:bg-neutral-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <h2 className="text-lg font-semibold text-neutral-900">Task Details</h2>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100" title="Share">
            <Share className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100" title="More options">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Task Details Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Task Title and Status */}
        <div className="flex items-start mb-6">
          <div className="flex-shrink-0 pt-1">
            <Checkbox 
              checked={selectedTask.completed} 
              onClick={() => toggleTaskCompletion(selectedTask.id)}
              className="h-5 w-5 rounded border-neutral-300 text-primary focus:ring-primary"
              aria-label="Mark task as complete"
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-xl font-semibold text-neutral-900">{selectedTask.title}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                ${selectedTask.priority === 'urgent' ? 'bg-red-100 text-red-800' : 
                selectedTask.priority === 'high' ? 'bg-orange-100 text-orange-800' : 
                selectedTask.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                'bg-green-100 text-green-800'}`}>
                {selectedTask.priority.charAt(0).toUpperCase() + selectedTask.priority.slice(1)}
              </span>
            </div>
            <div className="flex items-center text-sm text-neutral-500">
              <span>Created on {selectedTask.createdAt}</span>
              <span className="mx-2">•</span>
              <span>Due {selectedTask.dueDate} at {selectedTask.dueTime}</span>
            </div>
          </div>
        </div>
        
        {/* Task Description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-2">Description</h3>
          <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-700">
            <p>{selectedTask.description}</p>
            {selectedTask.requirements && (
              <>
                <p className="mt-2">Requirements:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {selectedTask.requirements.map((req, index) => (
                    <li key={index}>
                      {req.subitems ? (
                        <>
                          {req.text}
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            {req.subitems.map((subitem, subIndex) => (
                              <li key={subIndex}>{subitem}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        req.text
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
        
        {/* Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Project and Priority */}
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Project</h3>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${
                selectedTask.project === 'Marketing Campaign' ? 'bg-green-500' :
                selectedTask.project === 'Website Redesign' ? 'bg-blue-500' :
                'bg-purple-500'
              } mr-2`}></span>
              <span className="text-sm text-neutral-700">{selectedTask.project}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Priority</h3>
            <Select defaultValue={selectedTask.priority}>
              <SelectTrigger className="text-sm focus:ring-primary">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorityOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Due Date and Time */}
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Due Date</h3>
            <div className="relative">
              <input 
                type="date" 
                defaultValue={formatDate(selectedTask.dueDate)}
                className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary focus:ring-primary" 
              />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Due Time</h3>
            <div className="relative">
              <input 
                type="time" 
                defaultValue={selectedTask.dueTime.replace(" AM", "").replace(" PM", "")}
                className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary focus:ring-primary" 
              />
            </div>
          </div>
          
          {/* Assignee */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Assigned to</h3>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full ring-2 ring-white bg-neutral-300"></div>
              </div>
              <button className="ml-2 text-sm text-primary hover:text-primary/80">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Integration with Google Analytics - Show in third pane */}
        {selectedTask.hasGoogleAnalytics && (
          <div className="mb-6 border border-neutral-200 rounded-lg overflow-hidden">
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-neutral-700 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <h3 className="text-sm font-medium text-neutral-700">Google Analytics Integration</h3>
              </div>
              <button 
                onClick={onShowAnalytics}
                className="text-primary hover:text-primary/80 text-sm flex items-center"
              >
                <span>View Details</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center text-sm text-neutral-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Connected to GA4 property: UA-XXXXX-Y</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-neutral-500">Last synced: 2 hours ago</span>
                <button className="text-xs text-primary hover:text-primary/80">Sync Now</button>
              </div>
            </div>
          </div>
        )}
        
        {/* Subtasks */}
        {selectedTask.subtasks && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-700">
                Subtasks ({selectedTask.subtasks.filter(t => t.completed).length}/{selectedTask.subtasks.length})
              </h3>
              <button className="text-sm text-primary hover:text-primary/80">Add Subtask</button>
            </div>
            <ul className="space-y-2">
              {selectedTask.subtasks.map((subtask, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    <Checkbox 
                      checked={subtask.completed} 
                      className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary" 
                    />
                    <span className={`ml-2 text-sm ${subtask.completed ? 'text-neutral-700 line-through' : 'text-neutral-700'}`}>
                      {subtask.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Comments */}
        {selectedTask.comments && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-neutral-700">Comments ({selectedTask.comments.length})</h3>
            </div>
            
            {/* Comment List */}
            <ul className="space-y-4">
              {selectedTask.comments.map((comment, index) => (
                <li key={index}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-neutral-300"></div>
                    </div>
                    <div className="ml-3">
                      <div className="bg-neutral-50 rounded-lg px-3 py-2 text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-neutral-900">{comment.author}</span>
                          <span className="text-xs text-neutral-500">{comment.time}</span>
                        </div>
                        <p className="text-neutral-700">{comment.text}</p>
                      </div>
                      <div className="mt-1 flex items-center space-x-2 text-xs">
                        <button className="text-neutral-500 hover:text-neutral-700">Reply</button>
                        <button className="text-neutral-500 hover:text-neutral-700">React</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Add Comment */}
            <div className="mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-neutral-300"></div>
                </div>
                <div className="ml-3 flex-1">
                  <Textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="block w-full rounded-md border-neutral-300 text-sm focus:border-primary focus:ring-primary"
                    placeholder="Add a comment..."
                  />
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="p-1 text-neutral-500 hover:text-neutral-700" title="Attach file">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                      </button>
                      <button className="p-1 text-neutral-500 hover:text-neutral-700" title="Add emoji">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" x2="9.01" y1="9" y2="9" />
                          <line x1="15" x2="15.01" y1="9" y2="9" />
                        </svg>
                      </button>
                      <button className="p-1 text-neutral-500 hover:text-neutral-700" title="Mention someone">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                        </svg>
                      </button>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white py-1 px-3 text-sm">
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPanel;
