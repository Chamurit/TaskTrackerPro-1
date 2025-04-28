import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyticsPanelProps {
  onClose: () => void;
  className?: string;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ onClose, className = "" }) => {
  return (
    <div className={`${className} bg-white border-l border-neutral-200 flex flex-col h-full panel-transition`}>
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">Google Analytics Integration</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-md text-neutral-700 hover:bg-neutral-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {/* Connection Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Connected to Google Analytics</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your Google Analytics account is successfully connected and actively tracking data for this project.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Account Details */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Account Details</h3>
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <dl className="divide-y divide-neutral-200">
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-neutral-500">Google Account</dt>
                <dd className="text-sm text-neutral-900 col-span-2">marketing@company.com</dd>
              </div>
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-neutral-500">Property ID</dt>
                <dd className="text-sm text-neutral-900 col-span-2">UA-XXXXX-Y</dd>
              </div>
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-neutral-500">Tracking Type</dt>
                <dd className="text-sm text-neutral-900 col-span-2">GA4 (Google Analytics 4)</dd>
              </div>
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-neutral-500">Connected On</dt>
                <dd className="text-sm text-neutral-900 col-span-2">Apr 18, 2025</dd>
              </div>
              <div className="px-4 py-3 grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium text-neutral-500">Last Synced</dt>
                <dd className="text-sm text-neutral-900 col-span-2">Today, 11:32 AM</dd>
              </div>
            </dl>
          </div>
        </div>
        
        {/* Configured Events */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-neutral-700">Configured Events</h3>
            <button className="text-sm text-primary hover:text-primary/80">Add Event</button>
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200">
            {[
              { name: "page_view", description: "Tracks when a user views a page", status: "Active" },
              { name: "newsletter_signup", description: "Tracks newsletter form submissions", status: "Active" },
              { name: "contact_form_submit", description: "Tracks contact form submissions", status: "Active" },
              { name: "product_view", description: "Tracks product page views", status: "Pending" },
              { name: "demo_request", description: "Tracks demo request form submissions", status: "Not Configured" }
            ].map((event, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">{event.name}</h4>
                    <p className="mt-1 text-xs text-neutral-500">{event.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${event.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    event.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-neutral-100 text-neutral-800'}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Dashboard Preview */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Dashboard Preview</h3>
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <div className="text-center py-8 mb-3">
              <div className="w-full h-40 bg-neutral-200 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm text-neutral-500">Custom dashboard is currently being created</p>
              <p className="text-xs text-neutral-400 mt-1">2 of 5 metrics configured</p>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Open in Google Analytics</span>
            </Button>
          </div>
        </div>
        
        {/* Documentation */}
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3">Documentation</h3>
          <div className="bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200">
            {[
              { title: "GA4 Implementation Guide", type: "PDF", size: "2.4 MB", date: "Apr 18, 2025" },
              { title: "Event Tracking Schemas", type: "XLSX", size: "1.1 MB", date: "Apr 19, 2025" }
            ].map((doc, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900">{doc.title}</h4>
                    <p className="mt-1 text-xs text-neutral-500">{doc.type} • {doc.size} • Added {doc.date}</p>
                  </div>
                  <button className="ml-auto p-2 text-neutral-500 hover:text-neutral-700">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
