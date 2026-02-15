'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Calendar, Eye, EyeOff } from "lucide-react";
import ApiService from '@/services/api';

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    email: '',
    dob: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      // Call backend API
      const result = await ApiService.signup({
        email: form.email,
        password: form.password,
        name: form.fullName,
        userType: 'user',
        phone: form.phone,
        dateOfBirth: form.dob,
        gender: form.gender as 'male' | 'female' | 'other',
      });

      if (result.success) {
        // Show success message
        alert('🎉 Account created successfully! Redirecting to login page...');
        
        // Redirect to login page after 1 second
        setTimeout(() => {
          router.push('/pages/login');
        }, 1000);
      } else {
        // Show error message
        alert(`Error: ${result.message || 'Failed to create account'}`);
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] via-emerald-50 to-white py-20 px-6">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-8 text-white">
            <div className="flex items-center gap-6">
              <Image 
                src="/images/logo.png" 
                alt="Mind Haven Logo" 
                width={80} 
                height={80}
                className="bg-white rounded-2xl p-2 shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">Create Your Account</h1>
                <p className="text-green-50 text-lg">Start your mental wellness journey today</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    name="userName"
                    value={form.userName}
                    onChange={onChange}
                    placeholder="johndoe123"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input
                    name="dob"
                    value={form.dob}
                    onChange={onChange}
                    type="date"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Terms */}
            <div className="mt-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 font-semibold hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-green-600 font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/pages/login" className="text-green-600 font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>

      <style jsx>{`
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
