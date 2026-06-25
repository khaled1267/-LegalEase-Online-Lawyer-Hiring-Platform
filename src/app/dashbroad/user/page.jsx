import UserDashboardHome from '@/components/UserDashboardHome';
import { getUserSession } from '@/lib/core/sesson';
import React from 'react';

const Userhomepage = async () => {
  const user = await getUserSession();
   console.log("clientEmaijnijnl", user);
  return (
    <div>
      <UserDashboardHome clientEmail={user?.email} />
    </div>
  );
};

export default Userhomepage;