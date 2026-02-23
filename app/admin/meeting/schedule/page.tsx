"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Calendar as CalendarIcon,
  Globe,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ScheduleMeetingPage() {
  const router = useRouter();
  const [step, setStep] = useState<"date" | "form" | "success">("date");
  const [selectedDate, setSelectedDate] = useState<{
    day: number;
    month: number;
    year: number;
  } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Calendar State
  const [viewDate, setViewDate] = useState(new Date(2026, 2)); // Default to March 2026
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [showYearSelect, setShowYearSelect] = useState(false);

  const monthName = viewDate.toLocaleString("default", { month: "long" });
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPastDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    return date < today;
  };

  const calendarData = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
    // Adjust for Monday start: (day + 6) % 7
    const startingOffset = (firstDayOfMonth + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { startingOffset, daysInMonth };
  }, [year, month]);

  const changeMonth = (offset: number) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  const selectMonth = (m: number) => {
    setViewDate(new Date(year, m, 1));
    setShowMonthSelect(false);
  };

  const selectYear = (y: number) => {
    setViewDate(new Date(y, month, 1));
    setShowYearSelect(false);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2026 + i);

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
    setTimeout(() => {
      router.push("/admin/meeting");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100"
      >
        {/* Left Side: Info */}
        <div className="md:w-1/3 bg-[#021422] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0070D4] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

          <div className="space-y-8 relative z-10">
            <Link
              href="/admin/meeting"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <ChevronLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="font-semibold text-sm">Back to Dashboard</span>
            </Link>

            <div className="space-y-4">
              <div className="w-16 h-1 bg-[#0070D4] rounded-full"></div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Project Review Session
              </h1>
              <p className="text-gray-400 font-medium">
                SiteSupervise Admin Suite
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Clock size={20} className="text-[#0070D4]" />
                </div>
                <span className="font-semibold italic font-mono">
                  30 - 45 Min
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Video size={20} className="text-[#0070D4]" />
                </div>
                <span className="font-semibold">
                  Web Conferencing (Live AR)
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Globe size={20} className="text-[#0070D4]" />
                </div>
                <span className="font-semibold">Central European Time</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-medium mt-12 relative z-10">
            Powered by SiteSupervise Scheduling Engine
          </p>
        </div>

        {/* Right Side: Step Content */}
        <div className="flex-1 p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            {step === "date" && (
              <motion.div
                key="date"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-[#021422]">
                    Select Date & Time
                  </h2>
                  <div className="flex items-center gap-1 relative">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#021422]"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-1 px-2">
                      <button
                        onClick={() => {
                          setShowMonthSelect(!showMonthSelect);
                          setShowYearSelect(false);
                        }}
                        className="font-bold text-[#021422] hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors text-sm"
                      >
                        {monthName}
                      </button>
                      <button
                        onClick={() => {
                          setShowYearSelect(!showYearSelect);
                          setShowMonthSelect(false);
                        }}
                        className="font-bold text-[#021422] hover:bg-gray-100 px-2 py-1 rounded-lg transition-colors text-sm"
                      >
                        {year}
                      </button>
                    </div>

                    <button
                      onClick={() => changeMonth(1)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#021422]"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Month Select Dropdown */}
                    <AnimatePresence>
                      {showMonthSelect && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 grid grid-cols-3 gap-1 z-50 w-64"
                        >
                          {months.map((m, i) => (
                            <button
                              key={m}
                              onClick={() => selectMonth(i)}
                              className={`p-2 rounded-xl text-xs font-bold transition-colors ${month === i ? "bg-[#0070D4] text-white" : "hover:bg-gray-50 text-[#021422]"}`}
                            >
                              {m.substring(0, 3)}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Year Select Dropdown */}
                    <AnimatePresence>
                      {showYearSelect && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-12 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 flex flex-col gap-1 z-50 w-32 max-h-48 overflow-y-auto"
                        >
                          {years.map((y) => (
                            <button
                              key={y}
                              onClick={() => selectYear(y)}
                              className={`p-2 rounded-xl text-xs font-bold transition-colors ${year === y ? "bg-[#0070D4] text-white" : "hover:bg-gray-50 text-[#021422]"}`}
                            >
                              {y}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Calendar View */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-gray-400 uppercase text-center mb-2">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {/* Empty slots for first week */}
                      {Array.from({ length: calendarData.startingOffset }).map(
                        (_, i) => (
                          <div key={`empty-${i}`} className="aspect-square" />
                        ),
                      )}

                      {/* Days of month */}
                      {Array.from(
                        { length: calendarData.daysInMonth },
                        (_, i) => i + 1,
                      ).map((d) => {
                        const past = isPastDate(d, month, year);
                        return (
                          <button
                            key={d}
                            onClick={() =>
                              setSelectedDate({ day: d, month, year })
                            }
                            disabled={past}
                            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all relative
                               ${
                                 selectedDate?.day === d &&
                                 selectedDate?.month === month &&
                                 selectedDate?.year === year
                                   ? "bg-[#0070D4] text-white shadow-lg shadow-blue-200"
                                   : past
                                     ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                                     : "bg-gray-50 text-[#021422] hover:bg-[#021422] hover:text-white"
                               }`}
                          >
                            {d}
                            {past && (
                              <div className="absolute inset-x-2 h-[1px] bg-gray-300 -rotate-45" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-500 mb-4">
                      {selectedDate
                        ? `Available Times for ${new Date(selectedDate.year, selectedDate.month, selectedDate.day).toLocaleString("default", { month: "long" })} ${selectedDate.day}`
                        : "Select a date to see availability"}
                    </p>
                    <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-hide">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            if (!selectedDate) return;
                            setSelectedTime(t);
                            setStep("form");
                          }}
                          disabled={!selectedDate}
                          className={`py-3 px-4 rounded-xl border-2 border-transparent font-bold text-sm transition-all text-center
                             ${
                               !selectedDate
                                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                 : "bg-gray-50 text-[#021422] hover:border-[#0070D4] hover:bg-white"
                             }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-4 mb-2">
                  <button
                    onClick={() => setStep("date")}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                  >
                    <ChevronLeft className="text-[#021422]" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-[#021422]">
                      Enter Details
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                      {new Date(
                        selectedDate!.year,
                        selectedDate!.month,
                        selectedDate!.day,
                      ).toLocaleString("default", { month: "long" })}{" "}
                      {selectedDate!.day}, {selectedDate!.year} at{" "}
                      {selectedTime}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSchedule} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Supervisor"
                      className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-[#0070D4] outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. abdullah@sitesupervise.com"
                      className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-[#0070D4] outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                      Meeting Purpose
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Any specific items for the AR walkthrough?"
                      className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:bg-white focus:border-[#0070D4] outline-none transition-all font-medium resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-5 bg-[#0070D4] text-white rounded-2xl font-bold text-lg hover:bg-[#005bb5] transition-all shadow-xl shadow-blue-200"
                  >
                    Schedule Meeting
                  </button>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2
                    size={64}
                    className="text-green-500 drop-shadow-sm"
                  />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-[#021422]">
                    Meeting Confirmed!
                  </h2>
                  <p className="max-w-[300px] text-gray-400 font-medium">
                    You are scheduled for{" "}
                    {new Date(
                      selectedDate!.year,
                      selectedDate!.month,
                      selectedDate!.day,
                    ).toLocaleString("default", { month: "long" })}{" "}
                    {selectedDate!.day} at {selectedTime}. A calendar invitation
                    has been sent.
                  </p>
                </div>
                <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl font-bold text-[#021422] text-sm md:text-base border border-gray-100">
                  <CalendarIcon className="text-[#0070D4]" size={20} />
                  <span>Redirecting to Meeting Dashboard...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Floating UI Accents */}
      <div className="fixed bottom-8 right-8 flex gap-4 hidden md:flex">
        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 text-gray-300">
          <X size={20} />
        </div>
      </div>
    </div>
  );
}
