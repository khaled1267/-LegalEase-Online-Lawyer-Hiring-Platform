"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield, Scale, Briefcase, Award, Users, Landmark, FileText, Heart } from "lucide-react";
import Link from "next/link";

// মানুষ এবং মূর্তি ছাড়া সম্পূর্ণ অবজেক্ট ও স্ট্রাকচার ভিত্তিক প্রিমিয়াম লিগ্যাল ইমেজ
const slides = [
  {
    id: 1,
    tagline: "Premium Legal Network",
    headline: "Access Premier Legal Counsel",
    description: "Browse. Discover. Hire. Connecting Legal Seekers, clients, and premium enterprises with talented legal experts globally on a secure platform.",
    ctaText: "Browse Verified Lawyers",
    ctaLink: "/browse-lawyers",
    bgImage: "https://i.ibb.co.com/tM4PfwCZ/attorney-2403.jpg", // ক্লাসিক জাস্টিস স্কেল (কোনো মূর্তি নেই)
    features: [
      { id: "f1", title: "Business Law", icon: <Briefcase size={20} />, desc: "Empowering your business with robust legal solutions." },
      { id: "f2", title: "Estate Planning", icon: <Landmark size={20} />, desc: "Securing your family's future and assets." },
      { id: "f3", title: "Litigation Services", icon: <Scale size={20} />, desc: "Aggressive defense & representation in court." }
    ]
  },
  {
    id: 2,
    tagline: "Absolute Protection",
    headline: "Tailored Legal Guidance",
    description: "Your data and legal requirements are guarded with corporate-grade security. Consult with vetted attorneys possessing core industry expertise.",
    ctaText: "Find Practice Experts",
    ctaLink: "/browse-lawyers",
    bgImage: "https://i.ibb.co.com/Cs6xJg0F/Become-a-Lawyer-jpeg.webp", // আদালতের প্রিমিয়াম কাঠের হাতুড়ি (Gavel) ও বই
    features: [
      { id: "f4", title: "Family Law", icon: <Heart size={20} />, desc: "Compassionate guidance for complex personal matters." },
      { id: "f5", title: "Intellectual Property", icon: <Award size={20} />, desc: "Protecting your unique innovations and ideas." },
      { id: "f6", title: "Real Estate Law", icon: <Landmark size={20} />, desc: "Securing and verifying your property assets." }
    ]
  },
  {
    id: 3,
    tagline: "Complete Compliance",
    headline: "Corporate Law & Protection",
    description: "From corporate compliance to international regulations, manage your entire legal operational workflow inside one single marketplace dashboard.",
    ctaText: "Explore Corporate Advisors",
    ctaLink: "/browse-lawyers?specialty=corporate",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920", // মডার্ন কর্পোরেট আর্কিটেকচার (ব্যবসায়িক আইনের জন্য)
    features: [
      { id: "f7", title: "Criminal Defense", icon: <Shield size={20} />, desc: "Aggressive representation and protection of rights." },
      { id: "f8", title: "Corporate Law", icon: <Briefcase size={20} />, desc: "Comprehensive business legal strategy." },
      { id: "f9", title: "Immigration Law", icon: <Users size={20} />, desc: "Seamless pathways to visas, citizenship, and residency." }
    ]
  },
  {
    id: 4,
    tagline: "Verified Track Record",
    headline: "Top Tier Elite Attorneys",
    description: "Never guess your counsel's quality again. Review ratings, check direct success history, and read payment-verified real client reviews before hiring.",
    ctaText: "See Top Lawyers",
    ctaLink: "/browse-lawyers?filter=top-rated",
    bgImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920", // প্রফেশনাল ল লাইব্রেরি ও প্রাচীন লিগ্যাল বুকস শ্যাডো
    features: [
      { id: "f10", title: "Tax Law", icon: <FileText size={20} />, desc: "Strategic tax planning and compliance for businesses." },
      { id: "f11", title: "Employment Law", icon: <Users size={20} />, desc: "Navigating workplace rights and enterprise balance." },
      { id: "f12", title: "Litigation Services", icon: <Scale size={20} />, desc: "Elite representation for high-stakes court matters." }
    ]
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { x: { type: "tween", ease: "easeOut", duration: 0.5 }, opacity: { duration: 0.4 } }
    },
    exit: (dir) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { x: { type: "tween", ease: "easeIn", duration: 0.4 }, opacity: { duration: 0.3 } }
    }),
  };

  return (
    <section className="relative w-full min-h-[780px] lg:h-[750px] bg-slate-950 text-white flex items-center overflow-hidden pt-28 pb-12">
      
      {/* 📸 অ্যানিমেটেড অবজেক্ট-বেসড ব্যাকগ্রাউন্ড ইমেজ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={slides[currentSlide].bgImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full bg-cover bg-center absolute inset-0"
            style={{ backgroundImage: `url('${slides[currentSlide].bgImage}')` }}
          />
        </AnimatePresence>
      </div>
      
      {/* 🖤 লাক্সারি ডার্ক ওভারলে মাস্ক */}
  

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full space-y-12"
          >
            {/* ১. কন্টেন্ট এরিয়া */}
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {slides[currentSlide].tagline}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {slides[currentSlide].headline}
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="pt-3">
                <Link 
                  href={slides[currentSlide].ctaLink}
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {slides[currentSlide].ctaText}
                </Link>
              </div>
            </div>

            {/* ২. ইনফো কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {slides[currentSlide].features.map((feat, idx) => (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="bg-slate-950/70 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/30 p-5 rounded-2xl shadow-2xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-inner">
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-black text-slate-100 tracking-wide uppercase group-hover:text-amber-400 transition-colors">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ৩. কন্ট্রোল বাটনসমূহ */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-[45%] -translate-y-1/2 p-3 bg-slate-950/60 hover:bg-amber-500 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-950 transition-all shadow-xl z-20 backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={18} className="stroke-[3]" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-[45%] -translate-y-1/2 p-3 bg-slate-950/60 hover:bg-amber-500 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-950 transition-all shadow-xl z-20 backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight size={18} className="stroke-[3]" />
      </button>

      {/* ৪. ইন্ডিকেটর ডটস */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-6 bg-amber-500" : "w-1.5 bg-slate-700 hover:bg-slate-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;