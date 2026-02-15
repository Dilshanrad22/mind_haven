'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Phone, Calendar, Eye, EyeOff, Briefcase, Award } from "lucide-react";
import ApiService from '@/services/api';

export default function SignupDocPage() {
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
    counsellorId: '',
    specialization: '',
    yearsExperience: '',
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
      // Call backend API to create doctor account
      const result = await ApiService.signup({
        email: form.email,
        password: form.password,
        name: form.fullName,
        userType: 'doctor', // This is a DOCTOR account
        phone: form.phone,
        dateOfBirth: form.dob,
        gender: form.gender as 'male' | 'female' | 'other',
      });

      if (result.success) {
        // Show success message
        alert('🎉 Doctor account created successfully! Redirecting to login page...');
        
        // Redirect to login page after 1 second
        setTimeout(() => {
          router.push('/pages/login');
        }, 1000);
      } else {
        // Show error message
        alert(`Error: ${result.message || 'Failed to create account'}`);
      }
    } catch (error: unknown) {
      console.error('Doctor signup error:', error);
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden">
          
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-10 py-8 text-white">
            <div className="flex items-center gap-6">
              <Image 
                src="/images/logo.png" 
                alt="Mind Haven Logo" 
                width={80} 
                height={80}
                className="bg-white rounded-2xl p-2 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-6 h-6" />
                  <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Counsellor Registration</span>
                </div>
                <h1 className="text-4xl font-bold mb-2">Join Our Network</h1>
                <p className="text-emerald-50 text-lg">Help people on their mental wellness journey</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="p-10">
            
            {/* Professional Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-600" />
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Counsellor ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Professional License ID *
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <input
                      name="counsellorId"
                      value={form.counsellorId}
                      onChange={onChange}
                      placeholder="LIC-12345678"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={onChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
                    required
                  >
                    <option value="">Select Specialization</option>
                    <option value="anxiety">Anxiety & Stress</option>
                    <option value="depression">Depression</option>
                    <option value="relationships">Relationships</option>
                    <option value="trauma">Trauma & PTSD</option>
                    <option value="addiction">Addiction</option>
                    <option value="family">Family Therapy</option>
                    <option value="child">Child Psychology</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Years of Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    name="yearsExperience"
                    value={form.yearsExperience}
                    onChange={onChange}
                    type="number"
                    min="0"
                    placeholder="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-emerald-600" />
                Personal Information
              </h3>
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
                      placeholder="Dr. Jane Smith"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      placeholder="drjanesmith"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      placeholder="dr.jane@example.com"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-gray-900"
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
            </div>

            {/* Terms */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  required
                />
                <span className="text-sm text-gray-700">
                  I certify that I am a licensed mental health professional and agree to the{' '}
                  <Link href="/counsellor-terms" className="text-emerald-600 font-semibold hover:underline">
                    Counsellor Agreement
                  </Link>,{' '}
                  <Link href="/terms" className="text-emerald-600 font-semibold hover:underline">
                    Terms of Service
                  </Link>, and{' '}
                  <Link href="/privacy" className="text-emerald-600 font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Register as Counsellor'}
              </button>

              <p className="text-gray-600">
                Already registered?{' '}
                <Link href="/pages/login" className="text-emerald-600 font-bold hover:underline">
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
