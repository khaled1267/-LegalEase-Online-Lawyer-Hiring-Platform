"use client";

import { useState, useEffect } from "react";
import { Briefcase, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function UserDashboardHome({ clientEmail }) {
    // console.log("clientEmail", clientEmail);
  const [stats, setStats] = useState({
    totalHires: 0,
    pendingHires: 0,
    totalSpent: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientEmail) {
      setLoading(true);
      
      // ১. hirings কালেকশন থেকে ডাটা ফেচ করা
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/hirings?email=${clientEmail}`)
        .then((res) => res.json())
        .then((hiringData) => {
          // টোটাল হায়ার এবং পেন্ডিং ক্যালকুলেট করা
          const total = hiringData.length;
          const pending = hiringData.filter(req => req.status === "Pending").length;
          
          // পেইড পেমেন্টের টোটাল অ্যামাউন্ট যোগ করা
          const spent = hiringData
            .filter(req => req.paymentStatus === "paid")
            .reduce((sum, req) => sum + parseFloat(req.fee || 0), 0);

          setStats({
            totalHires: total,
            pendingHires: pending,
            totalSpent: spent
          });

          // শেষ ৩টি রিকোয়েস্ট রিসেন্ট লিস্টে দেখানোর জন্য রাখা
          setRecentRequests(hiringData.slice(0, 3));
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching home dashboard stats:", err);
          setLoading(false);
        });
    }
  }, [clientEmail]);

  if (!clientEmail) {
    return <div className="p-8 text-gray-500 animate-pulse">Checking session...</div>;
  }

  if (loading) {
    return <div className="p-8 text-gray-500 animate-pulse">Loading dashboard summary...</div>;
  }

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      {/* হেডার / গ্রিটিংস সেকশন */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back! 👋  {clientEmail}</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your consultations, track requests, and handle payments smoothly.</p>
        </div>
        <Link 
          href="/browse-lawyers" 
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-5 py-3 rounded-2xl transition-all shadow-md active:scale-95 self-start"
        >
          Find New Lawyer <ArrowRight size={16} />
        </Link>
      </div>

      {/* 📊 ১. Stats Cards Section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        
        {/* কার্ড ১: মোট হায়ার */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Lawyers Hired</p>
            <p className="text-3xl font-black text-gray-900">{stats.totalHires}</p>
            <p className="text-xs text-gray-400">Total requests submitted</p>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
            <Briefcase size={22} />
          </div>
        </div>

        {/* কার্ড ২: পেন্ডিং রিকোয়েস্ট */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Awaiting Response</p>
            <p className="text-3xl font-black text-gray-900">{stats.pendingHires}</p>
            <p className="text-xs text-amber-600 font-medium animate-pulse">Pending lawyer approval</p>
          </div>
          <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock size={22} />
          </div>
        </div>

        {/* কার্ড ৩: মোট খরচ */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Money Paid</p>
            <p className="text-3xl font-black text-indigo-600">${stats.totalSpent}</p>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <ShieldCheck size={12} /> Securely transacted
            </p>
          </div>
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <DollarSign size={22} />
          </div>
        </div>

      </div>

      {/* 🕒 ২. Recent Activities Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">Recent Hiring Activity</h2>
          <Link href="/dashboard/user/hiring-history" className="text-xs font-bold text-indigo-600 hover:underline">
            View All History
          </Link>
        </div>

        {recentRequests.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No recent activity found. Click Find New Lawyer to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50/50">
                  <th className="py-3 px-4">Lawyer Name</th>
                  <th className="py-3 px-4">Specialization</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900">{req.lawyerName || req.serviceName}</td>
                    <td className="py-3 px-4 text-gray-500">{req.specialization || "General"}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        req.status === "Accepted" ? "bg-emerald-50 text-emerald-700" :
                        req.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      <span className={req.paymentStatus === "paid" ? "text-emerald-600" : "text-gray-400"}>
                        {req.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

