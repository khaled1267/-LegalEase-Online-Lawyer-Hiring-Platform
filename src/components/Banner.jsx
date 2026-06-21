"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Shield, Scale, Briefcase, Award, Users, Landmark, FileText, Heart } from "lucide-react";
import Link from "next/link";

// স্লাইডার ডেটা এবং নিচের রিলেটেড সাব-ক্যাটাগরি ডেটা (মকআপ ডিজাইন অনুযায়ী গ্রিড লেআউট)
const slides = [
  {
    id: 1,
    tagline: "1 of 4 • Premium Legal Network",
    headline: "Access Premier Legal Counsel",
    description: "Browse. Discover. Hire. Connecting Legal Seekers, clients, and premium enterprises with talented legal experts globally on a secure platform.",
    ctaText: "Browse Verified Lawyers",
    ctaLink: "/browse",
    features: [
      { id: "f1", title: "Business Law", icon: <Briefcase size={20} />, desc: "Empowering your business with robust legal solutions." },
      { id: "f2", title: "Estate Planning", icon: <Landmark size={20} />, desc: "Securing your family's future and assets." },
      { id: "f3", title: "Litigation Services", icon: <Scale size={20} />, desc: "Aggressive defense & representation in court." }
    ]
  },
  {
    id: 2,
    tagline: "2 of 4 • Absolute Protection",
    headline: "Tailored Legal Guidance",
    description: "Your data and legal requirements are guarded with corporate-grade security. Consult with vetted attorneys possessing core industry expertise.",
    ctaText: "Find Practice Experts",
    ctaLink: "/browse",
    features: [
      { id: "f4", title: "Family Law", icon: <Heart size={20} />, desc: "Compassionate guidance for complex personal matters." },
      { id: "f5", title: "Intellectual Property", icon: <Award size={20} />, desc: "Protecting your unique innovations and ideas." },
      { id: "f6", title: "Real Estate Law", icon: <Landmark size={20} />, desc: "Securing and verifying your property assets." }
    ]
  },
  {
    id: 3,
    tagline: "3 of 4 • Complete Compliance",
    headline: "Corporate Law & Protection",
    description: "From corporate compliance to international regulations, manage your entire legal operational workflow inside one single marketplace dashboard.",
    ctaText: "Explore Corporate Advisors",
    ctaLink: "/browse?specialty=corporate",
    features: [
      { id: "f7", title: "Criminal Defense", icon: <Shield size={20} />, desc: "Aggressive representation and protection of rights." },
      { id: "f8", title: "Corporate Law", icon: <Briefcase size={20} />, desc: "Comprehensive business legal strategy." },
      { id: "f9", title: "Immigration Law", icon: <Users size={20} />, desc: "Seamless pathways to visas, citizenship, and residency." }
    ]
  },
  {
    id: 4,
    tagline: "4 of 4 • Verified Track Record",
    headline: "Top Tier Elite Attorneys",
    description: "Never guess your counsel's quality again. Review ratings, check direct success history, and read payment-verified real client reviews before hiring.",
    ctaText: "See Top Lawyers",
    ctaLink: "/browse?filter=top-rated",
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

  // অটো-প্লে ইফেক্ট (৬ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে)
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

  // লাক্সারি স্লাইডিং অ্যানিমেশন কনফিগারেশন
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { x: { type: "tween", ease: "easeOut", duration: 0.5 }, opacity: { duration: 0.4 } }
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { x: { type: "tween", ease: "easeIn", duration: 0.4 }, opacity: { duration: 0.3 } }
    }),
  };

  return (
    <section className="relative w-full min-h-[750px] lg:h-[720px] bg-slate-900 text-white flex items-center overflow-hidden pt-24 pb-12">
      
      {/* ব্যাকগ্রাউন্ড লাক্সারি ডার্ক ওভারলে ও টেক গ্রিড ইফেক্ট */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
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
            {/* ১. স্লাইডারের মেইন টপ টেক্সট এরিয়া */}
            <div className="max-w-3xl space-y-4">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md text-xs font-bold uppercase tracking-widest">
                {slides[currentSlide].tagline}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {slides[currentSlide].headline}
              </h1>
              
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="pt-2">
                <Link 
                  href={slides[currentSlide].ctaLink}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg text-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {slides[currentSlide].ctaText}
                </Link>
              </div>
            </div>

            {/* ২. মকআপ ডিজাইন অনুযায়ী নিচের ক্যাটাগরি কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {slides[currentSlide].features.map((feat, idx) => (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 hover:border-amber-500/40 p-6 rounded-xl shadow-xl transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 tracking-wide uppercase group-hover:text-amber-400 transition-colors">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ৩. লেফট এবং রাইট নেভিগেশন কন্ট্রোল বাটন */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-[40%] -translate-y-1/2 p-3 bg-slate-800/80 hover:bg-amber-500 border border-slate-700 rounded-xl text-slate-300 hover:text-slate-950 transition-all shadow-xl z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={20} className="stroke-[2.5]" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-[40%] -translate-y-1/2 p-3 bg-slate-800/80 hover:bg-amber-500 border border-slate-700 rounded-xl text-slate-300 hover:text-slate-950 transition-all shadow-xl z-20"
        aria-label="Next Slide"
      >
        <ChevronRight size={20} className="stroke-[2.5]" />
      </button>

      {/* ৪. ক্যারোসেল ডট ইন্ডিকেটর (নিচে সেন্টারে থাকবে) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "w-8 bg-amber-500" 
                : "w-2 bg-slate-600 hover:bg-slate-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;