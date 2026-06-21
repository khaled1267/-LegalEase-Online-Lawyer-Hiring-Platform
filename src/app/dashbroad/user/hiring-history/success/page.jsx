import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { metadata } from '@/app/layout'
import { createScription } from '@/lib/action/scription'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams
console.log(session_id)
  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  let session;
  try {
    
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: [
    'payment_intent',       // full PaymentIntent object
    'line_items',           // what was purchased
    'customer',             // Stripe Customer object (if applicable)
    'customer_details',     // name, email, address entered at checkout
  ]
    })
  } catch (error) {
    console.error("Stripe session retrieve error:", error)
    throw new Error('Failed to retrieve checkout session.')
  }

  // সেশন ওপেন থাকলে হোমপেজে রিডাইরেক্ট (এটি try-catch এর বাইরে রাখা ভালো)
  if (session.status === 'open') {
    return redirect('/')
  }

  const customerEmail = session.customer_details?.email

  const subinfo ={
    email: customerEmail,
    planId: session.metadata.planId
  }
  const res = await createScription(subinfo);
  // console.log(res,"fbdfbd")
// 
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
          Thank you for your purchase. Your subscription is now active!
        </p>

        {/* পেমেন্ট ইনফো বক্স */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-4 mb-6 text-sm text-left border border-gray-100 dark:border-zinc-700/50">
          <p className="text-gray-600 dark:text-zinc-300 mb-2">
            <span className="font-semibold text-gray-800 dark:text-white">Sent to:</span> {customerEmail || 'Your email'}
          </p>
          <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed">
            A confirmation email and invoice have been sent. If you have any questions, please email{' '}
            <a href="mailto:orders@example.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              orders@example.com
            </a>.
          </p>
        </div>

        {/* ড্যাশবোর্ড বা হোমে যাওয়ার বাটন */}
        <div className="space-y-3">
          <Link 
            href="/dashboard" 
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