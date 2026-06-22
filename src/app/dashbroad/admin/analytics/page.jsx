"use client";
import { useState, useEffect } from "react";
import { Users, Briefcase, Handshake, DollarSign } from "lucide-react";

export default function AnalyticsOverview() {
  const [stats, setStats] = useState({ totalUsers: 0, totalLawyers: 0, totalHires: 0, totalRevenue: 0 });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-analytics`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const cardData = [
    { title: "Total Users", value: stats.totalUsers, icon: <Users size={24} />, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Total Lawyers", value: stats.totalLawyers, icon: <Briefcase size={24} />, color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Total Hirings", value: stats.totalHires, icon: <Handshake size={24} />, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Total Revenue", value: `$${stats.totalRevenue}`, icon: <DollarSign size={24} />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-sm text-gray-500">Real-time platform statistics summary.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardData.map((card, i) => (
          <div key={i} className={`p-6 bg-white border rounded-2xl shadow-sm flex items-center justify-between`}>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-3xl font-black text-gray-900">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl border ${card.color}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}