"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Search, SlidersHorizontal, Loader2, Star, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LawyerListingContainer({ lawyersData, filter }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(filter.search || "");
  const [maxFee, setMaxFee] = useState(Number(filter.maxFee) || 1000);
  const [page, setPage] = useState(Number(filter.page) || 1);

  const lawyersList = lawyersData?.lawyers || [];
  const totalItems = Number(lawyersData?.total) || 0;
  
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

  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchTerm.trim() !== "") sp.set("search", searchTerm);
    if (maxFee < 1000) sp.set("maxFee", maxFee.toString());
    if (page > 1) sp.set("page", page.toString());

    const query = sp.toString();
    const path = query ? `?${query}` : "/browse-lawyer";
    
    startTransition(() => {
      router.push(path, { scroll: false });
    });
  }, [searchTerm, maxFee, page, router]);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-slate-50/50 text-slate-900 font-sans">
      
      <header className="text-center max-w-2xl mx-auto mb-12 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
          Browse Verified Lawyers
        </h1>
        <p className="text-sm text-slate-500 mt-2 tracking-wide font-medium">
          Find top-tier legal professionals tailored to your requirements
        </p>
      </header>

      {/* 🎛️ Premium Filter Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Search */}
        <div className="relative">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-2">
            <Search size={13} className="text-indigo-500" /> Search Lawyer
          </label>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => { 
              setSearchTerm(e.target.value); 
              setPage(1); 
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
          />
        </div>

        {/* Hourly Rate Slider */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <SlidersHorizontal size={13} className="text-indigo-500" /> Max Hourly Rate
            </label>
            <span className="text-slate-900 font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">${maxFee}/hr</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={maxFee}
            onChange={(e) => {
              setMaxFee(Number(e.target.value));
              setPage(1);
            }}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>
      </div>

      {/* Info & Status Bar */}
      <div className="mb-6 flex items-center justify-between text-xs text-slate-400 font-bold tracking-wider uppercase">
        <div>Showing {startItem}-{endItem} of {totalItems} professionals</div>
        {isPending && (
          <div className="flex items-center gap-1.5 text-indigo-600 normal-case font-medium">
            <Loader2 size={14} className="animate-spin" /> Fetching updates...
          </div>
        )}
      </div>

      {/* 🌟 Luxury Grid Layout */}
      {lawyersList.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {lawyersList.map((lawyer, index) => (
              <div 
                key={lawyer._id || index} 
                className="group relative bg-white rounded-2xl border border-slate-100 p-4 shadow-md shadow-slate-100/40 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:border-slate-200/80 transition-all duration-300"
              >
                {/* 🌟 Premium Ribbon Badge (Like the image reference) */}
                {lawyer.isBusy && (
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden z-20 pointer-events-none">
                    <div className="absolute top-3 -right-5 w-20 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] font-black uppercase tracking-widest text-center py-1 rotate-45 shadow-sm border-b border-white/20">
                      Busy
                    </div>
                  </div>
                )}

                <div>
                  {/* Photo Container */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                    <img 
                      src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"} 
                      alt={lawyer.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Body Info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                      <Briefcase size={10} className="text-slate-400" />
                      <span>{lawyer.specialization}</span>
                    </div>
                    
                    <h2 className="text-base font-bold text-slate-900 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {lawyer.name}
                    </h2>
                    
                    <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2">
                      {lawyer.bio || "Experienced legal counsel providing bespoke representation and corporate advisory services."}
                    </p>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-5 pt-3.5 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase font-extrabold tracking-widest">Hourly Rate</span>
                    <span className="font-black text-xl text-slate-900">${lawyer.fee || lawyer.Fee || 0}</span>
                  </div>
                  
                  <Link href={`/browse-lawyer/${lawyer._id}`} className="w-full sm:w-auto">
                    <button className="w-full bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 hover:bg-indigo-600 shadow-sm group-hover:shadow">
                      Details <ArrowRight size={12} className="opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Pagination Controls */}
          <div className="w-full flex justify-center mt-12">
            <div className="flex gap-1.5 bg-white p-2 rounded-xl shadow-md border border-slate-100">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer transition-colors"
              >
                Prev
              </button>
              {getPageNumbers().map((p, i) => (
                p === "ellipsis" ? (
                  <span key={`ell-${i}`} className="px-2.5 py-1.5 text-slate-400 text-xs font-bold">...</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      p === page ? "bg-slate-900 text-white shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                )
              ))}
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-24 border border-dashed border-slate-200 rounded-[32px] bg-white text-slate-400 font-semibold text-sm tracking-wide">
          No legal professionals found matching your specific filters.
        </div>
      )}
    </div>
  );
}