import LawyerHiringHistory from '@/components/LawyerHiringHistory';
import { getUserSession } from '@/lib/core/sesson';
import React from 'react';

// ১. ফাংশনটিকে async করুন যেহেতু getUserSession একটি প্রমিজ (Promise) রিটার্ন করে
const Lawerhistirypage = async () => {
    
    // ২. await ব্যবহার করে সেশন ডাটা রিজলভ করুন
    const hiringhistory = await getUserSession();
    
    console.log("Server side session info:", hiringhistory);

    return (
        <div>
            {/* ৩. সেফটি অপশনাল চেইনিং (?) সহ ইমেইলটি পাস করুন */}
            <LawyerHiringHistory loggedInLawyerEmail={hiringhistory?.email || ""} />
        </div>
    );
};

export default Lawerhistirypage;