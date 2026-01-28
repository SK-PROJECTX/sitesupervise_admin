"use client";

export default function SupportCenterPage() {
  const tickets = [
    {
      id: "TKT-9642",
      subject: "AR tool working",
      user: "Mike J",
      status: "closed",
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
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
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
    </main>
  );
}
