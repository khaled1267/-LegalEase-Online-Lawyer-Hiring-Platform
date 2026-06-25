"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, MessageSquare, ShieldAlert } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Search & Filter",
    desc: "Select your required legal practice category and filter attorneys based on location, rating, or experience.",
    icon: <Search size={22} />,
  },
  {
    step: "02",
    title: "Compare Profiles",
    desc: "Review absolute historical success rates, real payment-verified client reviews, and transparent pricing structures.",
    icon: <UserCheck size={22} />,
  },
  {
    step: "03",
    title: "Hire & Consult",
    desc: "Instantly book a slot, start a corporate-grade encrypted chat or video consultation, and resolve your matter safely.",
    icon: <MessageSquare size={22} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative w-full bg-[#070b14] py-24 border-t border-b border-slate-900/50 z-20">
      {/* ব্যাকগ্রাউন্ডে খুবই হালকা গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* সেকশন হেডার অ্যানিমেশন */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-md text-[10px] font-bold uppercase tracking-widest">
            Workflow Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 uppercase">
            How The Platform Works
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Getting premium corporate legal counsel is now simple, secure, and fully digitalized in three streamlined steps.
          </p>
        </motion.div>

        {/* স্টেপ কার্ডস গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: "easeOut" }}
              className="bg-[#0c1220]/80 border border-slate-800/60 p-7 rounded-2xl relative group hover:border-amber-500/20 transition-all duration-300"
            >
              {/* স্টেপ নাম্বার বাবল (যেমন: 01, 02) */}
              <div className="absolute -top-4 right-6 text-5xl font-black text-slate-800/40 group-hover:text-amber-500/10 select-none font-mono transition-colors duration-300">
                {item.step}
              </div>

              {/* আইকন বক্স */}
              <div className="w-12 h-12 flex items-center justify-center bg-slate-900 text-amber-500 rounded-xl border border-slate-800 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                {item.icon}
              </div>

              {/* টাইটেল ও ডেসক্রিপশন */}
              <h3 className="text-base font-bold text-slate-200 uppercase tracking-wide mb-3 group-hover:text-amber-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;