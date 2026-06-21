import UserHiringHistoryTable from "@/components/UserHiringHistoryTable";
import { getUserSession } from "@/lib/core/sesson";
import React from "react";

const UserHiringHistoryPage = async () => {
  // সার্ভার সাইড থেকে লগইন করা কাস্টমার/ইউজারের সেশন রিড করা
  const session = await getUserSession();
  console.log("Logged In User Session (Client):", session);

  return (
    <div>
      {/* চাইল্ড কম্পোনেন্টে লগইন করা ইউজারের ইমেইল পাস করা হচ্ছে */}
      <UserHiringHistoryTable clientEmail={session?.email || ""} />
    </div>
  );
};

export default UserHiringHistoryPage;