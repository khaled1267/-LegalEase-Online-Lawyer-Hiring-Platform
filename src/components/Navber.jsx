"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Shield,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // ⚡ আসল Auth State এবং Pathname ইন্টিগ্রেশন
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // // ড্যাশবোর্ড লিংকের অবজেক্ট ম্যাপিং
  const dashboardLinks = {
    user: "/dashbroad/user",
    lawyer: "/dashbroad/lawyer",
    admin: "/dashbroad/admin",

  };

  // ডাইনামিক সাইন-ইন/সাইন-আপ টেক্সট ও রুট জেনারেশন
  const isLoginPage = pathname === "/signin" || pathname === "/login";
  const authLink = isLoginPage ? "/signup" : "/signin";
  const authLabel = isLoginPage ? "Sign Up" : "Sign In";

  // ⚡ আসল সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully! 👋");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
  };

  // Persistent Dark Mode Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Dynamic Scroll Behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Global Searching for:", searchQuery);
  };

  return (
    <nav
      className={`fixed mb-32 top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-base-300 dark:bg-slate-950/75 backdrop-blur-xl shadow-xl border-b border-slate-200/60 dark:border-slate-800/60"
          : "bg-slate-50 dark:bg-slate-950 border-b border-transparent"
      } text-slate-900 dark:text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. BRAND LOGO */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Shield size={22} className="stroke-[2.5]" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
              LegalEase
            </span>
          </Link>

          {/* 2. GLOBAL SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-12 relative group"
          >
            <input
              type="text"
              placeholder="Search lawyers by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-200/60 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 pl-5 pr-11 py-2.5 rounded-full border border-slate-300 dark:border-slate-800 focus:outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900/90 focus:ring-1 focus:ring-amber-500/30 transition-all duration-300 text-sm placeholder-slate-400 dark:placeholder-slate-500"
            />
            <button
              type="submit"
              className="absolute right-4 top-3 text-slate-400 dark:text-slate-500 group-focus-within:text-amber-500 transition-colors"
            >
              <Search size={18} />
            </button>
          </form>

          {/* 3. NAVIGATION LINKS & CONTROLS */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${pathname === "/" ? "text-amber-500" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`}
              >
                Home
                {pathname === "/" && (
                  <motion.div
                    layoutId="premiumUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
              <Link
                href="/browse-lawyer"
                className={`relative px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${pathname === "/browserjobs" ? "text-amber-500" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"}`}
              >
                Browse Lawyers
                {pathname === "gngnbv" && (
                  <motion.div
                    layoutId="premiumUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-amber-300"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
             
            </nav>

            <span className="h-5 w-[1px] bg-slate-300 dark:bg-slate-800" />

            {/* DARK / LIGHT THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-200/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-all relative overflow-hidden"
              aria-label="Toggle Theme"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: darkMode ? 180 : 0,
                  scale: darkMode ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={darkMode ? "absolute" : ""}
              >
                <Moon size={18} />
              </motion.div>
              <motion.div
                initial={false}
                animate={{
                  rotate: darkMode ? 0 : -180,
                  scale: darkMode ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={!darkMode ? "absolute" : ""}
              >
                <Sun size={18} />
              </motion.div>
              <span className="opacity-0 w-4 h-4 block" />
            </button>

            {/* 4. USER ACTIONS (DESKTOP) */}
            {!isPending && session ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 bg-gradient-to-b from-slate-100 to-slate-200/60 dark:from-slate-900 dark:to-slate-950 hover:from-slate-200 dark:hover:from-slate-850 dark:hover:to-slate-900 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border border-slate-300 dark:border-slate-800 shadow-sm dark:shadow-inner group"
                >
                  <div className="h-6 w-6 bg-amber-500/10 text-amber-500 dark:text-amber-400 rounded-md flex items-center justify-center font-bold text-xs uppercase border border-amber-500/20">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 group-hover:text-slate-900 group-hover:dark:text-white transition-colors">
                    Hi, {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-amber-500" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top-right"
                    >
                      <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800/80">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">
                          Role Account
                        </p>
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5 capitalize bg-amber-500/10 w-fit px-2 py-0.5 rounded-md border border-amber-500/20">
                          {user?.role || "seeker"}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          href={dashboardLinks[user?.role || "seeker"]}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl transition-all"
                        >
                          <LayoutDashboard
                            size={16}
                            className="text-slate-400"
                          />{" "}
                          Dashboard
                        </Link>
                        {/* Logout Button */}
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-300 rounded-xl transition-all border-t border-slate-200 dark:border-slate-800/40 mt-1"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // ইউজার লগইন না থাকলে Sign In / Sign Up বাটন দেখাবে
              !isPending && (
                <div className="flex items-center gap-3">
                  <Link
                    href={authLink}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {authLabel}
                  </Link>
                  <Link
                    href="/register"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-400/20 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )
            )}
          </div>

          {/* 5. MOBILE CONTROLS & HAMBURGER */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-200/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-800"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl bg-slate-200/60 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* 6. MOBILE DRAWER OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/60 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              <form onSubmit={handleSearch} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search counsel..."
                  className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-200 pl-5 pr-11 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-amber-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-3 text-slate-400"
                >
                  <Search size={18} />
                </button>
              </form>

              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === "/" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"}`}
              >
                Home
              </Link>
              <Link
                href="/browserjobs"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === "/browserjobs" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"}`}
              >
                Browse Jobs
              </Link>
              <Link
                href="/plan"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${pathname === "/plan" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"}`}
              >
                Pricing
              </Link>

              {/* 💡 USER ACTIONS (MOBILE) */}
              {!isPending && session ? (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-2">
                  <div className="px-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
                    Signed in as:{" "}
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      {session.user.name}
                    </span>
                  </div>
                  <Link
                    href={dashboardLinks[user?.role || "seeker"]}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <LayoutDashboard size={18} className="text-slate-400" />{" "}
                    Dashboard
                  </Link>
                  {/* Mobile Logout Button */}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                // মোবাইল স্ক্রিনে লগইন না থাকলে Auth Controls দেখাবে
                !isPending && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-2">
                    <Link
                      href={authLink}
                      onClick={() => setIsOpen(false)}
                      className="block text-center border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-bold text-sm"
                    >
                      {authLabel}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block text-center bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-sm shadow-md"
                    >
                      Get Started
                    </Link>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
