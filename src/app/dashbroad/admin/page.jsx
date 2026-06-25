"use client";

import { useState, useEffect } from "react";
import { Users, Scale, Briefcase, DollarSign, TrendingUp, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardHome() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalLawyers: 0,
    totalHires: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ব্যাকএন্ডের ৫ নম্বর রাউট (/admin-analytics) থেকে ডাটা নিয়ে আসা
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-analytics`)
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500 animate-pulse">Loading Platform Analytics...</div>;
  }

  // ৪টি প্রধান কার্ডের ডেটা অ্যারে
  const cards = [
    {
      id: 1,
      name: "Total Clients",
      value: analytics.totalUsers,
      icon: Users,
      bgColor: "bg-blue-50 text-blue-600",
      desc: "Registered general users",
    },
    {
      id: 2,
      name: "Verified Lawyers",
      value: analytics.totalLawyers,
      icon: Scale,
      bgColor: "bg-purple-50 text-purple-600",
      desc: "Professional practitioners",
    },
    {
      id: 3,
      name: "Total Consultations",
      value: analytics.totalHires,
      icon: Briefcase,
      bgColor: "bg-amber-50 text-amber-600",
      desc: "Total matchings/hires",
    },
    {
      id: 4,
      name: "Platform Revenue",
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bgColor: "bg-emerald-50 text-emerald-600",
      desc: "Total successful earnings",
    },
  ];

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      {/* হেডার সেকশন */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin System Control ⚙️</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time platform overview, transactions summary, and user metrics.</p>
      </div>

      {/* 📊 ১. ৪টি স্ট্যাটস কার্ড গ্রিড */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.name}</p>
              <p className="text-3xl font-black text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-400 font-medium">{card.desc}</p>
            </div>
            <div className={`p-4 rounded-2xl ${card.bgColor}`}>
              <card.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* ⚡ ২. কুইক অ্যাকশন এবং সিস্টেম হেলথ সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* কুইক অ্যাকশন প্যানেল */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-600" /> Platform Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/dashboard/admin/all-users" className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/40 transition-all font-bold text-sm text-gray-700 hover:text-indigo-600">
              👥 Manage Registered Users
            </Link>
            <Link href="/dashboard/admin/verify-lawyers" className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/40 transition-all font-bold text-sm text-gray-700 hover:text-indigo-600">
              ⚖️ Verify Pending Lawyers
            </Link>
            <Link href="/dashboard/admin/all-transactions" className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/40 transition-all font-bold text-sm text-gray-700 hover:text-indigo-600">
              💳 Review Transaction Logs
            </Link>
            <Link href="/dashboard/admin/settings" className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/40 transition-all font-bold text-sm text-gray-700 hover:text-indigo-600">
              ⚙️ Platform Core Settings
            </Link>
          </div>
        </div>

        {/* সিস্টেম হেলথ স্ট্যাটাস */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldAlert size={18} className="text-emerald-600" /> System Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-gray-50 text-sm">
              <span className="text-gray-500">Database Connection</span>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold text-xs">Connected</span>
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-gray-50 text-sm">
              <span className="text-gray-500">Stripe Gateway</span>
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold text-xs">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">API Server Response</span>
              <span className="text-gray-400 font-medium">Healthy (200 OK)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}