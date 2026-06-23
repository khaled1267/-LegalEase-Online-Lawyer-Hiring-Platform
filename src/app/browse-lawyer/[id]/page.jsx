import LawyerDetails from "@/components/LawyerDetailsPage";
import { authClient } from "@/lib/auth-client";
import { getUserSession } from "@/lib/core/sesson";

// ১. পেজটিকে async করুন যেন await ব্যবহার করা যায়
export default async function LawyerDetailsPage({ params: paramsPromise }) {
  // params আনবক্স করা (Next.js নিয়ম অনুযায়ী)
  const params = await paramsPromise;
  const id = params.id;

  const session = await getUserSession();

// টার্মিনালে পুরো অবজেক্টটি দেখতে পাবেন
// console.log("Full Session Data:", JSON.stringify(session, null, 2));

// আপনার লাইব্রেরির স্ট্রাকচার অনুযায়ী নিচের যেকোনো একটি কাজ করবে:
const token = session?.accessToken || session?.token || session?.session?.token;

// console.log("My Real Token:", token);

  // ৩. ব্যাকএন্ড থেকে লইয়ারের ডাটা ফেচ করা
  let lawyer = null;
 
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/${id}`, {
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