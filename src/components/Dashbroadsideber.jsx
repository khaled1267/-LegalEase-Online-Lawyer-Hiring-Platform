import React from "react";
import {
  Bell,
  House,
  SearchCode,
  Briefcase,
  FileUser,
  PersonStanding,
  Settings2,
  MagnetIcon,
  Bookmark,
  FileText,
  CreditCard,
  Users,
  Building,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/sesson";
// import { getUserSession } from "@/lib/core/session";

export default async function Navigation() {
  // সরাসরি সার্ভার সাইডেই সেশন ডাটা চলে আসবে
  const user = await getUserSession();

  const usernavItems = [
    { icon: House, href: "/dashbroad/user", label: "Home" },
    { icon: SearchCode, href: "/dashbroad/user/hiring-history", label: "Hiring History" },
    // { icon: Bell, href: "/dashbroad/user/jobs/new", label: "Post A Job" },
   
    { icon: FileUser, href: "/dashbroad/user/comments", label: "Comments" },
    { icon: PersonStanding, href: "/dashbroad/user/update-profile", label: "Update Profile" },
    { icon: BadgeDollarSign, href: "/dashbroad/user/payment", label: "Transaction History" },

    // { icon: Settings2, href: "/settings", label: "Settings" },
  ];

  const lawyerNavLinks = [
    { icon: House, href: "/dashbroad/lawyer", label: "Home" },
    {
      icon: MagnetIcon,
      href: "/dashbroad/lawyer/lawerhireinghistory",
      label: "Hiring History",
    },
    { icon: Bookmark, href: "/dashbroad/lawyer/", label: "Saved Jobs" },
    {
      icon: FileText,
      href: "/dashbroad/lawyer/manage-legal-profile",
      label: "profile",
    },
    { icon: CreditCard, href: "/dashbroad/lawyer/prayment", label: "Billing" },
  ];

    const adminNavLinks = [
      { icon: House, href: "/dashbroad/admin", label: "dashbroad" },
      { icon: Users, href: "/dashbroad/admin/manage-user", label: "manage-user" },
      // { icon: Building, href: "/dashbroad/admin/companies", label: "Companies" },
      { icon: CreditCard, href: "/dashbroad/admin/all-transactions", label: "all-transactions" },
      { icon: Briefcase, href: "/dashbroad/admin/analytics", label: "analytics" },
    ];

  const navLinksMap = {
    lawyer: lawyerNavLinks,
    user: usernavItems,
    admin:adminNavLinks
  };

  // ইউজারের রোল অনুযায়ী ডাইনামিকালি মেনু সিলেক্ট হবে (সার্ভারেই)
  const navItems = navLinksMap[user?.userRole || "user"];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-25 border-r border-zinc-800 bg-zinc-950 p-6 z-40">
      <div className="mb-8 px-4">
        <h2 className="text-xl font-bold text-white tracking-wide">
          LegalEase
        </h2>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems?.map((item) => (
          <Link
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-400 font-medium transition-colors hover:bg-zinc-800 hover:text-white"
            href={item.href}
          >
            <item.icon className="size-5 text-gray-400 group-hover:text-white" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
