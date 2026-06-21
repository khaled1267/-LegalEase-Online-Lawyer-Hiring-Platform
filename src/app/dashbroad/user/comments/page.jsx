import UserCommentsTable from "@/components/UserComments";
import { getUserSession } from "@/lib/core/sesson";
import React from "react";

const UserCommentsPage = async () => {
  // সার্ভার সাইড থেকে লগইন করা ইউজারের সেশন রিড করা
  const session = await getUserSession();
  console.log("Logged In User Session (Comments Page):", session);

  return (
    <div>
      {/* চাইল্ড কম্পোনেন্টে লগইন করা ইউজারের ইমেইল এবং নাম পাস করা হচ্ছে */}
      <UserCommentsTable 
        clientEmail={session?.email || ""} 
        clientName={session?.name || ""} 
      />
    </div>
  );
};

export default UserCommentsPage;