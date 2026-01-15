
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const location = useLocation();
  const hasUsersManagement = user?.permissions && 'users_management' in user.permissions;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    ...(hasUsersManagement ? [{
      label: 'Account Users',
      path: '/settings/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      )
    }] : []),
  ];

  return (
    <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
      <h2 className="text-2xl font-bold text-blue-600 px-2 mb-8">Emlo Mgmt</h2>
      
      <div className="flex flex-col justify-between flex-1">
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-700 font-medium' : ''
              }`}
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center px-4 py-2 mt-5 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              {user?.firstName?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="mx-3 text-sm font-medium truncate">{user?.email}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 mt-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
