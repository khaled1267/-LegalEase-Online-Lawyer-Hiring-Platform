import { roleall } from '@/lib/core/sesson';
import React from 'react';

const Userlayout = async({children}) => {
    await roleall("user");
    return children
};

export default Userlayout;