"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Shield, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; 

export default function FeaturedLawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/featured-lawyers")
      .then((res) => res.json())
      .then((data) => {
        setLawyers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading featured lawyers:", err);
        setLoading(false);
      });
  }, []);

  // 🌟 Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }, 
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-sm text-gray-500 italic bg-white">
        Loading top legal experts...
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* 🌟 অ্যানিমেটেড সেকশন হেডার */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block">Premium Counsel</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Featured Legal Experts</h2>
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Meet our top-rated, verified attorneys available for immediate consultation and strategic case defense.
            </p>
          </div>
          <Link 
            href="/browse-lawyer" 
            className="inline-flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all group shrink-0 shadow-sm"
          >
            See All Lawyers <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 🌟 অ্যানিমেটেড লইয়ার কার্ড গ্রিড */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {lawyers.map((lawyer) => (
            <motion.div 
              key={lawyer._id} 
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between space-y-6 group relative"
            >
              <div className="flex gap-4">
                {/* প্রোফাইল ইমেজ */}
                <div className="relative shrink-0">
                  <img 
                    src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a"} 
                    alt={lawyer.name} 
                    className="w-20 h-20 rounded-2xl object-cover border border-gray-100"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-lg shadow-sm border border-white">
                    <Shield size={12} />
                  </span>
                </div>

                {/* ইনফো */}
                <div className="space-y-1 pt-0.5">
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-indigo-600 transition-colors">{lawyer.name}</h3>
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">{lawyer.specialization}</p>
                  
                  <div className="flex items-center gap-3 pt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Star size={13} className="fill-amber-500" /> 4.9
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={13} className="text-gray-400" /> 8+ Yrs Exp
                    </span>
                  </div>
                </div>
              </div>

              {/* বায়ো */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {lawyer.bio || "Dedicated legal professional offering strategic advice and premium dispute resolution consultancy for corporate and individual defense."}
              </p>

              {/* ফি এবং বাটন */}
              <div className="flex items-center justify-between border-t pt-4 border-gray-100">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hourly Fee</p>
                  <p className="text-xl font-black text-gray-900">${lawyer.fee || 150} <span className="text-xs text-gray-400 font-normal">/hr</span></p>
                </div>
                <Link 
                  href={`/browse-lawyer/${lawyer._id}`}
                  className="bg-gray-900 hover:bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                >
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}