"use client";

import { FileEdit, Gavel, Loader2, Plus, Trash2, UploadCloud } from 'lucide-react';
import React, { useState, useEffect } from 'react';
// 💡 lib ফোল্ডার থেকে API ফাংশনগুলো ইমপোর্ট করছি
import { fetchServices, addService, updateService, deleteService } from '@/lib/api/servicesApi'; 

export default function ManageLegalProfileForm({ lawyerEmail }) {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ _id: null, name: '', specialization: '', fee: '', bio: '', image: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // 🔄 ১. ডাটা লোড করা
    const loadServices = async () => {
        const data = await fetchServices(lawyerEmail);
        setServices(data);
    };

    useEffect(() => {
        if (lawyerEmail) loadServices();
    }, [lawyerEmail]);

    // 📸 ২. imgBB-তে ইমেজ আপলোড (এটি ফর্মে সরাসরি রাখাই ভালো যেহেতু এটি লোকাল ফাইল হ্যান্ডেল করে)
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingImage(true);
        const imgBbApiKey = "aebf5939ab44dbffaca2ecb1db8722aa"; 
        const bodyData = new FormData();
        bodyData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, {
                method: 'POST',
                body: bodyData
            });
            const data = await res.json();
            if (data.success) {
                setFormData({ ...formData, image: data.data.url });
                alert("Image uploaded successfully!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setUploadingImage(false);
        }
    };

    // 💾 ৩. সার্ভিস সাবমিট (সেভ/আপডেট)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.specialization || !formData.fee) {
            alert("Please fill in all required fields!");
            return;
        }

        setLoading(true);
        let success = false;

        if (isEditing) {
            // 💡 lib এর আপডেট ফাংশন কল
            success = await updateService(formData._id, {
                name: formData.name,
                specialization: formData.specialization,
                fee: Number(formData.fee),
                bio: formData.bio,
                image: formData.image
            });
            if (success) {
                alert("Service updated successfully!");
                setIsEditing(false);
            }
        } else {
            // 💡 lib এর অ্যাড ফাংশন কল
            success = await addService({ ...formData, lawyerEmail, fee: Number(formData.fee) });
            if (success) alert("New service added successfully!");
        }

        if (success) {
            setFormData({ _id: null, name: '', specialization: '', fee: '', bio: '', image: '' });
            loadServices();
        } else {
            alert("Something went wrong!");
        }
        setLoading(false);
    };

    // ✏️ ৪. এডিট মোড
    const handleEdit = (service) => {
        setFormData(service);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ❌ ৫. ডিলিট করা
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        // 💡 lib এর ডিলিট ফাংশন কল
        const success = await deleteService(id);
        if (success) {
            alert("Service deleted successfully!");
            loadServices();
        } else {
            alert("Failed to delete service.");
        }
    };

    return (
        // ... আপনার বাকি সব HTML/JSX কোড একদম আগের মতোই থাকবে ...
        <div className="max-w-6xl mx-auto space-y-8">
            {/* হেডার */}
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-5">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                    <Gavel className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Manage Legal Services</h1>
                    <p className="text-sm text-slate-400">Logged in as: {lawyerEmail}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ফর্ম */}
                <div className="lg:col-span-1 bg-slate-950 p-6 rounded-2xl border border-slate-800 h-fit space-y-5">
                    <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                        {isEditing ? <><FileEdit className="h-5 w-5" /> Edit Legal Service</> : <><Plus className="h-5 w-5" /> Add New Service</>}
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Lawyer/Chamber Name *</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Barrister Asif Ali" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Specialization *</label>
                            <select value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition text-slate-300">
                                <option value="">Select Specialization</option>
                                <option value="Corporate Law">Corporate Law</option>
                                <option value="Criminal Defense">Criminal Defense</option>
                                <option value="Family & Civil Law">Family & Civil Law</option>
                                <option value="Intellectual Property">Intellectual Property</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Consultation Fee (BDT) *</label>
                            <input type="number" value={formData.fee} onChange={(e) => setFormData({...formData, fee: e.target.value})} placeholder="e.g. 5000" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Service Bio / Description</label>
                            <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} rows="3" placeholder="Briefly describe your expertise in this service..." className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition resize-none"></textarea>
                        </div>

                        {/* imgBB আপলোড */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Service Image (via imgBB)</label>
                            <div className="relative border-2 border-dashed border-slate-800 rounded-xl p-4 text-center hover:border-slate-700 transition bg-slate-900/50">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                {uploadingImage ? (
                                    <div className="flex items-center justify-center space-x-2 text-xs text-amber-400">
                                        <Loader2 className="animate-spin h-4 w-4" /> <span>Uploading...</span>
                                    </div>
                                ) : formData.image ? (
                                    <div className="text-xs text-emerald-400">✓ Image Uploaded Successfully</div>
                                ) : (
                                    <div className="space-y-1 text-slate-400">
                                        <UploadCloud className="mx-auto h-5 w-5 text-slate-500" />
                                        <p className="text-xs">Click to upload headshot/banner</p>
                                    </div>
                                )}
                            </div>
                            {formData.image && <img src={formData.image} alt="Preview" className="mt-2 w-16 h-16 rounded-lg object-cover border border-slate-800" />}
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="submit" disabled={loading} className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center space-x-2">
                                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : isEditing ? <FileEdit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                <span>{isEditing ? "Update Service" : "Add Service"}</span>
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setIsEditing(false); setFormData({ _id: null, name: '', specialization: '', fee: '', bio: '', image: '' }); }} className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-2.5 px-4 rounded-xl text-sm transition">Cancel</button>
                            )}
                        </div>
                    </form>
                </div>

                {/* টেবিল */}
                <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                    <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-200">Active Legal Services</h2>
                        <span className="text-xs bg-slate-900 text-amber-400 font-semibold px-2.5 py-1 rounded-full border border-slate-800">{services.length} Listed</span>
                    </div>

                    {services.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 text-sm">No services listed yet. Use the form to add services.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-800">
                                        <th className="px-6 py-4">Image & Info</th>
                                        <th className="px-6 py-4">Specialization</th>
                                        <th className="px-6 py-4">Fee</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-900 text-sm text-slate-300">
                                    {services.map((service) => (
                                        <tr key={service._id} className="hover:bg-slate-900/30 transition">
                                            <td className="px-6 py-4 flex items-center space-x-3">
                                                <img className="h-12 w-12 rounded-xl object-cover border border-slate-800" src={service.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150"} alt={service.name} />
                                                <div>
                                                    <p className="font-semibold text-slate-100">{service.name}</p>
                                                    <p className="text-xs text-slate-500 max-w-xs truncate">{service.bio || "No description provided."}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">{service.specialization}</span>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-200">৳ {Number(service.fee).toLocaleString()}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button onClick={() => handleEdit(service)} className="text-slate-400 hover:text-amber-400 p-2 hover:bg-slate-900 rounded-lg transition" title="Edit">
                                                    <FileEdit className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDelete(service._id)} className="text-slate-400 hover:text-red-400 p-2 hover:bg-slate-900 rounded-lg transition" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}