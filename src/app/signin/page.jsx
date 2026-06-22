"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const searchparams = useSearchParams();
  const redirectto = searchparams.get("redirect") || "/";

  // গুগল ওআউথ (OAuth) লগইন হ্যান্ডলার
const handleGoogleLogin = async () => {
  try {
    await signIn.social({
      provider: "google",
      callbackURL: "/", // লগইন সফল হলে ইউজার এই ইউআরএল-এ রিডাইরেক্ট হবে
    });
  } catch (err) {
    toast.error(err?.message || "Google sign in failed");
  }
};


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData.entries());

    try {
      // ১. signIn.email কল করার সময় await ব্যবহার করুন
      const { data, error } = await signIn.email({
        email: loginData.email,
        password: loginData.password,
      });

      // ২. Better Auth যদি কোনো ফর্মাল এরর দেয় (যেমন: wrong password)
      if (error) {
        toast.error(error.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      toast.success("Welcome back! 🎉");
      
      // ৩. সেশন কুঁকি সেট হওয়ার জন্য সামান্য সময় দিয়ে রিডাইরেক্ট
      router.push(redirectto);
      router.refresh();
    } catch (err) {
      console.error("Login Error:", err);
      // ৪. সার্ভার বা নেটওয়ার্ক ক্র্যাশ ক্যাচ করার জন্য নিরাপদ মেসেজ
      const errorMessage = err?.body?.message || err?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col bg-[#F8F9FA] dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
            
            {/* হেডার সেকশন */}
            <div className="text-center space-y-2 relative mb-8">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Welcome{" "}
                <span className="bg-gradient-to-r from-[#00A896] to-[#028090] bg-clip-text text-transparent">
                  Back
                </span>
              </h2>
              <p className="text-gray-400 dark:text-slate-400 font-medium text-xs">
                Log in to your IdeaVault account to continue
              </p>
            </div>


            {/* ফর্ম সেকশন */}
            <form className="space-y-5" onSubmit={handleLogin}>

                <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full h-11 flex items-center justify-center gap-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40 shadow-sm transition-all duration-200 cursor-pointer"
>
  {/* গুগল SVG আইকন */}
  <svg className="w-4 h-4" viewBox="0 0 24 24">...</svg>
  Continue with Google
</button>
              
              {/* ইমেইল ইনপুট */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-bold text-gray-500 dark:text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* পাসওয়ার্ড ইনপুট */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="password" className="text-xs font-bold text-gray-500 dark:text-slate-400">
                    Password
                  </label>
                  <Link
                    href="/forgotpassword"
                    className="text-[11px] font-bold text-gray-400 dark:text-slate-500 hover:text-[#00A896] dark:hover:text-teal-400 transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-13 pl-12 pr-4 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-full text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:border-[#00A896] focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  />
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-13 mt-4 flex items-center justify-center gap-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#00A896] to-[#028090] shadow-[0_4px_15px_rgba(0,168,150,0.25)] hover:opacity-95 disabled:opacity-70 active:scale-[0.99] transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* রেজিস্টার পেজ লিঙ্ক */}
            <div className="text-center pt-6">
              <p className="text-xs text-gray-400 font-medium">
                Do not have an account?{" "}
                <Link
                  href={`/signup?redirect=${redirectto}`}
                  className="text-[#00A896] font-bold hover:underline underline-offset-4 transition-all"
                >
                  Sign up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}