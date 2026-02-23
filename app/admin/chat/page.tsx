"use client";

import {
  User,
  MoreHorizontal,
  Wrench,
  AlertTriangle,
  HelpCircle,
  Users,
  Scan,
  Send,
  Paperclip,
  CheckCheck,
  Home,
  ChevronLeft,
  Search,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const THREADS = [
  {
    id: "WP-205",
    title: "WP - 205 - Pile Cap #12",
    icon: Wrench,
    color: "bg-blue-500",
  },
  {
    id: "I-044",
    title: "I-044 - Unsafe Trench",
    icon: AlertTriangle,
    color: "bg-yellow-500",
  },
  {
    id: "RFI-1012",
    title: "RFI 1012 - MEP Clash",
    icon: HelpCircle,
    color: "bg-purple-500",
  },
  {
    id: "TEAM-A",
    title: "Steel-Fixers A-Team",
    icon: Users,
    color: "bg-green-500",
  },
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState("WP-205");
  const [showSidebar, setShowSidebar] = useState(true);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const currentThread =
    THREADS.find((t) => t.id === activeThread) || THREADS[0];

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Header - Global */}
      <header className="flex items-center justify-between shrink-0 h-16 bg-white border-b border-gray-200 px-4 md:px-6 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-[#021422] transition-all group"
          >
            <Home
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-sm font-semibold hidden sm:inline">
              Back to Dashboard
            </span>
          </Link>
          <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1" />
          <h1 className="text-lg font-bold text-[#021422] truncate max-w-[150px] sm:max-w-none">
            Project Communication
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-bold text-[#021422]">John Doe</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
              Supervisor
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
            <User size={18} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Threads List */}
        <aside
          className={`
            absolute inset-0 z-20 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:w-80 flex flex-col
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="p-4 border-b border-gray-100 space-y-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search threads..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-1.5 p-1 bg-gray-100 rounded-lg">
              {["All", "Alerts", "Team"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-[10px] font-bold uppercase py-1.5 rounded-md transition-all ${tab === "All" ? "bg-white text-[#021422] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-2">
              Active Contexts
            </h3>
            {THREADS.map((thread) => (
              <button
                key={thread.id}
                onClick={() => {
                  setActiveThread(thread.id);
                  if (window.innerWidth < 768) setShowSidebar(false);
                }}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all group relative
                  ${activeThread === thread.id ? "bg-[#021422] text-white shadow-lg" : "hover:bg-gray-100 text-[#021422]"}
                `}
              >
                <div
                  className={`p-2 rounded-lg ${activeThread === thread.id ? "bg-white/10" : "bg-gray-100 group-hover:bg-white"}`}
                >
                  <thread.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {thread.title}
                  </p>
                  <p
                    className={`text-[10px] truncate ${activeThread === thread.id ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Last message 2m ago
                  </p>
                </div>
                {thread.id === "I-044" && (
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute top-3 right-3 shadow-sm shadow-red-200" />
                )}
              </button>
            ))}

            <h3 className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">
              Safety Alerts
            </h3>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 text-[#021422] text-left transition-all">
                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                  <AlertTriangle size={18} />
                </div>
                <span className="text-sm font-semibold">
                  HSE Alert: Fall Hazard
                </span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white overflow-hidden relative z-10">
          {/* Chat Header */}
          <header className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <button
                onClick={() => setShowSidebar(true)}
                className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-lg text-gray-600"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex-1 overflow-hidden">
                <h2 className="text-sm font-bold text-[#021422] truncate">
                  {currentThread.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-red-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    On Hold
                  </span>
                  <span className="text-[10px] text-gray-400 h-1 w-1 rounded-full bg-gray-300" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    Grid B5
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <Scan size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50/50 space-y-6 scroll-smooth">
            <AnimatePresence mode="popLayout">
              {/* Message groups would go here - placeholder for initial messages */}
              <motion.div
                key="outgoing-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-end gap-1"
              >
                <div className="max-w-[85%] md:max-w-[70%] bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-sm">
                  <p className="text-sm leading-relaxed">
                    Rebar is ready but cover looks tight at NE corner. Can you
                    verify?
                  </p>
                </div>
                <div className="flex items-center gap-1 mr-1">
                  <span className="text-[10px] text-gray-400 font-medium">
                    10:15 AM
                  </span>
                  <CheckCheck size={12} className="text-blue-500" />
                </div>
              </motion.div>

              <motion.div
                key="ar-capture"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 self-end cursor-pointer group"
              >
                <div className="bg-[#021422] rounded-xl px-4 py-2 flex items-center gap-3 shadow-md group-hover:bg-gray-900 transition-colors">
                  <Scan size={16} className="text-white" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    View AR Capture
                  </span>
                </div>
              </motion.div>

              <motion.div
                key="incoming-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-start gap-1"
              >
                <div className="text-xs font-bold text-gray-400 ml-1 mb-1">
                  Supervisor
                </div>
                <div className="max-w-[85%] md:max-w-[70%] bg-white border border-gray-100 text-[#021422] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <p className="text-sm leading-relaxed">
                    Viewing your AR Snapshot now. You're right, the clearance is
                    below spec. Let's adjust the spacers before pouring.
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 font-medium ml-1">
                  10:30 AM
                </span>
              </motion.div>
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 ml-1"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <footer className="p-4 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Replying to: {currentThread.id}</span>
                <span className="text-blue-500">Secure Channel</span>
              </div>
              <div className="flex items-end gap-2 bg-gray-50 border border-gray-100 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white transition-all shadow-inner">
                <button className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors">
                  <Paperclip size={20} />
                </button>
                <textarea
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent py-2.5 px-1 text-sm outline-none resize-none max-h-32"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`
                    p-2.5 rounded-xl transition-all
                    ${message.trim() ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-100" : "bg-gray-200 text-gray-400 scale-95"}
                  `}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
