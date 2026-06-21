"use client";

import React from "react";
import Link from "next/link"; // 👈 useRouter এর বদলে সেফ Link ব্যবহার
import { motion } from "framer-motion";
import { Scale, Building2, Users, ShieldAlert, FileText, Landmark } from "lucide-react";

export default function LegalCategories() {
  const categories = [
    { name: "Criminal Law", count: "45+ Lawyers", icon: <ShieldAlert size={24} />, color: "bg-rose-50 text-rose-600 border-rose-100/70" },
    { name: "Corporate Law", count: "32+ Lawyers", icon: <Building2 size={24} />, color: "bg-indigo-50 text-indigo-600 border-indigo-100/70" },
    { name: "Family Law", count: "28+ Lawyers", icon: <Users size={24} />, color: "bg-emerald-50 text-emerald-600 border-emerald-100/70" },
    { name: "Civil Litigation", count: "50+ Lawyers", icon: <Scale size={24} />, color: "bg-amber-50 text-amber-600 border-amber-100/70" },
    { name: "Property Law", count: "18+ Lawyers", icon: <Landmark size={24} />, color: "bg-purple-50 text-purple-600 border-purple-100/70" },
    { name: "Intellectual Property", count: "12+ Lawyers", icon: <FileText size={24} />, color: "bg-sky-50 text-sky-600 border-sky-100/70" },
  ];

  return (
    <section className="py-20 bg-gray-50/40 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Practice Areas</span>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explore Legal Categories</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">Find specialized legal support by browsing through our targeted legal practice fields.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat, i) => (
            // 🔗 মোশন ডিভকে লিংক দিয়ে মুড়িয়ে দেওয়া হয়েছে, যা ক্লিক করলেই ফিল্টার পেজে নিয়ে যাবে
            <Link 
              href={`/browse-lawyer?category=${encodeURIComponent(cat.name)}`} 
              key={i}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-xl border ${cat.color} group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors text-base">{cat.name}</h3>
                    <p className="text-xs text-gray-400 font-medium">{cat.count}</p>
                  </div>
                </div>
                
                <div className="text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

      </div>
    </section>
  );
}