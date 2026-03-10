'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, User, Mail, Phone, Camera, Save,
  CheckCircle, AlertCircle, Loader2, Edit3, X
} from 'lucide-react';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  userType: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) { window.location.href = '/pages/login'; return; }

      const res = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        const u = data.data;
        setUser(u);
        setForm({ name: u.name || '', email: u.email || '', phone: u.phone || '' });
        setPreviewImage(u.profileImage || '');
      } else {
        setError('Failed to load profile. Please log in again.');
      }
    } catch {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be under 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setPreviewImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim()) { setError('Name cannot be empty.'); return; }
    if (!form.email.trim()) { setError('Email cannot be empty.'); return; }

    setSaving(true);
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          profileImage: previewImage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setUser((prev) => prev ? { ...prev, ...data.data } : prev);
        // Scroll to top to show success
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.message || 'Failed to save changes.');
      }
    } catch {
      setError('Could not connect to server. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
          <p className="text-gray-500 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/pages/dashboard/user"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold mb-1">My Profile</h1>
          <p className="text-green-100">Manage your personal information</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Success / Error Banners */}
        {success && (
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 shadow-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{success}</span>
            <button type="button" title="Close success message" onClick={() => setSuccess('')} className="ml-auto text-green-500 hover:text-green-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 shadow-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{error}</span>
            <button type="button" title="Close error message" onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">

          {/* Profile Picture Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-600" />
              Profile Picture
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar Preview */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-200 shadow-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  {previewImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-3xl">{initials}</span>
                  )}
                </div>
                {/* Camera button overlay */}
                <button
                  type="button"
                  title="Change profile picture"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Upload a clear photo of yourself. Max size: <strong>2MB</strong>. 
                  Supported formats: JPG, PNG, WEBP.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    {previewImage ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="px-5 py-2.5 border-2 border-red-200 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 transition-all flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                  title="Upload profile picture"
                  aria-label="Upload profile picture"
                />
              </div>
            </div>
          </div>

          {/* Personal Info Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-green-600" />
              Personal Information
            </h2>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1 text-green-600" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors text-gray-900 placeholder-gray-400 text-base"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1 text-green-600" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors text-gray-900 placeholder-gray-400 text-base"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1 text-green-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+94 77 123 4567"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-400 transition-colors text-gray-900 placeholder-gray-400 text-base"
                />
              </div>
            </div>
          </div>

          {/* Read-only Info */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-400 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Account Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Account Type</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold capitalize ${
                  user?.userType === 'doctor'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {user?.userType === 'doctor' ? '🩺 Counsellor' : '👤 User'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-500">Member Since</span>
                <span className="text-sm text-gray-700">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm font-semibold text-gray-500">User ID</span>
                <span className="text-xs text-gray-400 font-mono">{user?._id}</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
