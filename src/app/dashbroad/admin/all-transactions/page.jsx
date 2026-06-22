import { fetchAdminPayments } from '@/lib/api/adminprement';
import React from 'react';

const AdminPaymentsPage = async () => {
    const data = await fetchAdminPayments();
    const payments = data?.payments || [];

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">User Payment History</h1>
                <p className="text-sm text-gray-500">View and manage all successful client payments</p>
            </div>

            {payments.length > 0 ? (
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900 text-white text-sm font-semibold">
                                <th className="p-4">Transaction / Session ID</th>
                                <th className="p-4">Client Email</th>
                                <th className="p-4">Lawyer Name</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {payments.map((payment, index) => (
                                <tr key={payment._id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-mono text-xs text-indigo-600">
                                        {payment.sessionId || payment.session_id || "N/A"}
                                    </td>
                                    <td className="p-4 font-medium">{payment.clientEmail || payment.userEmail || "User"}</td>
                                    <td className="p-4">{payment.lawyerName || "Lawyer"}</td>
                                    <td className="p-4 font-bold text-gray-900">
                                        ${payment.amount || payment.price || 0}
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-200">
                                            {payment.status || "Paid"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-20 bg-white border border-dashed rounded-xl text-gray-400">
                    No payment history found in database.
                </div>
            )}
        </div>
    );
};

export default AdminPaymentsPage;