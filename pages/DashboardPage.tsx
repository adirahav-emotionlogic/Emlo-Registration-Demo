
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back to your organization management portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
          <div className="mt-4 flex items-center text-green-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            <span>Active</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Status</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">Verified</p>
          <div className="mt-4 flex items-center text-blue-500 text-sm">
             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>All systems nominal</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Pending Tasks</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          <div className="mt-4 flex items-center text-gray-400 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <span>Complete</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-12 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
           <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No activity yet</h3>
        <p className="text-gray-500 mt-1 max-w-sm">When your team starts using the platform, you'll see metrics and activity logs appearing here.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
