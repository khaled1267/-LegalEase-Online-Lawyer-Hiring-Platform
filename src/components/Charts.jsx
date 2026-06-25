import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalyticsChart = () => {
  // আপনার ড্যাশবোর্ডের বর্তমান ডাটা অনুযায়ী মক ডাটা
  const data = [
    { name: 'Total Users', count: 6, fill: '#3b82f6' },      // Blue
    { name: 'Total Lawyers', count: 2, fill: '#a855f7' },    // Purple
    { name: 'Total Hirings', count: 41, fill: '#f59e0b' },    // Amber/Orange
  ];

  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Platform Overview Visualization</h3>
      
      {/* ResponsiveContainer চার্টটিকে স্ক্রিন সাইজ অনুযায়ী ছোট-বড় হতে সাহায্য করবে */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f0f0f0' }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            
            {/* dataKey তে count ব্যবহার করা হয়েছে এবং প্রতিটা বারের কালার আলাদা করার জন্য data array এর fill প্রোপার্টি রিড করবে */}
            <Bar 
              dataKey="count" 
              name="Total Count" 
              radius={[8, 8, 0, 0]} 
              barSize={60} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalyticsChart;