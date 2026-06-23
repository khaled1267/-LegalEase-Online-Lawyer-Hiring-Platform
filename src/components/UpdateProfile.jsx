"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadImageToImgBB } from "@/lib/api/userApi";
import { authClient, useSession } from "@/lib/auth-client"; // আপনার প্রোজেক্টের পাথ অনুযায়ী 

export default function UpdateProfile() {
  const router = useRouter();
  
  // 💡 refetch ফাংশনটি ইমপোর্ট করুন যা Better Auth এর সেশন আপডেট করতে সাহায্য করবে
  const { data: session, isPending: sessionLoading, refetch } = useSession();

  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // সেশন থেকে ডেটা লোড করা
  useEffect(() => {
    if (session?.user) {
      setFullName(session.user.name || "");
      setProfilePic(session.user.image || "");
    }
  }, [session]);

  // ইমেজ সিলেক্ট প্রিভিউ can de solvers
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file)); 
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = profilePic;

      // ১. নতুন ইমেজ থাকলে ImgBB তে আপলোড করা
      if (selectedFile) {
        const uploadedUrl = await uploadImageToImgBB(selectedFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          alert("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      // ২. Better Auth দিয়ে নাম ও ইমেজ একসাথে ডাটাবেজে আপডেট
      const { data, error } = await authClient.updateUser({
        name: fullName,       
        image: finalImageUrl  
      });

      if (error) {
        alert(error.message || "Failed to update profile");
      } else {
        alert("Profile updated successfully!");
        
        // 💡 সবচেয়ে গুরুত্বপূর্ণ পার্ট: Better Auth সেশন নতুন করে রিফেচ করা
        await refetch(); 
        
        // এরপর রাউটার রিফ্রেশ করা
        router.refresh(); 
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium">Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Profile
        </h2>

        {session?.user && (
          <p className="text-sm text-center text-gray-500 mb-4">
            User Email: {session.user.email}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePic || "https://images.remotehub.com/830a6c60ca2111eaa5ff97193f538cb3?width=180&height=180&fit=crop"}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover border-4 border-indigo-50"
              />
            </div>
            
            <label className="cursor-pointer bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Full Name Input Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-900 bg-white"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push("/dashboard/user/update-profile")}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}