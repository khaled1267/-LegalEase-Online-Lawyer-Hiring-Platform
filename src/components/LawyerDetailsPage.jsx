"use client";

import { useState, useEffect } from "react";
import { User, Clock, Check, Star, Shield, Briefcase, Award, MessageSquare, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LawyerDetails({ lawyer, clientEmail, clientName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]); // ডাটাবেজ এবং রিয়েল-টাইম কমেন্ট লিস্ট

  // console.log("Client Side Received - Email:", clientEmail, "Name:", clientName, "Lawyer:", lawyer);

  // 🔄 💡 নতুন সংযোজন: পেজ লোড হওয়ার সাথে সাথে এই লইয়ারের সব পুরোনো কমেন্ট ডাটাবেজ থেকে আনা
  useEffect(() => {
    if (!lawyer?._id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?lawyerId=${lawyer._id}`)
      .then((res) => res.json())
      .then((data) => {
        // নতুন কমেন্টগুলো যেন লিস্টের ওপরে দেখায়, তাই reverse করে সেট করা হলো
        setComments(data.reverse());
      })
      .catch((err) => console.error("Error fetching lawyer comments:", err));
  }, [lawyer?._id]);

  // ১. কনফার্ম হায়ার হ্যান্ডলার
  const handleConfirmHire = async (e) => {
    const{data:token}=await authClient.token();
  console.log(token);

    e.preventDefault();
    e.stopPropagation();

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
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${token.token}`,
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
      alert("Network Error: Could not connect to backend server!");
    }
  };

  // ২. কমেন্ট সাবমিট হ্যান্ডলার
  const handleCommentSubmit = async (e) => {
    const{data:token}=await authClient.token();
  console.log(token);
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
        headers: { "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
         },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        alert("🎉 Comment posted successfully!");
        // নতুন কমেন্টটি সাথে সাথে লিস্টের সবার ওপরে পুশ হবে
        setComments([commentData, ...comments]);
        setCommentInput("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-12">
      {/* 🌟 প্রিমিয়াম কভার/হিরো হেডার সেকশন */}
      <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row gap-8 items-center relative z-10">
          
          {/* প্রোফাইল ইমেজ উইথ ব্যাজ */}
          <div className="relative shrink-0">
            <img 
              src={lawyer.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a"} 
              alt={lawyer.name} 
              className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white/10 shadow-2xl"
            />
            <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl shadow-md border-2 border-slate-950">
              <Shield size={16} />
            </span>
          </div>

          {/* লইয়ারের বেসিক ডিটেইলস */}
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

      {/* 🏛️ মেইন কন্টেন্ট গ্রিড লেআউট */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        
        {/* বামপাশের কলাম (Details + Comments) */}
        <div className="md:col-span-2 space-y-6">
          
          {/* প্রফেশনাল পরিচিতি ও বায়ো */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b pb-3 border-gray-50">
              About Professional Services
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              Providing top-tier legal advice, dispute resolutions, and litigation strategies. Dedicated to fighting for individual and corporate client rights with transparent consultancy and unparalleled dedication.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Corporate & Criminal Defense</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Family & Property Law Claims</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> Free Preliminary Case Review</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-indigo-600" /> High Success & Settlement Rate</div>
            </div>
          </div>

          {/* 💬 কমেন্ট ও রিভিউ ইনপুট ফর্ম */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" /> Clients Feedback & Reviews
            </h3>
            
            <form onSubmit={handleCommentSubmit} className="relative">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                rows="3"
                className="w-full p-4 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-gray-50/50 placeholder:text-gray-400"
                placeholder="Share your secure evaluation or feedback about this lawyer..."
                required
              />
              <button
                type="submit"
                className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-2 rounded-xl transition-all shadow-md flex items-center gap-1 text-xs"
              >
                <Send size={14} />
              </button>
            </form>

            {/* ডাটাবেজ থেকে লোড হওয়া এবং লাইভ কমেন্টগুলো দেখানোর মেইন বক্স */}
            {comments.length > 0 ? (
              <div className="pt-4 space-y-3 border-t border-gray-50">
                {comments.map((c, idx) => (
                  <div key={idx} className="p-3.5 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-gray-800 flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px]">
                          {c.userName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        {c.userName || "Anonymous Client"}
                      </span>
                      <span className="text-gray-400">{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 pl-6">{c.commentText || c.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic pt-2">No reviews yet. Be the first to leave feedback!</p>
            )}
          </div>

        </div>

        {/* ডানপাশের স্টিকি সাইডবার কার্ড (Booking Action Panel) */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm md:sticky md:top-6 space-y-5">
            <div className="flex justify-between items-center border-b pb-4 border-gray-50">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Consultation Fee</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">
                  ${lawyer.fee} <span className="text-xs text-gray-400 font-normal">/ Hour</span>
                </h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-100">
                Available Now
              </span>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-indigo-600" />
                <span>Response Time: <strong>Within 1 hour</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield size={16} className="text-indigo-600" />
                <span>Secured through: <strong>LegalEase Shield</strong></span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/10 text-center text-sm"
            >
              Request Professional Hiring
            </button>
          </div>
        </div>

      </div>

      {/* 🛠️ প্রিমিয়াম কনফার্মেশন মোডাল (Modal UI) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
              <User size={22} />
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900">Confirm Hiring Engagement</h3>
              <p className="text-sm text-gray-500 mt-1">
                You are appointing <strong>{lawyer.name}</strong> as your certified attorney. A contract initiation proposal will be securely transferred.
              </p>
            </div>

            <div className="p-4 bg-gray-50/80 rounded-2xl space-y-2 text-sm border border-gray-100">
              <div className="flex justify-between">
                <span className="text-gray-500">Hourly Legal Charge:</span>
                <span className="font-extrabold text-gray-900">${lawyer.fee}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Platform Handling Fee:</span>
                <span className="text-emerald-600 font-semibold">Waived (Free)</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-3 rounded-xl text-xs transition-all border"
              >
                Cancel Process
              </button>
              <button
                type="button"
                onClick={handleConfirmHire}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/10"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}