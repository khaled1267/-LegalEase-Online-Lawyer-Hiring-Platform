"use client";

import { useState, useEffect } from "react";
import { Check, X, Clock, User, Mail } from "lucide-react";

export default function LawyerHiringHistory({ loggedInLawyerEmail }) {
  console.log("Client received email:", loggedInLawyerEmail);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // ১. ব্যাকএন্ড থেকে শুধুমাত্র এই নির্দিষ্ট লইয়ারের ইমেইল দিয়ে ডাটা ফিল্টার করা
  useEffect(() => {
    if (!loggedInLawyerEmail) {
      return; 
    }

    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/hirings/lawyer?email=${loggedInLawyerEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hiring history:", err);
        setLoading(false);
      });
  }, [loggedInLawyerEmail]);

  // 🛠️ ২. এই ফাংশনটি মিসিং ছিল - স্ট্যাটাস (Accept / Reject) আপডেট করার হ্যান্ডলার
  const handleStatusUpdate = async (id, newStatus) => {
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hirings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        // রিয়েল-টাইমে স্টেট আপডেট করে UI রিফ্রেশ করা
        setRequests(requests.map(req => req._id === id ? { ...req, status: newStatus } : req));
        alert(`Request successfully ${newStatus}!`);
      } else {
        alert("Failed to update status on server.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!loggedInLawyerEmail) {
    return <div className="p-8 text-gray-500 animate-pulse">Loading secure session...</div>;
  }

  if (loading) {
    return <div className="p-8 text-gray-500">Loading client requests...</div>;
  }

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Lawyer Hiring History</h1>
        <p className="text-sm text-gray-500">Manage clients who requested to hire your professional services.</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border text-gray-500">
          No hiring requests found yet for ({loggedInLawyerEmail}).
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Client Info</th>
                <th className="p-4">Service</th>
                <th className="p-4">Fee / Hour</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" /> {request.clientName}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {request.clientEmail}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-indigo-600">{request.serviceName}</td>
                  <td className="p-4 font-bold text-gray-900">${request.fee}</td>
                  <td className="p-4 text-gray-500">{request.date}</td>
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
                  <td className="p-4 text-right">
                    {request.status === "Pending" ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(request._id, "Accepted")}
                          className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(request._id, "Rejected")}
                          className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No Action Needed</span>
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