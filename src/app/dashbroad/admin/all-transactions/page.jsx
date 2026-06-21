"use client";
import { useState, useEffect } from "react";
import { DollarSign, Calendar, Hash } from "lucide-react";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold border-b">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">User/Lawyer Email</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {transactions.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50/50">
                <td className="p-4 font-mono text-xs text-indigo-600 flex items-center gap-1">
                  <Hash size={12} /> {t.transactionId || t._id}
                </td>
                <td className="p-4 text-gray-600">{t.userEmail || t.clientEmail}</td>
                <td className="p-4 font-bold text-emerald-600">${t.amount}</td>
                <td className="p-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {t.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}