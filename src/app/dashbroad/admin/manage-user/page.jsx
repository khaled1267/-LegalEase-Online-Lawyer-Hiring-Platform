"use client";
import { useState, useEffect } from "react";
import { Trash2, ShieldAlert, UserCheck } from "lucide-react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // 🔄 রোল পরিবর্তন করার ফাংশন
  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin"; // এক্সাম্পল: ইউজারকে অ্যাডমিন বা অ্যাডমিনকে ইউজার বানানো
    const confirmChange = window.confirm(`Change role to ${newRole}?`);
    if (!confirmChange) return;

    try {
      const res = await fetch(`http://localhost:5000/users/role/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        alert("🎉 Role updated!");
        setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ ইউজার ডিলিট করার ফাংশন
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("🗑️ User deleted!");
        setUsers(users.filter((u) => u._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm text-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50">
                <td className="p-4 font-semibold">{user.fullName || user.name}</td>
                <td className="p-4 text-gray-500">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-rose-50 text-rose-600' : 'bg-green-50 text-green-600'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleRoleChange(user._id, user.role)}
                    className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-xl hover:bg-indigo-100 text-xs font-semibold"
                  >
                    <UserCheck size={14} /> Change Role
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}