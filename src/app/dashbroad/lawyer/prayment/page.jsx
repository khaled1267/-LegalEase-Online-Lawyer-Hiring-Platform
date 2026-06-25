"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar, DollarSign, User } from "lucide-react";

export default function LawyerPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      const { data: session } = await authClient.getSession();
      if (!session?.user?.email) return;

      try {
        // 💡 সেম এপিআই লইয়ার ড্যাশবোর্ডেও কল করা হচ্ছে
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-transactions`);
        const allData = await res.json();
        
        // 🔍 ফ্রন্টএন্ডে লইয়ারের ইমেইল দিয়ে ফিল্টার করা হলো
        const lawyerSpecificPayments = allData.filter(
          (payment) => payment.lawyerEmail === session.user.email
        );
        
        setPayments(lawyerSpecificPayments);
      } catch (err) {
        console.error("Error fetching lawyer payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) {
    return <div className="text-center p-10 font-medium text-gray-500">Loading earnings...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <DollarSign className="text-emerald-600" /> Earnings History
      </h2>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-sm font-semibold uppercase bg-gray-50/70">
                <th className="p-4">Client Name</th>
                <th className="p-4">Client Email</th>
                <th className="p-4">Amount Received</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{payment.clientName}</td>
                  <td className="p-4 text-gray-500">{payment.clientEmail}</td>
                  <td className="p-4 font-bold text-emerald-600">+${payment.fee || payment.amount}</td>
                  <td className="p-4 flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} /> {payment.date}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                      Received
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-400 italic">No earnings history found yet.</p>
      )}
    </div>
  );
}