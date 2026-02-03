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
  Check,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState("WP-205");

  return (
    <div className="space-y-6 pb-20 h-full flex flex-col">
       {/* Header */}
       <div className="flex items-center justify-between shrink-0 gap-4 bg-white py-7 px-4">
         <h1 className="text-2xl font-bold text-[#021422]">Project Communication</h1>
         <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={16} />
                 </div>
                 <span className="font-bold text-[#021422]">John Doe</span>
                 <span className="text-xs text-gray-500 uppercase">Supervisor</span>
             </div>
         </div>
      </div>

      <div className="flex gap-8 flex-1 min-h-0 px-4">
           {/* Sidebar */}
           <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col shrink-0">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="font-bold text-sm tracking-wide uppercase text-[#021422]">CONTEXTS & THREADS</h2>
                    <div className="flex gap-2 mt-4">
                        <span className="px-3 py-1 bg-[#021422] text-white text-[10px] uppercase font-bold rounded-full">People</span>
                        <span className="px-3 py-1 border border-gray-200 text-gray-500 text-[10px] uppercase font-bold rounded-full">Threads</span>
                        <span className="px-3 py-1 border border-gray-200 text-gray-500 text-[10px] uppercase font-bold rounded-full">Alerts</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <h3 className="text-xs font-bold text-[#021422] mb-3 ml-2">Active Context Threads</h3>
                        <div className="space-y-1">
                             <button 
                                onClick={() => setActiveThread("WP-205")}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${activeThread === "WP-205" ? "bg-[#021422] text-white" : "hover:bg-gray-50 text-[#021422]"}`}
                             >
                                 <Wrench size={18} />
                                 <span className="text-sm font-medium">WP - 205 - Pile Cap #12</span>
                             </button>
                             <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-[#021422] text-left transition-colors">
                                 <AlertTriangle size={18} />
                                 <span className="text-sm font-medium">I-044 - Unsafe Trench</span>
                             </button>
                             <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-[#021422] text-left transition-colors">
                                 <HelpCircle size={18} />
                                 <span className="text-sm font-medium">RFI 1012 - MEP Clash</span>
                             </button>
                             <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-[#021422] text-left transition-colors">
                                 <Users size={18} />
                                 <span className="text-sm font-medium">Steel-Fixers A-Team</span>
                             </button>
                        </div>

                        <h3 className="text-xs font-bold text-[#021422] mb-3 ml-2 mt-6">Alert (2)</h3>
                         <div className="space-y-1">
                             <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-[#021422] text-left transition-colors">
                                 <span className="w-4 h-4 rounded bg-yellow-400 flex items-center justify-center text-[10px] font-bold">!</span>
                                 <span className="text-sm font-medium">HSE Alert: Fall Hazard</span>
                             </button>
                              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-[#021422] text-left transition-colors">
                                 <span className="w-4 h-4 rounded bg-orange-400 flex items-center justify-center text-[10px] font-bold">!</span>
                                 <span className="text-sm font-medium">Inv. Alert: Rebar Low Stock</span>
                             </button>
                         </div>
                    </div>
                </div>
           </div>

           {/* Chat Area */}
           <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                     <h2 className="font-bold text-sm tracking-wide uppercase text-gray-500">MESSAGE THREAD</h2>
                     <MoreHorizontal className="text-gray-400" />
                </div>

                <div className="p-6 border-b border-gray-100">
                     <h3 className="text-lg font-bold text-[#021422]">TASK: WP-205 | Pile Cap #12 Rebar</h3>
                     <div className="flex items-center gap-2 mt-1">
                         <span className="text-sm font-bold text-[#021422]">Location: Grid B5 | Status:</span>
                         <span className="flex items-center gap-1 text-sm font-bold text-red-500">
                             🛑 on Hold
                         </span>
                     </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50/50">
                    {/* Message 1 (Outgoing) */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                             <span className="text-xs font-bold text-gray-400">You</span>
                        </div>
                        <div className="bg-[#0070D4] text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                            <p className="text-sm font-medium">Redar is ready but cover looks tight at NE corner. Can you verify?</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-[10px] opacity-80">10:15 AM</span>
                                <CheckCheck size={12} className="opacity-80"/>
                            </div>
                        </div>
                        {/* AR Attachment */}
                        <div className="bg-[#021422] rounded-xl p-3 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-gray-900 transition-colors">
                             <Scan size={20} className="text-white"/>
                             <span className="text-xs font-bold text-white uppercase tracking-wider">AR CAPTURE ATTACHED</span>
                        </div>
                    </div>

                    {/* Message 2 (Incoming System/Reply) */}
                    <div className="flex flex-col items-start gap-2">
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                             <p className="text-sm font-medium text-[#021422]">Viewing your AR Snapshot now. You're right</p>
                             <div className="text-right mt-1">
                                 <span className="text-[10px] text-gray-400">10:30 AM</span>
                             </div>
                        </div>
                         {/* AR Reply Attachment */}
                        <div className="bg-[#021422] rounded-xl p-3 flex items-center gap-4 shadow-sm cursor-pointer hover:bg-gray-900 transition-colors">
                             <Scan size={20} className="text-white"/>
                             <span className="text-xs font-bold text-white uppercase tracking-wider">AR REPLY ATTACHED</span>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                     <p className="text-sm font-medium text-[#021422] mb-3">Regarding: WP-205</p>
                     <div className="relative">
                         <input 
                            type="text" 
                            placeholder="Type Reply...."
                            className="w-full pl-6 pr-24 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#0070D4]"
                         />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                             <button className="text-gray-400 hover:text-[#021422] transition-colors">
                                 <Paperclip size={20} />
                             </button>
                             <button className="text-gray-400 hover:text-[#0070D4] transition-colors">
                                 <Send size={20} />
                             </button>
                         </div>
                     </div>
                </div>
           </div>
      </div>
    </div>
  );
}
