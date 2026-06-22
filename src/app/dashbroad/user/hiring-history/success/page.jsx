import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  // ১. searchParams থেকে ডাটা আলাদা করা
  
  const { session_id, hiringId } = await searchParams;
  // success/page.jsx ফাইলের ভেতরে চেক করুন:
// const searchParams = useSearchParams();
// const session_id = searchParams.get("session_id"); // 🌟 নিশ্চিত করুন নাম যেন 'session_id' ই হয়, 'sessionId' নয়।

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  // ২. স্ট্রাইপ সেশন একবারই রিট্রিভ করা (expand সহ)
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, metadata, customer_details } = session;
  const customerEmail = customer_details?.email;

  // 🌟 আইনজীবীর ইমেইলটি মেটাডাটা থেকে নেওয়া (যদি ব্যাকএন্ড থেকে metadata.lawyerEmail পাস করে থাকেন)
  // অথবা যদি মেটাডাটাতে না পান, আপনার ডাটাবেজ থেকে lawyer email রিড করতে পারেন।
  const lawyerEmail = metadata?.lawyerEmail || "support@legalease.com"; // default সেফটি ইমেইল

  if (status === 'open') {
    return redirect('/')
  }

  // 🌟 ডাটাবেজে স্ট্যাটাস আপডেট করার পার্ট
  const targetId = hiringId || metadata?.eventId;
if (targetId) {
  try {
    // স্ট্রাইপ থেকে টোটাল অ্যামাউন্ট ডলারে কনভার্ট করা (স্ট্রাইপ সেন্টে দেয়, তাই ১০০ দিয়ে ভাগ)
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/update-status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        hiringId: targetId, 
        paymentStatus: "paid",
        sessionId: session_id,
        clientEmail: customerEmail || "unknown@mail.com",
        amount: amountPaid,
        lawyerName: metadata?.lawyerName || "Verified Professional" // স্ট্রাইপ সেশনে পাস করা মেটাডাটা
      }),
    });
    console.log(`🎉 Database successfully updated & paid record saved for ID: ${targetId}`);
  } catch (dbError) {
    console.error("Failed to update database on success page:", dbError);
  }
}
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 dark:bg-zinc-900">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl text-center border border-gray-100 dark:border-zinc-700 animate-fade-in">
        
        {/* গ্রিন সাকসেস আইকন */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* হেডিং */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mb-6">
          Thank you for your purchase. Your payment has been processed successfully!
        </p>

        {/* পেমেন্ট ইনফো বক্স */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-4 mb-6 text-sm text-left border border-gray-100 dark:border-zinc-700/50">
          <p className="text-gray-600 dark:text-zinc-300 mb-2">
            <span className="font-semibold text-gray-800 dark:text-white">Sent to:</span> {customerEmail || 'Your email'}
          </p>
          <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed">
            A confirmation email and invoice have been sent. If you have any questions, please email{' '}
            {/* 🌟 এখানে ডাইনামিক lawyerEmail বসানো হলো */}
            <a href={`mailto:${lawyerEmail}`} className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              {lawyerEmail}
            </a>.
          </p>
        </div>

        {/* ড্যাশবোর্ড বা হোমে যাওয়ার বাটন */}
        <div className="space-y-3">
          <Link 
            href="/dashbroad/user/hiring-history" 
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-md shadow-indigo-600/20"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/" 
            className="block w-full text-center text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium py-2 transition duration-150"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </section>
  )
}