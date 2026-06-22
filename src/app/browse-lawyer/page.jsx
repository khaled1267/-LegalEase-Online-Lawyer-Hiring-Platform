import LawyerListingContainer from '@/components/Browerlawercard';
import { fetchLawyers } from '@/lib/api/lawyerApi';
import React from 'react';

const Bawserlawyerpage = async ({ searchParams }) => {
    // searchParams-এর প্রমিজ রিজলভ করা
    const filters = await searchParams || {};

    const queryFilters = {
        search: filters.search || "",
        page: filters.page || "1"
    };

    // ডাটা নিয়ে আসা
    const fetchLawyerscc = await fetchLawyers(queryFilters); 

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 mt-9 ">
            <LawyerListingContainer 
                lawyersData={fetchLawyerscc || { lawyers: [], total: 0 }} 
                filter={queryFilters} 
            />
        </div>
    );
};

export default Bawserlawyerpage;