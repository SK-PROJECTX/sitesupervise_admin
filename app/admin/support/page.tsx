"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  user: string;
  status: "closed" | "resolved" | "pending";
  userEmail?: string;
  company?: string;
  opened?: string;
  lastUpdate?: string;
  priority?: string;
  category?: string;
  userMessage?: string;
  supportResponse?: string;
  attachments?: string[];
}

export default function SupportCenterPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const tickets: Ticket[] = [
    {
      id: "TKT-9642",
      subject: "AR tool working",
      user: "Mike J",
      status: "closed",
      userEmail: "Mike Johnson",
      company: "ABC Construction",
      opened: "10:35 AM",
      lastUpdate: "10:30 AM",
      priority: "High",
      category: "Technical Issue",
      userMessage: "AR glasses not connecting to task WIP-208. Error code 42?",
      supportResponse:
        "Checking device status.... Device HI2-204 offline since 09:45. Please try restarting. If persists, we'll dispatch replacement",
      attachments: ["error_screenshot.png", "device_log.txt"],
    },
    {
      id: "TKT-1641",
      subject: "Slow AI responses",
      user: "Sarah C",
      status: "closed",
    },
    {
      id: "TKT-9640",
      subject: "Billing question",
      user: "Client XYZ",
      status: "closed",
    },
    {
      id: "TKT-1628",
      subject: "Login issue",
      user: "Alex R",
      status: "resolved",
    },
    {
      id: "TKT-9638",
      subject: "Feature request",
      user: "Jane S",
      status: "pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "closed":
        return "bg-slate-900 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-slate-900">Support Center</h1>
        <div className="text-sm font-medium text-slate-700">
          Unresolved: 12 Tickets
        </div>
      </div>

      <div className="px-8 py-12">
        {/* Ticket Management Section */}
        <section id="ticket-management" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6">
            TICKET MANAGEMENT
          </h2>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    PRI
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    TICKET ID
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    SUBJECT ID
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    USER
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedTicket(ticket)}
                    className="border-b border-gray-200 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="px-8 py-4">
                      <span className="text-xs text-gray-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-700 font-medium">
                      {ticket.id}
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-700">
                      {ticket.subject}
                    </td>
                    <td className="px-8 py-4 text-sm text-slate-700">
                      {ticket.user}
                    </td>
                    <td className="px-8 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          ticket.status,
                        )}`}
                      >
                        {ticket.status === "closed"
                          ? "Closed"
                          : ticket.status === "resolved"
                            ? "Resolved"
                            : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Support Analytics Section */}
        <section id="support-analytics">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6">
            SUPPORT ANALYTICS
          </h2>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
            {/* Support Metrics */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-slate-900">📊</span>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  SUPPORT METRICS
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Avg response time: 43 minutes</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Resolution rate: —</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>User satisfaction: 4.8/5</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>
                    Common issue: AR connectivity (2%) Login (2%) AI (1%)
                  </span>
                </li>
              </ul>
            </div>

            {/* AI Support Metrics */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-6">
                AI SUPPORT METRICS
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                  Enable AI Auto-responder
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                  Train AI on Tickets
                </button>
                <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                  View AI Suggestions for Client Issues
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
              Create New Ticket
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              View or Consignment Issues
            </button>
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
              Generate Support Report
            </button>
          </div>
        </section>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-slate-900">📋</span>
                <h2 className="text-xl font-bold text-slate-900">
                  TICKET {selectedTicket.id}:{" "}
                  {selectedTicket.subject.toUpperCase()}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 space-y-6">
              {/* User & Company Info */}
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">User:</span>{" "}
                  {selectedTicket.userEmail}{" "}
                  <span className="text-gray-400">|</span>{" "}
                  <span className="font-medium">Company:</span>{" "}
                  {selectedTicket.company}
                </p>
              </div>

              {/* Metadata */}
              <div>
                <p className="text-sm text-gray-700 mb-2">
                  Opened: {selectedTicket.opened}{" "}
                  <span className="text-gray-400">|</span> Last Update:{" "}
                  {selectedTicket.lastUpdate}
                </p>
                <p className="text-sm text-gray-700">
                  Priority:{" "}
                  <span className="font-medium">{selectedTicket.priority}</span>{" "}
                  <span className="text-gray-400">|</span> Category:{" "}
                  <span className="font-medium">{selectedTicket.category}</span>
                </p>
              </div>

              {/* User Message */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                  USER MESSAGE:
                </h3>
                <p className="text-sm text-gray-700">
                  "{selectedTicket.userMessage}"
                </p>
              </div>

              {/* Support Response */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                  SUPPORT RESPONSE:
                </h3>
                <p className="text-sm text-gray-700">
                  "{selectedTicket.supportResponse}"
                </p>
              </div>

              {/* Attachments */}
              {selectedTicket.attachments &&
                selectedTicket.attachments.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
                      ATTACHMENTS:
                    </h3>
                    <ul className="space-y-1">
                      {selectedTicket.attachments.map((attachment, idx) => (
                        <li key={idx} className="text-sm text-gray-700">
                          • {attachment}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Actions */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                  ACTIONS:
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                    Reply
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    Call User
                  </button>
                  <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                    Escalate
                  </button>
                  <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                    Resolve
                  </button>
                  <button className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    Attach File
                  </button>
                  <button className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
