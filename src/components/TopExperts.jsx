"use client";

import { motion } from "framer-motion";
import { Award, UserCheck, Flame } from "lucide-react";

export default function TopExperts() {
  // রিকোয়ারমেন্ট অনুযায়ী ৩ জন টপ লইয়ারের ডাটা (সবচেয়ে বেশি হায়ার হওয়া)
  const experts = [
    {
      id: 1,
      name: "Barrister Asif Rahman",
      title: "Senior Corporate Litigator",
      hires: "140+ Successful Hires",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    },
    {
      id: 2,
      name: "Advocate Farzana Yasmin",
      title: "Top Family Law Expert",
      hires: "125+ Successful Hires",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    },
    {
      id: 3,
      name: "Dr. Kamrul Hassan",
      title: "Criminal Defense Specialist",
      hires: "110+ Successful Hires",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* সেকশন হেডার */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">
            <Flame size={12} className="fill-amber-500" /> Most Demanded
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Top Legal Experts</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">The most frequently hired and highly trusted attorneys on our platform this month.</p>
        </div>

        {/* ৩ জন লইয়ারের গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex items-center gap-4 shadow-sm relative group hover:bg-white hover:border-indigo-100 transition-all"
            >
              {/* অ্যাভাটার / ইমেজ */}
              <div className="relative shrink-0">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white ring-4 ring-gray-100 group-hover:ring-indigo-50 transition-all"
                />
                <span className="absolute -top-1 -left-1 bg-amber-500 text-white p-1 rounded-full shadow border border-white">
                  <Award size={10} />
                </span>
              </div>

              {/* নাম এবং টপ হায়ার ইনফো */}
              <div className="space-y-0.5">
                <h3 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{expert.name}</h3>
                <p className="text-[11px] text-gray-400 font-medium">{expert.title}</p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold pt-1">
                  <UserCheck size={12} /> {expert.hires}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}