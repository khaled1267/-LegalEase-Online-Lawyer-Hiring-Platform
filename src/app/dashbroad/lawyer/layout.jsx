import { roleall } from '@/lib/core/sesson';
import React from 'react';

const Lawyerlayout = async({children}) => {
    await roleall("lawyer");
     return children
};

export default Lawyerlayout;