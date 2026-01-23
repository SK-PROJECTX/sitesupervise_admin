"use client";

import { ArrowUpRight } from "lucide-react";

const revenueCards = [
  {
    title: "MRR (Monthly)",
    value: "$84,500",
    badge: "↑ 12%",
    badgeClass: "bg-green-500",
    cardClass: "bg-slate-900 text-white",
    textClass: "text-white",
    badgeTextClass: "text-white",
    corner: "tl",
  },
  {
    title: "ARR (Annual)",
    value: "$1,014,000",
    badge: "↑ 8%",
    badgeClass: "bg-green-500",
    cardClass: "bg-white",
    textClass: "text-slate-900",
    badgeTextClass: "text-white",
    corner: "tr",
  },
  {
    title: "Collected this month",
    value: "$78,200",
    badge: "↓ 3%",
    badgeClass: "bg-green-500",
    cardClass: "bg-white",
    textClass: "text-slate-900",
    badgeTextClass: "text-white",
    corner: "bl",
  },
  {
    title: "Outstanding Invoice",
    value: "$12,450",
    badge: "↑ 2%",
    badgeClass: "bg-green-500",
    cardClass: "bg-white",
    textClass: "text-slate-900",
    badgeTextClass: "text-white",
    corner: "br",
  },
];

const subscriptions = [
  {
    icon: "🏢",
    company: "ABC Corp",
    plan: "Enterprise",
    users: "42/50",
    status: "active",
  },
  {
    icon: "🏗️",
    company: "Studio DGT",
    plan: "Professional",
    users: "8/25",
    status: "active",
  },
  {
    icon: "🛣️",
    company: "Field Highway",
    plan: "Professional",
    users: "12/25",
    status: "inactive",
  },
  {
    icon: "🏛️",
    company: "Port Authority",
    plan: "Enterprise",
    users: "28/50",
    status: "active",
  },
  {
    icon: "🏢",
    company: "Div Corp",
    plan: "Basic",
    users: "8/10",
    status: "inactive",
  },
];

export default function BillingPage() {
  const cornerClassMap: Record<string, string> = {
    tl: "rounded-3xl rounded-tl-none",
    tr: "rounded-3xl rounded-tr-none",
    bl: "rounded-3xl rounded-bl-none",
    br: "rounded-3xl rounded-br-none",
  };

  return (
    <main className="min-h-screen bg-[#EAEAEA]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Billing & Subscription Management
        </h1>
        <div className="text-sm font-medium text-slate-700">
          Current Period: Oct 2023
        </div>
      </div>

      <div className="px-8 py-12">
        {/* Revenue Dashboard Section */}
        <section id="revenue-dashboard" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6">
            REVENUE DASHBOARD
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {revenueCards.map((card) => (
              <div
                key={card.title}
                className={`
                  ${card.cardClass}
                  ${cornerClassMap[card.corner]}
                  p-8 rounded-3xl shadow-sm border ${
                    card.cardClass.includes("bg-slate-900")
                      ? "border-slate-800"
                      : "border-gray-200"
                  }
                  flex flex-col justify-between
                `}
              >
                <div className="flex justify-between items-start mb-6">
                  <span
                    className={`text-sm font-medium ${
                      card.cardClass.includes("bg-slate-900")
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {card.title}
                  </span>
                  <button
                    className={`p-2 rounded-full ${
                      card.cardClass.includes("bg-slate-900")
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <ArrowUpRight
                      size={18}
                      className={
                        card.cardClass.includes("bg-slate-900")
                          ? "text-gray-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                </div>

                <div className={`text-4xl font-bold mb-4 ${card.textClass}`}>
                  {card.value}
                </div>

                <div
                  className={`inline-block ${card.badgeClass} ${card.badgeTextClass} text-xs px-3 py-1 rounded-full font-medium w-fit`}
                >
                  {card.badge}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription Overview Section */}
        <section id="subscription-overview" className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6">
            SUBSCRIPTION OVERVIEW
          </h2>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    COMPANY
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    PLAN
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    USERS
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{sub.icon}</span>
                        <span className="text-slate-900 font-medium">
                          {sub.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {sub.plan}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {sub.users}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          sub.status === "active"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {sub.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Subscription Plans Section */}
        <section id="subscription-plans" className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">
                SUBSCRIPTION PLANS
              </h2>
            </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">

            {/* Basic Plan */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                BASIC ($35/month):
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 ml-4">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>10 users</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>100GB storage</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Basic AI features</span>
                </li>
              </ul>
            </div>

            {/* Professional Plan */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                PROFESSIONAL ($600/month):
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 ml-4">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>25 users</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>500GB storage</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Advanced AI + AI</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>Priority + support</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                ENTERPRISE ($2,480/month):
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 ml-4">
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>50 users</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>2TB storage</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>All features + customization</span>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-3">•</span>
                  <span>24/7 dedicated support</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                Edit Plans
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                Create Custom Plan
              </button>
            </div>
          </div>
        </section>

        {/* Invoice Management Section */}
        <section id="invoice-management">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-wide mb-6">
            INVOICE MANAGEMENT
          </h2>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Recent Invoices */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-slate-900">📊</span>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  RECENT INVOICES
                </h3>
              </div>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-0 py-3 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                      INVOICE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                      COMPANY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                      AMOUNT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                      DUE DATE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-900 uppercase tracking-wide">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-0 py-4 text-sm text-slate-700">
                      INV-1042
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      ABC Corset
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">$2,495</td>
                    <td className="px-4 py-4 text-sm text-slate-700">15 Nov</td>
                    <td className="px-4 py-4 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                        Paid
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-0 py-4 text-sm text-slate-700">
                      INV-1041
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      Studio DGT
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">$890</td>
                    <td className="px-4 py-4 text-sm text-slate-700">10 Nov</td>
                    <td className="px-4 py-4 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                        Due
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition">
                    <td className="px-0 py-4 text-sm text-slate-700">
                      INV-1040
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      DivCorp
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">$295</td>
                    <td className="px-4 py-4 text-sm text-slate-700">05 Nov</td>
                    <td className="px-4 py-4 text-sm">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                        Overdue
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-6 flex gap-4 bg-gray-50">
              <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                Run Revenue Report
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                Forcast Next Quarter
              </button>
              <button className="px-8 py-3 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition">
                Manage Discounts
              </button>
            </div>
          </div>
        </section>

        
      </div>
    </main>
  );
}
