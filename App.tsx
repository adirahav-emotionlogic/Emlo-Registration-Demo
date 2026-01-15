
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, AuthState } from './types';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import { apiService } from './services/apiService';

// Registration Flow Components
const RegistrationFlow = ({ onAuthSuccess }: { onAuthSuccess: (user: User) => void }) => {
  const [step, setStep] = useState(1); // 1: Register, 2: Verify
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    organizationName: '',
    receiveNewsEmails: true
  });

  const [verifyForm, setVerifyForm] = useState({
    code: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiService.register({
        captchaToken: "mock_token",
        user: {
          email,
          password: "[AUTO_GENERATE]",
          firstName: regForm.firstName,
          lastName: regForm.lastName,
          organizationName: regForm.organizationName,
          receiveNewsEmails: regForm.receiveNewsEmails,
          returnUrl: "/settings/users"
        },
        query: { returnUrl: "/settings/users" }
      });
      if (response.success) {
        setStep(2);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyForm.password !== verifyForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiService.verifyEmail({
        email,
        emailVerificationCode: verifyForm.code,
        Password: verifyForm.password,
        confirmPassword: verifyForm.confirmPassword
      });
      if (response.success && response.user) {
        onAuthSuccess({
          ...response.user,
          email,
          firstName: regForm.firstName,
          lastName: regForm.lastName
        });
      } else {
        setError(response.message || 'Verification failed');
      }
    } catch (err) {
      setError('An unexpected error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">Emlo Management</h2>
          <p className="mt-2 text-sm text-gray-500">
            {step === 1 ? 'Create your organization account' : 'Verify your email to continue'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-4" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="First Name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={regForm.firstName}
                onChange={e => setRegForm({...regForm, firstName: e.target.value})}
              />
              <input
                required
                placeholder="Last Name"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={regForm.lastName}
                onChange={e => setRegForm({...regForm, lastName: e.target.value})}
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              required
              placeholder="Organization Name"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={regForm.organizationName}
              onChange={e => setRegForm({...regForm, organizationName: e.target.value})}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="news"
                checked={regForm.receiveNewsEmails}
                onChange={e => setRegForm({...regForm, receiveNewsEmails: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="news" className="ml-2 block text-sm text-gray-900">Receive news and updates</label>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Processing...' : 'Create Account'}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleVerify}>
            <div className="text-sm text-center text-gray-600 mb-4">
              We've sent a code to <span className="font-semibold">{email}</span>
            </div>
            <input
              required
              placeholder="Verification Code"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={verifyForm.code}
              onChange={e => setVerifyForm({...verifyForm, code: e.target.value})}
            />
            <input
              required
              type="password"
              placeholder="Create Password"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={verifyForm.password}
              onChange={e => setVerifyForm({...verifyForm, password: e.target.value})}
            />
             <input
              required
              type="password"
              placeholder="Confirm Password"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={verifyForm.confirmPassword}
              onChange={e => setVerifyForm({...verifyForm, confirmPassword: e.target.value})}
            />
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Verifying...' : 'Verify & Finish'}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-sm text-blue-600 hover:underline"
            >
              Back to Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Protected Layout
const Layout = ({ auth, onLogout }: { auth: AuthState; onLogout: () => void }) => {
  if (!auth.isAuthenticated || !auth.user) {
    return <Navigate to="/register" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={auth.user} onLogout={onLogout} />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route 
            path="settings/users" 
            element={<UserManagementPage user={auth.user} onUnauthorized={onLogout} />} 
          />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth_session');
    return saved ? JSON.parse(saved) : { user: null, isAuthenticated: false };
  });

  const handleAuthSuccess = (user: User) => {
    const newState = { user, isAuthenticated: true };
    setAuth(newState);
    localStorage.setItem('auth_session', JSON.stringify(newState));
  };

  const handleLogout = () => {
    const newState = { user: null, isAuthenticated: false };
    setAuth(newState);
    localStorage.removeItem('auth_session');
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/register" 
          element={
            auth.isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <RegistrationFlow onAuthSuccess={handleAuthSuccess} />
          } 
        />
        <Route 
          path="/*" 
          element={<Layout auth={auth} onLogout={handleLogout} />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
