"use client";

import { useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  Phone,
  Settings,
  CalendarCheck2,
  SquareMousePointer,
  MessageSquare,
  X,
  Send,
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isSpeaking?: boolean;
}

export default function MeetingPage() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState("00:45:12");
  const [showChatModal, setShowChatModal] = useState(false);

  const participants: Participant[] = [
    {
      id: "1",
      name: "James Doe",
      role: "Street_Eng",
      avatar: "👨‍💼",
      isSpeaking: true,
    },
    {
      id: "2",
      name: "John Smith",
      role: "Site Supervisor",
      avatar: "👨‍💼",
      isSpeaking: false,
    },
    {
      id: "3",
      name: "Alice (Client Rep.)",
      role: "Client",
      avatar: "👩‍💼",
      isSpeaking: false,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🏢</div>
          <h1 className="text-2xl font-bold text-slate-900">Project Room</h1>
        </div>
        <div className="text-lg font-semibold text-slate-900">
          Meeting Time: {elapsedTime}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 gap-6 p-6 overflow-hidden">
        {/* Left Panel - Participants & Agenda */}
        <div className="w-120 space-y-6 overflow-y-auto">
          {/* Control Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-lg hover:bg-slate-800 transition">
              <CalendarCheck2 size={16} />
              <span className="text-sm font-medium">Agenda Item</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
              <SquareMousePointer size={16} />
              <span className="text-sm font-medium">Meeting Action</span>
            </button>
          </div>

          {/* Participants & Agenda Section */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-6">
              PARTICIPANTS & AGENDA
            </h2>

            {/* Participants */}
            <div className="space-y-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="bg-white rounded-xl overflow-hidden border-2 border-slate-900"
                >
                  <div className="aspect-video bg-gray-300 flex items-center justify-center text-5xl">
                    {participant.avatar}
                  </div>
                  <div className="p-4 bg-white">
                    <p className="font-semibold text-slate-900">
                      {participant.name}
                    </p>
                    <p className="text-xs text-gray-600">{participant.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Shared Workspace */}
        <div className="flex-1 flex flex-col space-y-6">
          {/* Control Buttons Top Right */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowChatModal(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition text-sm font-medium"
            >
              <MessageSquare size={16} />
              <span>Meeting Chat and actions</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
              <Settings size={16} />
              <span>Controls</span>
            </button>
          </div>

          {/* Shared Workspace */}
          <div className="flex-1 bg-white rounded-2xl p-8 overflow-hidden flex flex-col">
            <h2 className="text-lg font-bold text-white bg-slate-900 p-4 rounded-lg mb-6 text-center">
              SHARED WORKSPACE
            </h2>

            {/* Workspace Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800">
                <span>📊</span>
                Dashboard
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium text-sm hover:bg-gray-100 rounded-lg">
                <span>🎨</span>
                3D Model
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium text-sm hover:bg-gray-100 rounded-lg">
                <span>📡</span>
                Live Site Feed
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl bg-blue-50">
              <div className="text-center">
                <div className="text-6xl mb-4">📷</div>
                <p className="text-gray-600 text-sm mb-1">LIVE AR FEED</p>
                <p className="text-gray-500 text-xs">
                  Block A, 6th Floor (Left's View)
                </p>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-center text-xs text-gray-500 mt-4">
              Live Video Showing Rebar, Formwork Mockups, Visualize
            </p>
          </div>
        </div>
      </div>
      {/* Chat Modal (opens when Meeting Chat button clicked) */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[880px] max-w-[96%] h-[86vh] overflow-hidden relative border-2 border-blue-500">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-sm font-bold tracking-wide">
                MESSAGE CHAT &amp; ACTIONS
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">...</button>
              </div>
            </div>

            {/* Messages area */}
            <div className="px-8 py-6 h-[calc(86vh-170px)] overflow-y-auto">
              <div className="flex justify-end">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[60%]">
                  John, can you pan to the left? I want to.......
                </div>
                <div className="text-xs text-gray-400 ml-3">10:15 AM</div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none inline-block">
                  @Jane started on Live Feed
                </div>
                <div className="text-xs text-gray-400 ml-3 inline-block">
                  10:30 AM
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none inline-block">
                  @Action Item 'Verify spacing' created
                </div>
                <div className="text-xs text-gray-400 ml-3 inline-block">
                  10:30 AM
                </div>
              </div>
            </div>

            {/* Input area (sticky bottom) */}
            <div className="absolute left-0 right-0 bottom-0 px-6 py-4 border-t bg-white flex items-center gap-3">
              <input
                type="text"
                placeholder="Type Reply...."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none"
              />
              <button className="p-3 rounded-full text-gray-600 hover:bg-gray-100">
                <span className="text-xl">@</span>
              </button>
              <button className="p-3 bg-transparent text-gray-600 hover:bg-gray-100 rounded-full">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-center gap-6">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-4 rounded-full transition ${
            isMicOn
              ? "bg-slate-900 text-white hover:bg-slate-800"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-4 rounded-full transition ${
            isVideoOn
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button className="p-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
          <Share2 size={24} />
        </button>

        <button className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition ml-4">
          <Phone size={24} />
        </button>
      </div>
    </main>
  );
}
