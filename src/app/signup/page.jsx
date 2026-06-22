"use client";

import React, { useState } from "react";
import LinkComponent from "next/link";
import { User, Mail, Lock, Image as ImageIcon, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchparams = useSearchParams();
  const redirectto = searchparams.get("redirect") || "/";

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signUp.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error(err?.message || "Google registration failed");
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log("inside regester the funtion")
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const registerData = Object.fromEntries(formData.entries());

    const password = registerData.password;
    const confirmPassword = registerData.confirmPassword;

    // validation
    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   setLoading(false);
    //   return;
    // }

    // if (password.length < 6) {
    //   toast.error("Password must be at least 6 characters long!");
    //   setLoading(false);
    //   return;
    // }

    // if (!/[A-Z]/.test(password)) {
    //   toast.error("Password must include uppercase letter!");
    //   setLoading(false);
    //   return;
    // }

    // if (!/[a-z]/.test(password)) {
    //   toast.error("Password must include lowercase letter!");
    //   setLoading(false);
    //   return;
    // }
    // console.log("inside tryjkvhgjk block");
    try {
      // console.log("inside try block");
      await authClient.signUp.email({
        email: registerData.email,
        password,
        name: registerData.name,
        image: registerData.image || undefined,

        // 🔥 ROLE HERE (IMPORTANT FIX)
        userRole: registerData.role,

        callbackURL: "/",
      });

      toast.success("Registration successful! 🎉");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);

      toast.error(err?.body?.message || err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col bg-[#F8F9FA] dark:bg-slate-950 py-10">
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black">
                Create <span className="text-teal-500">Account</span>
              </h2>
            </div>

            {/* Google login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 mb-4 border rounded-full"
            >
              Continue with Google
            </button>

            {/* form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                className="input"
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input"
                required
              />

              <input
                name="image"
                type="url"
                placeholder="Image URL (optional)"
                className="input"
              />

              {/* Role */}
              <select name="role" className="input" required>
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
              </select>

              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input"
                required
              />

              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="input"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-full"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* footer */}
            <div className="text-center mt-5">
              <LinkComponent href={`/signin?redirect=${redirectto}`}>
                Already have account? Sign in
              </LinkComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
