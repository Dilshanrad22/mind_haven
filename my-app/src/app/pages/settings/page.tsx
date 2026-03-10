'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Bell, Shield, Lock, Loader2 } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState({ email: true, appointments: true, messages: true });
  const [privacy, setPrivacy] = useState({ publicProfile: true, allowMessages: true });
  const [passwords, setPasswords] = useState({ current: '', newPassword: '', confirm: '' });
  const [, setUserType] = useState('');

  useEffect(() => {
    if (!ApiService.isAuthenticated()) {
      router.push('/pages/login');
      return;
    }
    loadUser();
  }, [router]);

  const loadUser = async () => {
    try {
      const res = await ApiService.getCurrentUser();
      if (res.success && res.data) setUserType(res.data.userType);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwords.newPassword !== passwords.confirm) {
      setError('New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setSaving(true);
    // For now, use forgot password flow since no dedicated change-password endpoint
    setSuccess('To change your password, please use the Forgot Password feature.');
    setSaving(false);
    setPasswords({ current: '', newPassword: '', confirm: '' });
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#16320D] mb-8">Settings</h1>

        {/* Profile Link */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[#00610B]" />
            <h2 className="text-lg font-bold text-[#16320D]">Profile Settings</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">Update your personal information, profile picture, and bio.</p>
          <Link href="/pages/profile" className="text-[#00610B] font-semibold text-sm hover:underline">Edit Profile &rarr;</Link>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-[#00610B]" />
            <h2 className="text-lg font-bold text-[#16320D]">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
              { key: 'appointments', label: 'Appointment Reminders', desc: 'Get notified before sessions' },
              { key: 'messages', label: 'Message Alerts', desc: 'Notifications for new messages' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  aria-label={`Toggle ${item.label} ${notifications[item.key as keyof typeof notifications] ? 'off' : 'on'}`}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications[item.key as keyof typeof notifications] ? 'bg-[#00610B]' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#00610B]" />
            <h2 className="text-lg font-bold text-[#16320D]">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'publicProfile', label: 'Public Profile', desc: 'Allow others to see your profile' },
              { key: 'allowMessages', label: 'Allow Messages', desc: 'Receive messages from other users' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key as keyof typeof privacy] })}
                  aria-label={`Toggle ${item.label} ${privacy[item.key as keyof typeof privacy] ? 'off' : 'on'}`}
                  className={`w-12 h-6 rounded-full transition-colors relative ${privacy[item.key as keyof typeof privacy] ? 'bg-[#00610B]' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${privacy[item.key as keyof typeof privacy] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-[#00610B]" />
            <h2 className="text-lg font-bold text-[#16320D]">Change Password</h2>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
          {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">{success}</div>}
          <form onSubmit={handleChangePassword} className="space-y-3">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                id="current-password"
                type="password"
                placeholder="Current password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] outline-none"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                id="new-password"
                type="password"
                placeholder="New password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] outline-none"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] outline-none"
              />
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] disabled:opacity-50">
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
          <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-4">Once you delete your account, there is no going back.</p>
          <button
            aria-label="Delete account permanently"
            className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
