"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateUserProfile, uploadImageToImgBB } from "@/lib/api/userApi";
// 💡 lib ফোল্ডার থেকে ফাংশনগুলো ইমপোর্ট করছি


export default function UpdateProfile({userEmail}) {
    console.log(userEmail);
  const router = useRouter();
  
  // 💡 বাস্তব প্রোজেক্টে এই ইমেইলটি আপনার Auth Context বা Session থেকে আসবে
//   const userEmail = "user@example.com"; 

  const [fullName, setFullName] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ইমেজ সিলেক্ট করলে প্রিভিউ দেখানোর জন্য
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file)); // অস্থায়ী প্রিভিউ URL
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = profilePic;

      // 1️⃣ ইউজার নতুন ছবি সিলেক্ট করলে lib-এর ফাংশন দিয়ে আপলোড হবে
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

      // 2️⃣ এবার lib-এর ফাংশন দিয়ে ব্যাকএন্ডে ডেটা আপডেট করা হচ্ছে
      const data = await updateUserProfile(userEmail, {
        fullName: fullName,
        profilePicture: finalImageUrl,
      });

      if (data.success) {
        alert("Profile updated successfully!");
        router.push("/dashbroad/user/update-profile"); // স্পেলিং ফিক্সড: dashbroad -> dashboard
      } else {
        alert(data.message || "Failed to update profile");
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Update Profile
        </h2>

        <h1>userEmail:{userEmail}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profilePic}
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
              onClick={() => router.push("/dashbroad/user/update-profile")} // স্পেলিং ফিক্সড
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