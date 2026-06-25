"use client";

import { useState, useEffect } from "react";
import { User, Clock, Check, Star, Shield, Briefcase, Award, MessageSquare, Send, RefreshCw } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LawyerDetails({ lawyer: initialLawyer, clientEmail, clientName }) {
  // প্রোপস থেকে আসা লইয়ার ডেটা স্টেটে সিঙ্ক করা
  const [lawyer, setLawyer] = useState(initialLawyer); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]); 
  const [statusLoading, setStatusLoading] = useState(false);

  // সার্ভার সাইড বা বাইরের কোনো অ্যাকশনে initialLawyer চেঞ্জ হলে ক্লায়েন্ট স্টেট আপডেট হবে
  useEffect(() => {
    setLawyer(initialLawyer);
  }, [initialLawyer]);

  // পুরোনো কমেন্ট ডাটাবেজ থেকে লোড করা
  useEffect(() => {
    if (!lawyer?._id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?lawyerId=${lawyer._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data.reverse());
        }
      })
      .catch((err) => console.error("Error fetching lawyer comments:", err));
  }, [lawyer?._id]);

  // 🌟 কেস-ইনসেনসিটিভ স্ট্যাটাস চেক (busy, Busy, available, Available সব হ্যান্ডেল করবে)
  const isLawyerBusy = lawyer?.status?.toLowerCase() === "busy";

  // স্ট্যাটাস ম্যানুয়ালি পরিবর্তন করার হ্যান্ডলার (Available <-> Busy)
  const toggleStatus = async () => {
    const { data: token } = await authClient.token();
    if (!token?.token) {
      alert("Please login first!");
      return;
    }

    setStatusLoading(true);
    // ব্যাকএন্ডে পাঠানোর জন্য প্রফেশনাল ক্যাপিটাল লেটার ফরম্যাট সেট করা হলো
    const newStatus = isLawyerBusy ? "Available" : "Busy";

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hirings/${hiringId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ 
    status: "Accepted", 
    lawyerEmail: currentLawyerEmail // 🔥 লয়ারের ইমেইলটি এখানে পাস করুন
  }),
});
      const responseData = await res.json();

      if (res.ok) {
        setLawyer((prev) => ({ ...prev, status: newStatus }));
        alert(`Status updated to ${newStatus}!`);
      } else {
        alert(`Failed to update status: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Network Error: Could not update status!");
    } finally {
      setStatusLoading(false);
    }
  };

  // কনফার্ম হায়ার হ্যান্ডলার
  const handleConfirmHire = async (e) => {
    const { data: token } = await authClient.token();
    e.preventDefault();

    if (isLawyerBusy) {
      alert("This lawyer is currently Busy and cannot accept new hirings.");
      return;
    }

    const lawyerEmailFix = lawyer.lawyerEmail || `${lawyer.name?.toLowerCase().replace(/\s+/g, ".")}@example.com`;

    const hiringData = {
      clientEmail: clientEmail,
      clientName: clientName,
      lawyerEmail: lawyerEmailFix,
      serviceName: lawyer.name,
      specialization: lawyer.specialization || "Legal Expert",
      fee: Number(lawyer.fee),
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hirings`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token || token}`,
        },
        body: JSON.stringify(hiringData),
      });

      const responseData = await res.json();

      if (res.ok || res.status === 201) {
        alert("🎉 Hiring request sent successfully!");
        setIsModalOpen(false);
      } else {
        alert(`Server Error: ${responseData.message || "Failed to submit"}`);
      }
    } catch (error) {
      console.error("Fetch Network Error:", error);
    }
  };

  // কমেন্ট সাবমিট হ্যান্ডলার
  const handleCommentSubmit = async (e) => {
    const { data: token } = await authClient.token();
    e.preventDefault();
    if (!commentInput.trim()) return;

    const commentData = {
      userEmail: clientEmail,
      userName: clientName,
      lawyerId: lawyer._id,
      lawyerName: lawyer.name,
      commentText: commentInput,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${token?.token || token}`,
        },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        alert("🎉 Comment posted successfully!");
        setComments([commentData, ...comments]);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-12">
      {/* 🌟 কভার/হিরো হেডার সেকশন */}
      <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-8 items-center relative z-10">
          
          {/* 🌟 ছবি এবং লাইভ পালস ব্যাজ কন্টেইনার */}
          <div className="relative shrink-0">
            <img 
              src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a"} 
              alt={lawyer.name} 
              className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white/10 shadow-2xl"
            />
            {/* 🌟 রিয়েল-টাইম ছবি ব্যাজ (Available বা Busy অনুযায়ী পালস অ্যানিমেশন করবে) */}
            {isLawyerBusy ? (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md animate-pulse">
                Busy
              </span>
            ) : (
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                Available
              </span>
            )}
            
            <span className={`absolute -bottom-2 -right-2 p-1.5 rounded-xl shadow-md border-2 border-slate-950 text-white transition-colors duration-300 ${isLawyerBusy ? 'bg-rose-500' : 'bg-emerald-500'}`}>
              <Shield size={16} />
            </span>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">
              <Award size={12} /> Verified Legal Counsel
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{lawyer.name}</h1>
            <p className="text-lg text-indigo-200 font-medium">{lawyer.specialization}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300 pt-2">
              <span className="flex items-center gap-1.5"><Star size={16} className="text-amber-400 fill-amber-400" /> 4.9 ({comments.length} Reviews)</span>
              <span className="flex items-center gap-1.5"><Briefcase size={16} className="text-indigo-400" /> 8+ Years Exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* 🏛️ মেইন কন্টেন্ট গ্রিড લેআউট */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-3 border-gray-50">
              About Professional Services
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {lawyer.bio || "Providing top-tier legal advice, dispute resolutions, and litigation strategies. Dedicated to fighting for individual and corporate client rights."}
            </p>
          </div>

          {/* Feedback section */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" /> Clients Feedback & Reviews
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="relative">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows="3"
                className="w-full p-4 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50/50"
                placeholder="Share your secure evaluation..."
                required
              />
              <button type="submit" className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-xl">
                <Send size={14} />
              </button>
            </form>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="pt-4 space-y-3 border-t">
                {comments.map((c, idx) => (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-xl border">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className="font-bold text-gray-800">{c.userName || "Anonymous"}</span>
                      <span>{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{c.commentText}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* সাইডবার কার্ড (Booking Action Panel) */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm md:sticky md:top-6 space-y-5">
            <div className="flex justify-between items-center border-b pb-4 border-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Consultation Fee</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  ${lawyer.fee} <span className="text-xs text-gray-400 font-normal">/ Hour</span>
                </h3>
              </div>
              
              {/* 💡 ডাইনামিক স্ট্যাটাস চেঞ্জার ব্যাজ */}
              <div className="flex flex-col items-end gap-1">
                <span className={`font-bold text-xs px-2.5 py-1 rounded-full border shadow-sm tracking-wide transition-colors duration-300 ${
                  isLawyerBusy 
                    ? "bg-rose-50 text-rose-700 border-rose-200" 
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                }`}>
                  {isLawyerBusy ? "Busy Currently" : "Available Now"}
                </span>

                <button 
                  onClick={toggleStatus}
                  disabled={statusLoading}
                  className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 disabled:opacity-50 mt-1.5 font-semibold"
                >
                  <RefreshCw size={10} className={statusLoading ? "animate-spin" : ""} />
                  Toggle Live Status
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-indigo-600" />
                <span>Response Time: <strong>{isLawyerBusy ? "Delayed" : "Within 1 hour"}</strong></span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isLawyerBusy} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-center text-sm"
            >
              {isLawyerBusy ? "Lawyer is Currently Busy" : "Request Professional Hiring"}
            </button>
          </div>
        </div>

      </div>

      {/* হয়ার কনফার্মেশন মোডাল */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 space-y-5 shadow-2xl border border-slate-100">
            <h3 className="text-xl font-bold text-gray-900">Confirm Hiring Engagement</h3>
            <p className="text-sm text-gray-500 leading-relaxed">You are appointing <strong className="text-slate-900">{lawyer.name}</strong> for professional legal counsel.</p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-50 hover:bg-slate-100 py-3 rounded-xl text-xs font-bold border text-slate-600 transition-colors">Cancel</button>
              <button onClick={handleConfirmHire} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs font-bold shadow-md shadow-indigo-600/10 transition-colors">Confirm Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}