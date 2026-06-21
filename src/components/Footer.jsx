"use client";
import React, { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter Email (Frontend Only):", email);
    setEmail('');
    alert("Thank you for subscribing to LegalEase Insights!");
  };

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900/60 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMN 1: Brand & Premium Law Vibe About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group w-fit">
              <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <Shield size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-50 dark:via-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
                LegalEase
              </span>
            </Link>
            <p className="text-sm text-slate-550 dark:text-slate-500 leading-relaxed max-w-sm">
              The premier executive network connecting verified legal professionals with global enterprises and individual clients. Streamlined counsel, redefined.
            </p>
          </div>

          {/* COLUMN 2: Quick Links (Requirement) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-600 dark:hover:text-amber-400 font-medium transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Newsletter Signup Placeholder (Premium Input Design) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase tracking-widest">
              Subscribe to Newsletter
            </h4>
            <p className="text-sm text-slate-550 dark:text-slate-500">
              Stay ahead with critical legal updates and ecosystem insights.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center max-w-sm group">
              <input
                type="email"
                required
                placeholder="Enter your professional email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 pl-4 pr-12 py-3 rounded-xl border border-slate-300 dark:border-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 text-sm transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 p-2 bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 dark:hover:bg-amber-400 transition-all duration-300 shadow-md shadow-amber-500/10"
                title="Subscribe"
              >
                <ArrowRight size={14} className="stroke-[3]" />
              </button>
            </form>
          </div>

        </div>

        {/* LOWER FOOTER: Divider, Copyright, and Premium Socials */}
        <div className="border-t border-slate-200 dark:border-slate-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Copyright Information (Requirement) */}
          <p className="text-xs font-medium text-slate-400 dark:text-slate-600 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} LegalEase Inc. All rights reserved.
          </p>

          {/* Social Media Icons (Premium Glass Cards) */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <a href="#" className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 shadow-sm transition-all duration-300" aria-label="Facebook">
              <FaFacebook size={16} />
            </a>
            <a href="#" className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 shadow-sm transition-all duration-300" aria-label="Twitter">
              <BsTwitter size={16} />
            </a>
            <a href="#" className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 shadow-sm transition-all duration-300" aria-label="LinkedIn">
              <LiaLinkedin size={16} />
            </a>
            <a href="#" className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/30 shadow-sm transition-all duration-300" aria-label="Instagram">
              <BsInstagram size={16} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;