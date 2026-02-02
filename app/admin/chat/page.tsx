"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, MoreVertical, Link2, Video, Calendar, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  attachment?: {
    type: "ar" | "text";
    label: string;
  };
}

interface Thread {
  id: string;
  title: string;
  icon?: string;
  status?: string;
  location?: string;
  isActive?: boolean;
}

export default function ProjectCommunicationPage() {
  const router = useRouter();
  const [selectedThread, setSelectedThread] = useState<Thread | null>({
    id: "WP-205",
    title: "WP - 205 - Pile Cap #12",
    isActive: true,
    icon: "🏗️",
    status: "On Hold",
    location: "Grid B5",
  });

  const [messageInput, setMessageInput] = useState("");
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  const contextTabs = ["Details", "Updates", "Files"];

  const activeContextThreads: Thread[] = [
    {
      id: "WP-205",
      title: "WP - 205 - Pile Cap #12",
      isActive: true,
      icon: "🏗️",
    },
    {
      id: "I-044",
      title: "I-044 - Unsafe Trench",
      icon: "⚠️",
    },
    {
      id: "RFI-1012",
      title: "RFI 1012 - MEP Clash",
      icon: "❓",
    },
    {
      id: "Steel-Fixers",
      title: "Steel-Fixers A-Team",
      icon: "👥",
    },
  ];

  const alertContexts: Thread[] = [
    {
      id: "HSE-Alert",
      title: "HSE Alert: Fall Hazard",
      icon: "🟢",
    },
    {
      id: "Inv-Alert",
      title: "Inv. Alert: Rebar Low Stock",
      icon: "🔴",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Rebar is ready but cover looks tight at NE corner. Can you verify?",
      timestamp: "10:15 AM",
      isUser: true,
    },
    {
      id: "2",
      text: "Viewing your AR Snapshot now. You're right",
      timestamp: "10:30 AM",
      isUser: false,
      attachment: {
        type: "ar",
        label: "AR CAPTURE ATTACHED",
      },
    },
    {
      id: "3",
      text: "AR REPLY ATTACHED",
      timestamp: "",
      isUser: false,
      attachment: {
        type: "ar",
        label: "AR REPLY ATTACHED",
      },
    },
  ];

  return (
    <main className="min-h-screen bg-[#E8E8E8] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-300">
        <h1 className="text-xl font-bold text-slate-900">
          Project Communication
        </h1>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white font-bold text-sm">JD</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">John Doe</p>
            <p className="text-xs text-gray-500">Supervisor</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Left Sidebar - Contexts & Threads */}
        <div className="w-56 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="p-6 overflow-y-auto flex-1">
            {/* Context Tabs */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                CONTEXTS & THREADS
              </h3>
              <div className="flex gap-2">
                {contextTabs.map((tab) => (
                  <button
                    key={tab}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-900 text-white hover:bg-slate-800"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Context Threads */}
            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4">
                Active Context Threads
              </h3>
              <div className="space-y-2">
                {activeContextThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedThread?.id === thread.id
                        ? "bg-slate-900 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{thread.icon}</span>
                      <p className="text-xs font-medium leading-tight">
                        {thread.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Alert Contexts */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4">
                Alert (2)
              </h3>
              <div className="space-y-2">
                {alertContexts.map((alert) => (
                  <button
                    key={alert.id}
                    onClick={() => setSelectedThread(alert)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedThread?.id === alert.id
                        ? "bg-slate-900 text-white"
                        : "bg-gray-50 hover:bg-gray-100 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{alert.icon}</span>
                      <p className="text-xs font-medium">{alert.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Message Thread */}
        <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          {selectedThread && (
            <>
              {/* Thread Header */}
              <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    MESSAGE THREAD
                  </h2>
                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    TASK: {selectedThread.title}
                  </h3>
                  {selectedThread.location && (
                    <p className="text-xs text-gray-600 mt-1">
                      Location: {selectedThread.location} | Status:{" "}
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        {selectedThread.status}
                      </span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowMeetingModal(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {message.isUser ? (
                      <div className="flex flex-col items-end">
                        <div className="bg-blue-600 text-white rounded-3xl rounded-tr-none px-6 py-3 max-w-xs">
                          {message.text && (
                            <p className="text-sm">{message.text}</p>
                          )}
                          {message.timestamp && (
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp}
                            </p>
                          )}
                        </div>
                        {message.isUser && message.timestamp && (
                          <p className="text-xs text-gray-600 mt-1 mr-2">YOU</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-start max-w-sm">
                        {message.text && !message.attachment && (
                          <div className="bg-gray-200 text-slate-900 rounded-3xl rounded-tl-none px-6 py-3">
                            <p className="text-sm">{message.text}</p>
                            {message.timestamp && (
                              <p className="text-xs mt-1 text-gray-600">
                                {message.timestamp}
                              </p>
                            )}
                          </div>
                        )}
                        {message.attachment && (
                          <div className="bg-slate-900 text-white rounded-lg px-4 py-3 inline-flex items-center gap-2">
                            <span className="text-lg">📷</span>
                            <span className="text-xs font-bold">
                              {message.attachment.label}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {/* Regarding text */}
                <div className="mt-8 pt-6">
                  <p className="text-xs text-gray-600">Regarding: WP-205</p>
                </div>
              </div>

              {/* Message Input Area */}
              <div className="px-8 py-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type Reply..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <span className="text-lg">@</span>
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Meeting Schedule Modal */}
      {showMeetingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-12 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowMeetingModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-700 rounded-lg transition"
            >
              <X size={24} className="text-white" />
            </button>

            {/* Title */}
            <h2 className="text-4xl font-bold text-white mb-12">
              Meeting Schedule
            </h2>

            {/* Action Cards */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {/* Create Link Card */}
              <button className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-lg transition">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Link2
                    size={40}
                    className="text-slate-900"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm font-medium text-slate-900 text-center">
                  Create Link to Share
                </p>
              </button>

              {/* Start Meeting Card */}
              <button
                onClick={() => {
                  setShowMeetingModal(false);
                  router.push("/admin/chat/meeting");
                }}
                className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 hover:shadow-lg transition"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  <Video
                    size={40}
                    className="text-slate-900"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm font-medium text-slate-900 text-center">
                  Start an Instant Meeting
                </p>
              </button>

              {/* Schedule Calendar Card */}
              <button className="bg-blue-600 rounded-2xl p-8 flex flex-col items-center gap-4 hover:bg-blue-700 transition">
                <div className="w-16 h-16 flex items-center justify-center">
                  <Calendar
                    size={40}
                    className="text-white"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="text-sm font-medium text-white text-center">
                  Schedule in Calendly
                </p>
              </button>
            </div>

            {/* Footer Logo */}
            <div className="flex items-center justify-end gap-2 text-white">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-slate-900">📐</span>
                </div>
              </div>
              <span className="text-sm font-bold tracking-wide">
                SITE SUPERVISE
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
