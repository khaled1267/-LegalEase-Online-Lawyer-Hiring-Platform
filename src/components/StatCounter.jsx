"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, Scale, ShieldCheck, Award } from "lucide-react";

const stats = [
  { id: 1, count: "15K+", label: "Happy Clients", icon: <Users size={24} />, desc: "Trusted by individuals & enterprises worldwide." },
  { id: 2, count: "500+", label: "Verified Attorneys", icon: <Scale size={24} />, desc: "Strictly vetted bar-registered professionals." },
  { id: 3, count: "99.2%", label: "Success Rate", icon: <ShieldCheck size={24} />, desc: "Proven track record in complex legal cases." },
  { id: 4, count: "10+", label: "Years Excellence", icon: <Award size={24} />, desc: "Providing seamless digital legal solutions." },
];

const StatCounter = () => {
  return (
    <section className="relative w-full bg-[#030712] py-16 border-b border-slate-900 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center group"
            >
              {/* আইকন অ্যানিমেশন */}
              <div className="p-3 bg-slate-900 text-amber-500 rounded-2xl border border-slate-800/60 mb-4 group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-300">
                {stat.icon}
              </div>
              
              {/* বড় প্রফেশনাল নাম্বার */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-1">
                {stat.count}
              </h2>
              
              {/* লেবেল */}
              <p className="text-xs sm:text-sm font-bold text-amber-500 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              
              {/* ছোট ডেসক্রিপশন */}
              <p className="text-slate-400 text-xs max-w-[180px] leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatCounter;