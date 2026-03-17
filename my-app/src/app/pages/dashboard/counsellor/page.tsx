'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Users, Clock, Heart, Settings, TrendingUp, Video, MessageCircle, Award, ChevronRight, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import ApiService from '@/services/api';
import type { User, Appointment, DoctorProfile } from '@/types';

export default function CounsellorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [todaySchedule, setTodaySchedule] = useState<Appointment[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    if (!ApiService.isAuthenticated()) { router.push('/pages/login'); return; }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const [userRes, pendingRes, confirmedRes, completedRes] = await Promise.all([
        ApiService.getCurrentUser(),
        ApiService.getAppointments({ status: 'pending', limit: 50 }),
        ApiService.getAppointments({ status: 'confirmed', limit: 50 }),
        ApiService.getAppointments({ status: 'completed', limit: 1 }),
      ]);

      if (userRes.success && userRes.data) {
        setUser(userRes.data);
        if (userRes.data.doctorProfile) setDoctorProfile(userRes.data.doctorProfile);
      }
      if (pendingRes.success && pendingRes.data) setPendingRequests(pendingRes.data);
      if (confirmedRes.success && confirmedRes.data) {
        const today = new Date().toDateString();
        const todayApts = confirmedRes.data.filter((a: Appointment) => new Date(a.date).toDateString() === today);
        setTodaySchedule(todayApts);
      }
      if (completedRes.success && completedRes.pagination) setTotalClients(completedRes.pagination.total);
    } catch {
      console.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    try {
      const res = await ApiService.updateAppointmentStatus(id, 'confirmed');
      if (res.success) loadData();
    } catch { /* ignore */ }
  };

  const handleDecline = async (id: string) => {
    try {
      const res = await ApiService.updateAppointmentStatus(id, 'cancelled', { cancelReason: 'Declined by counsellor' });
      if (res.success) loadData();
    } catch { /* ignore */ }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  const counsellorName = user?.name || 'Counsellor';
  const rating = doctorProfile?.rating || 0;
  const reviews = doctorProfile?.totalReviews || 0;
  const specialization = doctorProfile?.specialization || 'General';

  const getPatientName = (apt: Appointment) => {
    const u = typeof apt.userId === 'object' ? apt.userId : null;
    return u?.name || 'Patient';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome, {counsellorName}!</h2>
              <p className="text-emerald-100 text-lg">You have {todaySchedule.length} sessions today and {pendingRequests.length} pending requests</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{rating}</div>
                  <div className="text-emerald-100 text-sm">Rating</div>
                </div>
                <div className="w-px h-16 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{reviews}</div>
                  <div className="text-emerald-100 text-sm">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center"><Users className="w-6 h-6 text-emerald-600" /></div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{totalClients}</div>
                <div className="text-gray-600 text-sm">Completed Sessions</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-blue-600" /></div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{todaySchedule.length}</div>
                <div className="text-gray-600 text-sm">Today&apos;s Sessions</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6 text-yellow-600" /></div>
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{pendingRequests.length}</div>
                <div className="text-gray-600 text-sm">Pending Requests</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center"><Heart className="w-6 h-6 text-pink-600" /></div>
                  <TrendingUp className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{rating}</div>
                <div className="text-gray-600 text-sm">Avg Rating</div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Today&apos;s Schedule</h3>
                <Link href="/pages/schedule" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                  View Full Calendar<ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              {todaySchedule.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No sessions scheduled for today</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todaySchedule.map((session, index) => (
                    <div key={session._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm">
                          <div className="text-xs text-gray-500">Session</div>
                          <div className="text-lg font-bold text-emerald-600">{index + 1}</div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{getPatientName(session)}</div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{session.startTime}</span>
                            <span className="flex items-center gap-1">
                              {session.sessionType === 'video' ? <Video className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                              {session.sessionType}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all">
                        Start Session
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Appointment Requests</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">{pendingRequests.length} Pending</span>
              </div>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-400">No pending requests</div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-1">{getPatientName(request)}</h4>
                          <p className="text-gray-600 text-sm">Requested: {new Date(request.date).toLocaleDateString()} at {request.startTime}</p>
                          {request.issue && (
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{request.issue}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={() => handleAccept(request._id)} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2">
                          <CheckCircle className="w-4 h-4" />Accept
                        </button>
                        <button type="button" onClick={() => handleDecline(request._id)} className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4" />Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{counsellorName}</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-2">{specialization}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">{'★'.repeat(Math.round(rating))}</div>
                <p className="text-gray-600 text-sm">{rating} ({reviews} reviews)</p>
              </div>
              <div className="space-y-3">
                <Link href="/pages/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Users className="w-5 h-5" /><span className="font-medium">My Profile</span>
                </Link>
                <Link href="/pages/messages" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <MessageCircle className="w-5 h-5" /><span className="font-medium">Messages</span>
                </Link>
                <Link href="/pages/availability" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Calendar className="w-5 h-5" /><span className="font-medium">Set Availability</span>
                </Link>
                <Link href="/pages/volunteer-impact" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Heart className="w-5 h-5" /><span className="font-medium">My Impact</span>
                </Link>
                <Link href="/pages/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Settings className="w-5 h-5" /><span className="font-medium">Settings</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
