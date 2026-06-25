"use client";
import { useState, useEffect } from "react";
import { Users, Briefcase, Handshake, DollarSign } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

// কাস্টম প্রিমিয়াম টুলটিপ কম্পোনেন্ট
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 min-w-[150px]">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-black text-gray-900">
          {data.name === "Total Revenue" ? `$${data.value.toLocaleString()}` : data.value.toLocaleString()}
        </p>
        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
          Live Metrics
        </p>
      </div>
    );
  }
  return null;
};

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

  // চার্টের জন্য স্টেট থেকে ডাইনামিক ডাটা ফরমেট করা হচ্ছে
  const chartData = [
    { name: "Total Users", value: stats.totalUsers, color: "#3b82f6", gradientId: "blueGrad" },
    { name: "Total Lawyers", value: stats.totalLawyers, color: "#a855f7", gradientId: "purpleGrad" },
    { name: "Total Hirings", value: stats.totalHires, color: "#f59e0b", gradientId: "amberGrad" },
    { name: "Total Revenue", value: stats.totalRevenue, color: "#10b981", gradientId: "emeraldGrad" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* হেডার সেকশন */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-sm text-gray-500">Real-time platform statistics summary.</p>
      </div>

      {/* স্ট্যাটস কার্ড গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardData.map((card, i) => (
          <div key={i} className="p-6 bg-white border rounded-2xl shadow-sm flex items-center justify-between">
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

      {/* প্রিমিয়াম বার চার্ট সেকশন */}
      <div className="p-6 bg-white border rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Visual Growth Analysis</h3>
            <p className="text-xs text-gray-400">Data visualization mapped across core platform pillars.</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100">Live Backend Feed</span>
        </div>

        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={55}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.15}/>
                </linearGradient>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.15}/>
                </linearGradient>
                <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.15}/>
                </linearGradient>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.15}/>
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: "#9ca3af" }}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(243, 244, 246, 0.5)" }} />
              
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#${entry.gradientId})`}
                    style={{ transition: "all 0.3s ease" }}
                    className="hover:opacity-85 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};