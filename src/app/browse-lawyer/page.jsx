import MainLawyersPage from '@/components/Browerlawercard';
import { fetchLawyers } from '@/lib/api/lawyerApi';
import React from 'react';

const Bawserlawyerpage = async() => {
    const fetchLawyerscc = await fetchLawyers();
    // console.log(fetchLawyerscc);
    


    return (
        <div>
            <MainLawyersPage fetchLawyers={fetchLawyerscc} />
        </div>
    );
};

export default Bawserlawyerpage;