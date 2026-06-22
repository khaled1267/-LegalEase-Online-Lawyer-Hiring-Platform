"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, MessageSquare, Calendar, User } from "lucide-react";

export default function UserCommentsTable({ clientEmail, clientName }) {
  const [comments, setComments] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔄 ডাটাবেজ থেকে এই ইউজারের করা সব কমেন্ট লোড করা
  useEffect(() => {
    if (!clientEmail) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/user/${clientEmail}`)
      .then((res) => res.json())
      .then((data) => setComments(data.reverse()))
      .catch((err) => console.error("Error loading user comments:", err));
  }, [clientEmail]);

  // 🗑️ কমেন্ট ডিলিট করার হ্যান্ডলার
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("🗑️ Comment deleted successfully!");
        setComments(comments.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // 📝 এডিট মোডাল ওপেন করার ফাংশন
  const openEditModal = (comment) => {
    setEditingComment(comment);
    setEditText(comment.commentText);
    setIsEditModalOpen(true);
  };

  // 💾 কমেন্ট আপডেট সাবমিট হ্যান্ডলার
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editText.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${editingComment._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentText: editText,
          date: new Date().toISOString().split("T")[0],
        }),
      });

      if (res.ok) {
        alert("🎉 Comment updated successfully!");
        setComments(
          comments.map((item) =>
            item._id === editingComment._id
              ? { ...item, commentText: editText, date: new Date().toISOString().split("T")[0] }
              : item
          )
        );
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Comments & Reviews</h1>
        <p className="text-sm text-gray-500">Manage or update all your feedback left on lawyer profiles.</p>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400 space-y-2">
          <MessageSquare className="mx-auto text-gray-300" size={40} />
          <p className="text-sm italic">You have not left any reviews or comments yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase text-[11px] font-bold tracking-wider border-b border-gray-100">
                  <th className="py-4 px-6">Lawyer Name</th>
                  <th className="py-4 px-6">My Comment</th>
                  <th className="py-4 px-6">Date Posted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                {comments.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-950">
                      <span className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                          <User size={12} />
                        </div>
                        {c.lawyerName || "Legal Expert"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 max-w-xs truncate">
                      {c.commentText}
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {c.date}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🛠️ Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-xl border border-gray-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Update Your Review</h3>
              <p className="text-xs text-gray-400 mt-0.5">Modifying feedback for <strong>{editingComment?.lawyerName}</strong></p>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50/50"
                required
              />

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-xl text-xs shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}