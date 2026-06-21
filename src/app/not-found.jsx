"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Scale, Building2, ShieldAlert } from "lucide-react";

export default function NotFoundPage() {
  // 🌟 অ্যানিমেশন কনফিগারেশন (Variants)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // একটির পর একটি উপাদান আসবে
      },
    },
  };

  return (
    <motion.main 
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gray-950 p-6 relative overflow-hidden"
    >
      {/* 🌟 ব্যাকগ্রাউন্ড অ্যানিমেটেড গ্লো এবং আইকন (প্রিমিয়াম লুকের জন্য) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[250px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* ভাসমান আইন আইকন (অ্যানিমেটেড) */}
      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[15%] text-indigo-400"
      >
        <Building2 size={32} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[15%] text-rose-400"
      >
        <ShieldAlert size={36} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 right-[25%] text-gray-700"
      >
        <Scale size={28} />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="text-center space-y-12 relative z-10"
      >
        {/* 🌟 অ্যানিমেটেড 404 নাম্বার (Glitch Effect/Floating) */}
        <motion.h1 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-[120px] md:text-[180px] font-black tracking-tight leading-none text-white drop-shadow-[0_15px_30px_rgba(79,70,229,0.3)]"
        >
          <span className="text-gray-700">4</span>
          <motion.span
            animate={{ color: ["#fff", "#f43f5e", "#fff"] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5, repeatType: "mirror" }}
          >0</motion.span>
          <span className="text-gray-700">4</span>
        </motion.h1>

        {/* 🌟 অ্যানিমেটেড স্লোগান ও মেসেজ (Fade-in and Move Up) */}
        <motion.div variants={fadeInUp} className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            OBJECTION! <br />
            <span className="text-rose-500">Page Cannot Be Found</span>
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            It seems you have wandered off the legal path. This URL may have been dismissed, overruled, or is simply not admissible in our database.
          </p>
        </motion.div>

        {/* 🌟 অ্যানিমেটেড CTA বাটন */}
        <motion.div variants={fadeInUp} className="pt-6">
          <Link 
            href="/browse-lawyer" 
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-200 text-gray-950 font-extrabold px-8 py-4 rounded-full text-sm shadow-xl transition-all shadow-white/10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BROWSE LEGAL COUNSEL
          </Link>
          <p className="text-xs text-gray-700 mt-4">
            OR, TRY <Link href="/" className="text-gray-500 hover:text-white font-bold underline">BACK TO HOME</Link>
          </p>
        </motion.div>

      </motion.div>
    </motion.main>
  );
}