// এই ফাংশনটি ব্যাকএন্ড থেকে লইয়ারদের ডেটা ফেচ করে নিয়ে আসবে
export async function fetchLawyers() {
  try {
    const res = await fetch("http://localhost:5000/services");
    if (!res.ok) {
      throw new Error("Failed to fetch lawyers data");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    throw error; // কম্পোনেন্টে এরর হ্যান্ডেল করার জন্য আবার থ্রো করা হলো
  }
}