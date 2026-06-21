"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight, DollarSign, Briefcase, Info } from "lucide-react";
import Link from "next/link";

export default function MainLawyersPage({ fetchLawyers }) {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (fetchLawyers && Array.isArray(fetchLawyers)) {
      setLawyers(fetchLawyers);
    }
    // একটু রিয়েলস্টিক ফিল দেওয়ার জন্য ৩০০ মিলিগ্রাম ডিলে করা হয়েছে
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [fetchLawyers]);

  // 1. প্রফেশনাল স্কেলেটন লোডার কম্পোনেন্ট
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map((n) => (
        <div key={n} className="bg-white rounded-2xl p-5 border border-gray-100 space-y-4 shadow-sm animate-pulse">
          <div className="w-full h-56 bg-gray-200 rounded-xl" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-10 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 selection:bg-indigo-500 selection:text-white">
      
      {/* হেডার সেকশন */}
      <header className="text-center max-w-2xl mx-auto mb-16 mt-6">
        <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase px-3 py-1 bg-indigo-50 rounded-full">
          Expert Legal Counsel
        </span>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-3 mb-4 bg-gradient-to-r from-gray-900 via-indigo-950 to-indigo-900 bg-clip-text text-transparent">
          Browse Verified Lawyers
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Connect with top-tier legal professionals tailored to your specific case requirements.
        </p>
      </header>

      {/* মেইন কন্টেন্ট এলাকা */}
      {loading ? (
        <SkeletonLoader />
      ) : lawyers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm max-w-md mx-auto">
          <Info className="mx-auto text-gray-400 mb-4" size={40} />
          <p className="text-gray-500 text-lg font-medium">No lawyers found matching your criteria.</p>
        </div>
      ) : (
        /* ২. কার্ড গ্রিড উইথ ফ্রেমার মোশন অ্যানিমেশন */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* ইমেজ কন্টেইনার এবং জুমিং ইফেক্ট */}
                <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"}
                    alt={lawyer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* ডামি রেটিং ব্যাজ */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-amber-600">
                    <Star size={14} fill="currentColor" />
                    4.9
                  </div>
                </div>

                {/* টেক্সট ও ডিটেইলস */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                      <Briefcase size={12} />
                      {lawyer.specialization}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                    {lawyer.name}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {lawyer.bio || "No biography provided. Click view details to learn more about their legal expertise and past cases."}
                  </p>
                </div>
              </div>

              {/* কার্ড ফুটার (ফি এবং অ্যাকশন বাটন) */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Hourly Rate</span>
                  <span className="font-extrabold text-2xl text-gray-900 flex items-center -ml-0.5">
                    <DollarSign size={18} className="text-indigo-600" />
                    {lawyer.fee}
                  </span>
                </div>

               <Link href={`/browse-lawyer/${lawyer._id}`}>
  <button className="relative inline-flex items-center gap-1.5 bg-gray-950 text-white font-medium text-sm px-4 py-2.5 rounded-xl hover:bg-indigo-600 shadow-md hover:shadow-indigo-200 transition-all duration-300 group-hover:translate-x-0">
    View Details
    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </button>
</Link>
              </div>

            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}