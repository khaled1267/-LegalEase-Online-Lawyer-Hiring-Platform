"use client";

import React, { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LawyerListingContainer({ lawyersData, filter }) {
  const [searchTerm, setSearchTerm] = useState(filter.search || "");
  const [page, setPage] = useState(Number(filter.page) || 1);
  const [dummyMaxFee, setDummyMaxFee] = useState(1000);

  const router = useRouter();
  
  const lawyersList = lawyersData?.lawyers || [];
  const totalItems = Number(lawyersData?.total) || 0;
  
  // 🌟 ব্যাকএন্ডের লিমিটের সাথে মিলিয়ে এখানে ৩ দেওয়া হয়েছে টেস্ট করার জন্য
  const itemsPerPage = 3; 
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2 && totalPages > 3) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  // 🌟 ইউআরএল সিঙ্ক এবং ফোর্স রিফ্রেশ লজিক
  useEffect(() => {
    const sp = new URLSearchParams();
    
    if (searchTerm.trim() !== "") {
      sp.set("search", searchTerm);
    }
    if (page > 1) {
      sp.set("page", page.toString());
    }

    const query = sp.toString();
    const path = query ? `?${query}` : "/browse-lawyer";
    
    router.push(path);
    
    // 🔥 এটি নিশ্চিত করবে যেন পেজ ২ বা নেক্সটে ক্লিক করলে ডাটা সাথে সাথে স্ক্রিনে চেঞ্জ হয়
    setTimeout(() => {
      router.refresh();
    }, 100);

  }, [searchTerm, page, router]);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      
      <header className="text-center max-w-2xl mx-auto mb-12 mt-6">
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent">
          Browse Verified Lawyers
        </h1>
      </header>

      {/* 🎛️ ফিল্টার প্যানেল */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* সার্চ */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Search size={14} /> Search Lawyer
          </label>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => { 
              setSearchTerm(e.target.value); 
              setPage(1); 
            }}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* স্লাইডার */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal size={14} /> Max Hourly Rate
            </label>
            <span className="text-indigo-600 font-extrabold text-sm bg-indigo-50 px-2 py-0.5 rounded-md">${dummyMaxFee}/hr</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={dummyMaxFee}
            onChange={(e) => setDummyMaxFee(Number(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* কাউন্টার */}
      <div className="mb-6 text-sm text-zinc-500 font-medium">
        Showing {startItem}-{endItem} of {totalItems} professionals
      </div>

      {/* কার্ড গ্রিড */}
      {lawyersList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {lawyersList.map((lawyer, index) => (
              <div key={lawyer._id || index} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-100">
                    <img 
                      src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"} 
                      alt={lawyer.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="mt-5 space-y-2.5">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-md inline-block">
                      {lawyer.specialization}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">{lawyer.name}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3">{lawyer.bio}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Hourly Rate</span>
                    <span className="font-extrabold text-2xl text-gray-900">${lawyer.fee || lawyer.Fee || 0}</span>
                  </div>
                  <Link href={`/browse-lawyer/${lawyer._id}`}>
                    <button className="bg-gray-950 text-white text-sm px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-all">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 🌟 কাস্টম প্যাগিনেশন কন্ট্রোল */}
          <div className="w-full flex justify-center mt-8">
            <div className="flex gap-2 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>
              {getPageNumbers().map((p, i) => (
                p === "ellipsis" ? (
                  <span key={`ell-${i}`} className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      p === page ? "bg-indigo-600 text-white" : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                )
              ))}
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed rounded-[32px] bg-white text-zinc-500">
          No lawyers match criteria.
        </div>
      )}
    </div>
  );
}