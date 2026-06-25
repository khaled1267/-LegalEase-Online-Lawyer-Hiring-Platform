"use client";

import React from "react";
import { motion } from "framer-motion";

export default function GlobalLoading() {
  // Skeleton কার্ডের জন্য লুপ চালানোর অ্যারে
  const skeletonCards = [1, 2, 3];

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center mt-44 p-6 space-y-12">
      
      {/* 🌀 ১. প্রিমিয়াম গ্লোবাল স্পিনার সেকশন */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          {/* বাইরের ঘুরতে থাকা রিং */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-4 border-gray-200 border-t-indigo-600"
          />
          {/* ভেতরের বিপরীত দিকে ঘুরতে থাকা ছোট রিং */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-rose-500opacity-80"
          />
        </div>
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-xs font-bold text-gray-400 uppercase tracking-widest"
        >
          Securing Legal Connection...
        </motion.p>
      </div>

      {/* 💀 ২. স্কেলিটন বা কঙ্কাল লোডার গ্রিড (পেইজ কন্টেন্ট আসার আগের রূপ) */}
      <div className="w-full max-w-6xl mx-auto space-y-8 opacity-70">
        {/* কঙ্কাল হেডার */}
        <div className="space-y-3 max-w-md">
          <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-8 w-64 bg-gray-200 rounded-xl animate-pulse" />
          <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* ৩টি কঙ্কাল কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skeletonCards.map((card) => (
            <div
              key={card}
              className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-sm"
            >
              {/* ইমেজ ও নাম এর কঙ্কাল */}
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0 animate-pulse" />
                <div className="space-y-2.5 w-full pt-1">
                  <div className="h-5 w-3/4 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-6 w-1/3 bg-gray-100 rounded-full animate-pulse" />
                </div>
              </div>

              {/* বায়ো বা ডেসক্রিপশন টেক্সটের কঙ্কাল */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded-md animate-pulse" />
                <div className="h-3 w-full bg-gray-100 rounded-md animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-100 rounded-md animate-pulse" />
              </div>

              {/* নিচের ফি ও বাটনের কঙ্কাল */}
              <div className="flex items-center justify-between border-t pt-4 border-gray-50">
                <div className="space-y-1.5">
                  <div className="h-2 w-12 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse" />
                </div>
                <div className="h-9 w-24 bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}