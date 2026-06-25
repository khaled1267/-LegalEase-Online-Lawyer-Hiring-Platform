"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Calendar, DollarSign, User } from "lucide-react";

export default function UserPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      const { data: session } = await authClient.getSession();
      if (!session?.user?.email) return;

      try {
        // 💡 আপনার এক্সিস্টিং এপিআই কল করা হচ্ছে
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-transactions`);
        const allData = await res.json();
        
        // 🔍 ফ্রন্টএন্ডে ইউজারের ইমেইল দিয়ে ফিল্টার করা হলো
        const userSpecificPayments = allData.filter(
          (payment) => payment.clientEmail === session.user.email
        );
        
        setPayments(userSpecificPayments);
      } catch (err) {
        console.error("Error fetching user payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return <div className="text-center p-10 font-medium text-gray-500">Loading payment history...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <DollarSign className="text-indigo-600" /> My Payments
      </h2>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-sm font-semibold uppercase bg-gray-50/70">
                <th className="p-4">Lawyer Name</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-600">
              {payments.map((payment) => (
                <tr key={payment._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                    <User size={14} className="text-gray-400" /> {payment.lawyerName || payment.serviceName}
                  </td>
                  <td className="p-4 font-bold text-rose-600">-${payment.fee || payment.amount}</td>
                  <td className="p-4 flex items-center gap-1.5 text-gray-500">
                    <Calendar size={14} /> {payment.date}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-100">
                      {payment.status || "Paid"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-400 italic">No payments found.</p>
      )}
    </div>
  );
}