import LawyerDetails from "@/components/LawyerDetailsPage";
import { getUserSession } from "@/lib/core/sesson";

// ১. পেজটিকে async করুন যেন await ব্যবহার করা যায়
export default async function LawyerDetailsPage({ params: paramsPromise }) {
  // params আনবক্স করা (Next.js নিয়ম অনুযায়ী)
  const params = await paramsPromise;
  const id = params.id;

  // ২. সার্ভার সাইড থেকে লগইন করা ইউজারের সেশন রিড করা
  const session = await getUserSession();
  console.log("Logged In User Session:", session);

  // ৩. ব্যাকএন্ড থেকে লইয়ারের ডাটা ফেচ করা
  let lawyer = null;
  try {
    const res = await fetch(`http://localhost:5000/services/${id}`, {
      cache: "no-store", // রিয়েল-টাইম ডাটার জন্য ক্যাশ অফ রাখা ভালো
    });
    if (res.ok) {
      lawyer = await res.json();
    }
  } catch (err) {
    console.error("Error fetching lawyer details:", err);
  }

  if (!lawyer) return <div className="p-8 text-red-500">Lawyer not found!</div>;

  // ৪. চাইল্ড কম্পোনেন্টে লইয়ারের ডাটা এবং ইউজারের সেশন ইনফো পাঠিয়ে দেওয়া হচ্ছে
  return (
    <div className="p-8 mt-17">

      <LawyerDetails
      lawyer={lawyer} 
      clientEmail={session?.email || "guest@client.com"} 
      clientName={session?.name || "Guest User"} 
    />
    </div>
  );
}