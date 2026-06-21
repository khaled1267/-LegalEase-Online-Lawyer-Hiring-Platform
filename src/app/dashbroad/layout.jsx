import Navigation from '@/components/Dashbroadsideber';
import React from 'react';

const dashboardlayout = ({children}) => {
    return (
      <div className="min-h-screen bg-  flex flex-col md:flex-row ">
      
      <div className="  bg-black border-r border-zinc-800 ">
        <Navigation />
      </div>
      
      <main className="flex-1 mt-25 ml-64 bg-gray-300 w-full md:ml-64 p-6 transition-all duration-300">
        {children}
      </main>

    </div>
    );
};

export default dashboardlayout;