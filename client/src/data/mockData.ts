export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  completed: boolean;
  createdAt: string;
  dueDate: string;
  dueTime: string;
  project: string;
  group: "today" | "tomorrow" | "later";
  hasGoogleAnalytics?: boolean;
  requirements?: { text: string; subitems?: string[] }[];
  subtasks?: { text: string; completed: boolean }[];
  comments?: { author: string; text: string; time: string }[];
}

export interface TaskStats {
  totalTasks: number;
  completedTasks: number;
}

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Update landing page design",
    description: "Redesign the hero section and improve the call-to-action buttons for better conversion rates.",
    priority: "high",
    completed: false,
    createdAt: "Apr 19, 2025",
    dueDate: "Apr 20, 2025",
    dueTime: "2:00 PM",
    project: "Website Redesign",
    group: "today",
    hasGoogleAnalytics: false,
    requirements: [
      { text: "Redesign hero section" },
      { text: "Improve CTA buttons" },
      { text: "Update color scheme" },
      { text: "Optimize for mobile" }
    ],
    subtasks: [
      { text: "Sketch wireframes", completed: true },
      { text: "Create mockup in Figma", completed: false },
      { text: "Get feedback from team", completed: false }
    ],
    comments: [
      { 
        author: "James Wilson", 
        text: "I've created a few sample designs, will share them in our next meeting.", 
        time: "Yesterday at 3:15 PM" 
      }
    ]
  },
  {
    id: 2,
    title: "Setup Google Analytics integration",
    description: "Connect GA4 to our website and set up key conversion events and goals.",
    priority: "urgent",
    completed: false,
    createdAt: "Apr 18, 2025",
    dueDate: "Apr 20, 2025",
    dueTime: "3:30 PM",
    project: "Marketing Campaign",
    group: "today",
    hasGoogleAnalytics: true,
    requirements: [
      { text: "Set up GA4 property" },
      { 
        text: "Configure conversion events for:", 
        subitems: [
          "Newsletter signups",
          "Contact form submissions",
          "Product page views",
          "Demo requests"
        ]
      },
      { text: "Create custom dashboard for marketing team" },
      { text: "Document implementation for future reference" }
    ],
    subtasks: [
      { text: "Set up GA4 property", completed: true },
      { text: "Configure basic events", completed: true },
      { text: "Create custom dashboard", completed: false },
      { text: "Document implementation", completed: false }
    ],
    comments: [
      { 
        author: "Sarah Chen", 
        text: "I've prepared some documentation on our current analytics setup. You can find it in the shared Marketing folder.", 
        time: "Yesterday at 2:30 PM" 
      },
      { 
        author: "Tom Wilson", 
        text: "I can help with the dashboard creation once you've set up the basic events. Let me know when you're ready to collaborate on that part.", 
        time: "Today at 9:15 AM" 
      }
    ]
  },
  {
    id: 3,
    title: "Client meeting preparation",
    description: "Prepare presentation slides and data reports for the quarterly review meeting.",
    priority: "medium",
    completed: false,
    createdAt: "Apr 18, 2025",
    dueDate: "Apr 21, 2025",
    dueTime: "10:00 AM",
    project: "Marketing Campaign",
    group: "tomorrow",
    hasGoogleAnalytics: false,
    requirements: [
      { text: "Prepare slides for quarterly review" },
      { text: "Gather data reports" },
      { text: "Rehearse presentation" }
    ],
    subtasks: [
      { text: "Create presentation outline", completed: true },
      { text: "Design slides", completed: false },
      { text: "Get performance data", completed: false },
      { text: "Rehearse presentation", completed: false }
    ]
  },
  {
    id: 4,
    title: "Test mobile app prototype",
    description: "Review the latest prototype on iOS and Android devices, document any bugs or UX issues.",
    priority: "medium",
    completed: false,
    createdAt: "Apr 19, 2025",
    dueDate: "Apr 21, 2025",
    dueTime: "2:00 PM",
    project: "Mobile App Development",
    group: "tomorrow",
    hasGoogleAnalytics: false,
    subtasks: [
      { text: "Test on iOS devices", completed: false },
      { text: "Test on Android devices", completed: false },
      { text: "Document UX issues", completed: false },
      { text: "Submit bug report", completed: false }
    ]
  },
  {
    id: 5,
    title: "Content calendar planning",
    description: "Define content topics and schedule for the next month across all social media channels.",
    priority: "low",
    completed: false,
    createdAt: "Apr 17, 2025",
    dueDate: "Apr 23, 2025",
    dueTime: "5:00 PM",
    project: "Marketing Campaign",
    group: "later",
    hasGoogleAnalytics: false
  },
  {
    id: 6,
    title: "Finalize Q2 budget",
    description: "Review department expense requests and allocate the remaining budget for Q2 projects.",
    priority: "high",
    completed: false,
    createdAt: "Apr 15, 2025",
    dueDate: "Apr 25, 2025",
    dueTime: "3:00 PM",
    project: "Finance",
    group: "later",
    hasGoogleAnalytics: false
  }
];

export const mockStats: TaskStats = {
  totalTasks: 23,
  completedTasks: 8
};
