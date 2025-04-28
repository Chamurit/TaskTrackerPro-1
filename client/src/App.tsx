import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider } from "next-themes";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TaskProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
