"use client";

import { useState, useEffect } from "react";
import { Clock, User, Mail, DollarSign, CheckCircle } from "lucide-react";

export default function UserHiringHistoryTable({ clientEmail }) {
  console.log("User email received in table:", clientEmail);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে শুধুমাত্র এই ক্লায়েন্টের পাঠানো রিকোয়েস্টগুলো লোড করা
  useEffect(() => {
    if (!clientEmail) return;

    setLoading(true);
    fetch(`http://localhost:5000/hirings?email=${clientEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user hiring history:", err);
        setLoading(false);
      });
  }, [clientEmail]);

  // 💳 ডায়নামিক স্ট্রাইপ চেকআউট হ্যান্ডলার
  const handleCheckout = async (request) => {
    try {
      // ✅ পোর্ট ৫০০০ সহ আপনার এক্সপ্রেস ব্যাকএন্ডের সঠিক এপিআই রুট
const res = await fetch('http://localhost:5000/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'legal_fee',               // মডিউল আইডেন্টিফায়ার
          eventId: request._id,            // হায়ার রিকোয়েস্টের ইউনিক ID
          eventTitle: request.serviceName || "Lawyer Consultation",
          quantity: 1,                     // লইয়ার হায়ার সাধারণত ১ সেশন হিসেবে কাউন্ট হয়
          totalTicketPrice: parseFloat(request.fee), // মেইন অ্যামাউন্ট
          email: clientEmail               // অ্যাটেন্ডি ইমেইল হিসেবে ইউজারের ইমেইল
        }),
      });

      const { url, error } = await res.json();

      if (error) { 
        console.error("Stripe Error:", error); 
        alert("Payment Session Failed!");
        return; 
      }
      
      if (url) window.location.assign(url); // 🚀 স্ট্রাইপ হোস্টেড চেকআউটে রিডাইরেক্ট

    } catch (err) {
      console.error("Checkout Request Error:", err);
    }
  };

  if (!clientEmail) {
    return <div className="p-8 text-gray-500 animate-pulse">Checking user session...</div>;
  }

  if (loading) {
    return <div className="p-8 text-gray-500">Loading your hiring requests...</div>;
  }

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">My Hiring History</h1>
        <p className="text-sm text-gray-500">Track the status of your hired lawyers and make payments.</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border text-gray-500">
          You have not sent any hiring requests yet.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Lawyer Info</th>
                <th className="p-4">Specialisation</th>
                <th className="p-4">Fee / Hour</th>
                <th className="p-4">Hiring Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* লইয়ার ইনফো */}
                  <td className="p-4">
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" /> {request.serviceName || "Lawyer Name"}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {request.lawyerEmail}
                    </div>
                  </td>

                  {/* স্পেশালাইজেশন */}
                  <td className="p-4 text-gray-600 font-medium">{request.specialization}</td>

                  {/* ফি */}
                  <td className="p-4 font-bold text-gray-900">${request.fee}</td>

                  {/* তারিখ */}
                  <td className="p-4 text-gray-500">{request.date}</td>

                  {/* স্ট্যাটাস ব্যাজ */}
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      request.status === "Accepted" ? "bg-emerald-50 text-emerald-700" :
                      request.status === "Rejected" ? "bg-red-50 text-red-700" :
                      "bg-amber-50 text-amber-700 animate-pulse"
                    }`}>
                      {request.status === "Pending" && <Clock size={12} />}
                      {request.status}
                    </span>
                  </td>

                  {/* 🌟 কন্ডিশনাল পেমেন্ট অ্যাকশন বাটন সেকশন */}
                  <td className="p-4 text-right">
                    {request.paymentStatus === "paid" ? (
                      // ১. পেমেন্ট অলরেডি সাকসেসফুল হলে বাটন লক থাকবে
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-200">
                        <CheckCircle size={14} /> Paid
                      </span>
                    ) : request.status === "Accepted" ? (
                      // ২. লইয়ার একসেপ্ট করেছে কিন্তু পেমেন্ট বাকি, তাই চেকআউট বাটন একটিভ
                      <button
                        onClick={() => handleCheckout(request)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center gap-1"
                      >
                        <DollarSign size={13} /> Checkout
                      </button>
                    ) : request.status === "Pending" ? (
                      <span className="text-xs text-amber-600 font-medium bg-amber-50/50 px-3 py-1.5 rounded-xl border border-amber-100">
                        Awaiting Action
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 italic bg-gray-100 px-3 py-1.5 rounded-xl">
                        Cancelled
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}