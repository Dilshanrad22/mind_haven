'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users, UserCheck, Stethoscope, Calendar, FileText, Star,
  TrendingUp, Activity, CheckCircle, XCircle, Clock, AlertCircle,
  Search, Filter, Eye, Ban, Shield, LogOut
} from 'lucide-react';
import ApiService from '@/services/api';

interface Stats {
  overview: {
    totalUsers: number;
    totalDoctors: number;
    totalAdmins: number;
    totalAppointments: number;
    totalArticles: number;
    totalReviews: number;
  };
  users: {
    active: number;
    inactive: number;
    recentRegistrations: number;
  };
  doctors: {
    verified: number;
    unverified: number;
    recentRegistrations: number;
  };
  appointments: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

interface Doctor {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    isActive: boolean;
  };
  specialization: string;
  licenseNumber: string;
  experience: number;
  rating: number;
  totalReviews: number;
  consultationFee: number;
  isVerified: boolean;
  createdAt?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'doctors'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      if (!ApiService.isAuthenticated()) {
        router.push('/pages/login');
        return;
      }

      try {
        const result = await ApiService.getCurrentUser();
        if (!result.success || result.data.userType !== 'admin') {
          alert('Access denied. Admin privileges required.');
          router.push('/pages/login');
          return;
        }

        // Fetch admin data
        await Promise.all([
          fetchStats(),
          fetchUsers(),
          fetchDoctors(),
        ]);
      } catch (error) {
        console.error('Error checking admin status:', error);
        router.push('/pages/login');
      }
    };

    checkAdmin();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching admin stats...');
      const result = await ApiService.getAdminStats();
      console.log('Stats result:', result);
      if (result.success) {
        console.log('✓ Stats loaded:', result.data);
        setStats(result.data);
      } else {
        console.error('❌ Stats fetch failed:', result.message);
        alert(`Failed to load stats: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      alert('Error loading stats. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      console.log('👥 Fetching users...');
      const result = await ApiService.getAdminUsers({ page: 1, limit: 10 });
      console.log('Users result:', result);
      if (result.success) {
        console.log(`✓ Loaded ${result.data.users.length} users`);
        setUsers(result.data.users);
      } else {
        console.error('❌ Users fetch failed:', result.message);
        alert(`Failed to load users: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      alert('Error loading users. Check console for details.');
    }
  };

  const fetchDoctors = async () => {
    try {
      console.log('👨‍⚕️ Fetching doctors...');
      const result = await ApiService.getAdminDoctors({ page: 1, limit: 10 });
      console.log('Doctors result:', result);
      if (result.success) {
        console.log(`✓ Loaded ${result.data.doctors.length} doctors`);
        setDoctors(result.data.doctors);
      } else {
        console.error('❌ Doctors fetch failed:', result.message);
        alert(`Failed to load doctors: ${result.message}`);
      }
    } catch (error) {
      console.error('❌ Error fetching doctors:', error);
      alert('Error loading doctors. Check console for details.');
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const result = await ApiService.toggleUserStatus(userId);
      if (result.success) {
        alert(result.message);
        await fetchUsers();
      }
    } catch (error) {
      alert('Error updating user status');
    }
  };

  const handleToggleDoctorVerification = async (doctorId: string) => {
    try {
      const result = await ApiService.toggleDoctorVerification(doctorId);
      if (result.success) {
        alert(result.message);
        await fetchDoctors();
      }
    } catch (error) {
      alert('Error updating doctor verification');
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    router.push('/pages/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-white flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Mind Haven Platform Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-10 h-10 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.overview.totalUsers}</h3>
              <p className="text-gray-600 font-medium">Total Users</p>
              <p className="text-sm text-green-600 mt-2">
                +{stats.users.recentRegistrations} this month
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <Stethoscope className="w-10 h-10 text-emerald-500" />
                <UserCheck className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.overview.totalDoctors}</h3>
              <p className="text-gray-600 font-medium">Total Doctors</p>
              <p className="text-sm text-emerald-600 mt-2">
                {stats.doctors.verified} verified
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-10 h-10 text-purple-500" />
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.overview.totalAppointments}</h3>
              <p className="text-gray-600 font-medium">Total Appointments</p>
              <p className="text-sm text-purple-600 mt-2">
                {stats.appointments.pending} pending
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-10 h-10 text-yellow-500" />
                <FileText className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.overview.totalReviews}</h3>
              <p className="text-gray-600 font-medium">Total Reviews</p>
              <p className="text-sm text-yellow-600 mt-2">
                {stats.overview.totalArticles} articles
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold transition-all ${activeTab === 'overview'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-semibold transition-all ${activeTab === 'users'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Users ({stats?.overview.totalUsers})
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-4 py-2 font-semibold transition-all ${activeTab === 'doctors'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              Doctors ({stats?.overview.totalDoctors})
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                User Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-bold text-green-600">{stats.users.active}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Inactive Users</span>
                  <span className="font-bold text-red-600">{stats.users.inactive}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recent Registrations</span>
                  <span className="font-bold text-blue-600">{stats.users.recentRegistrations}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-emerald-500" />
                Doctor Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Verified Doctors</span>
                  <span className="font-bold text-green-600">{stats.doctors.verified}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pending Verification</span>
                  <span className="font-bold text-orange-600">{stats.doctors.unverified}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Recent Registrations</span>
                  <span className="font-bold text-blue-600">{stats.doctors.recentRegistrations}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:col-span-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-500" />
                Appointment Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.appointments.pending}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.appointments.confirmed}</p>
                  <p className="text-sm text-gray-600">Confirmed</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.appointments.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stats.appointments.cancelled}</p>
                  <p className="text-sm text-gray-600">Cancelled</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">User Management</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(user =>
                      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{user.phone || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleUserStatus(user._id)}
                            className={`px-3 py-1 rounded-lg text-white text-sm ${user.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                              }`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Doctor Management</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Specialization</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Experience</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Fee (LKR)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors
                    .filter(doc =>
                      doc.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((doctor) => (
                      <tr key={doctor._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{doctor.userId.name}</td>
                        <td className="py-3 px-4">{doctor.specialization}</td>
                        <td className="py-3 px-4">{doctor.experience} yrs</td>
                        <td className="py-3 px-4 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                          <span className="text-xs text-gray-500">({doctor.totalReviews})</span>
                        </td>
                        <td className="py-3 px-4">{doctor.consultationFee}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doctor.isVerified ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {doctor.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleDoctorVerification(doctor._id)}
                            className={`px-3 py-1 rounded-lg text-white text-sm ${doctor.isVerified ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                              }`}
                          >
                            {doctor.isVerified ? 'Unverify' : 'Verify'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
