'use client';
import { useState } from 'react';
import { Mail, Key, CheckCircle } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await ApiService.forgotPassword(email);
      if (res.success && res.data) {
        setToken(res.data.resetToken);
        setStep(2);
      } else {
        setError(res.message || 'Failed to send reset token');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await ApiService.resetPassword(token, password);
      if (res.success) {
        setStep(3);
      } else {
        setError(res.message || 'Failed to reset password');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 min-h-screen flex items-start justify-center px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-[#00610B] text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleRequestToken}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#00610B]" />
                </div>
                <h2 className="text-2xl font-bold text-[#16320D]">Forgot Password?</h2>
                <p className="text-gray-500 mt-2">Enter your email to receive a reset token.</p>
              </div>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#00610B] outline-none" />
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] transition disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Token'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-[#00610B]" />
                </div>
                <h2 className="text-2xl font-bold text-[#16320D]">Reset Password</h2>
                <p className="text-gray-500 mt-2">Your reset token has been generated.</p>
              </div>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-500 mb-1">Your reset token:</p>
                <p className="text-sm font-mono text-[#00610B] break-all">{token}</p>
              </div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-[#00610B] outline-none" />
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#00610B] outline-none" />
              <button type="submit" disabled={loading} className="w-full py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] transition disabled:opacity-50">
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#00610B]" />
              </div>
              <h2 className="text-2xl font-bold text-[#16320D] mb-2">Password Reset!</h2>
              <p className="text-gray-500 mb-6">You can now log in with your new password.</p>
              <a href="/pages/login" className="inline-block px-8 py-3 bg-[#00610B] text-white rounded-full font-semibold hover:bg-[#16320D] transition">Go to Login</a>
            </div>
          )}

          {step !== 3 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{' '}
              <a href="/pages/login" className="text-[#00610B] font-semibold hover:underline">Log in</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
