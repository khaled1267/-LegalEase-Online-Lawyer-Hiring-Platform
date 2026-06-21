// ১. ImgBB-তে ইমেজ আপলোড করার ফাংশন
export const uploadImageToImgBB = async (file) => {
  const imgBbApiKey = "aebf5939ab44dbffaca2ecb1db8722aa"; // আপনার ImgBB API KEY
  const imageFormData = new FormData();
  imageFormData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbApiKey}`, {
      method: "POST",
      body: imageFormData,
    });
    
    const data = await res.json();
    if (data.success) {
      return data.data.url; // আপলোড হওয়া ছবির মেইন লিঙ্ক
    }
    return null;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    return null;
  }
};

// ২. আপনার ব্যাকএন্ড API-তে প্রফাইল আপডেট করার ফাংশন
// ২. এক্সপ্রেস ব্যাকএন্ডে (Port 5000) প্রোফাইল আপডেট করার ফাংশন
export const updateUserProfile = async (email, profileData) => {
  try {
    const res = await fetch(`http://localhost:5000/users/update-profile?email=${email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const data = await res.json();
    return data; // এটি সরাসরি পুরো অবজেক্ট (success: true/false) রিটার্ন করবে
  } catch (error) {
    console.error("Error in updateUserProfile API:", error);
    return { success: false, message: "Server connection failed" };
  }
};