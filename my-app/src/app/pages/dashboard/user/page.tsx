'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, BookOpen, User, Settings, LogOut, Heart, TrendingUp, Clock, ChevronRight, Search, Loader2 } from 'lucide-react';
import ApiService from '@/services/api';
import type { User as UserType, Appointment, Article } from '@/types';

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    if (!ApiService.isAuthenticated()) {
      router.push('/pages/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    try {
      const [userRes, upcomingRes, completedRes, articlesRes] = await Promise.all([
        ApiService.getCurrentUser(),
        ApiService.getAppointments({ status: 'confirmed', limit: 5 }),
        ApiService.getAppointments({ status: 'completed', limit: 1 }),
        ApiService.getArticles({ limit: 3 }),
      ]);

      if (userRes.success && userRes.data) setUser(userRes.data);
      if (upcomingRes.success && upcomingRes.data) setAppointments(upcomingRes.data);
      if (completedRes.success && completedRes.pagination) setSessionsCompleted(completedRes.pagination.total);
      if (articlesRes.success && articlesRes.data) setArticles(articlesRes.data);
    } catch {
      console.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    ApiService.logout();
    router.push('/pages/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  const userName = user?.name || 'User';
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';
  const nextAppointment = appointments[0];

  const getDoctorName = (apt: Appointment) => {
    const doc = typeof apt.doctorId === 'object' ? apt.doctorId : null;
    const docUser = doc?.userId && typeof doc.userId === 'object' ? doc.userId : null;
    return docUser?.name || 'Counsellor';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h2>
              <p className="text-green-100 text-lg">
                {sessionsCompleted > 0
                  ? `You've completed ${sessionsCompleted} sessions since ${joinedDate}`
                  : `Member since ${joinedDate}. Book your first session today!`}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{sessionsCompleted}</div>
                <div className="text-gray-600 text-sm">Sessions Completed</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{appointments.length}</div>
                <div className="text-gray-600 text-sm">Upcoming Sessions</div>
              </div>
            </div>

            {/* Find a Counsellor Banner */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
              <div>
                <h3 className="text-xl font-bold mb-1">Find a Counsellor</h3>
                <p className="text-emerald-100 text-sm">Browse volunteer mental health professionals and send a session request.</p>
              </div>
              <Link href="/pages/find-counsellors" className="flex-shrink-0 ml-4 px-5 py-3 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2">
                <Search className="w-4 h-4" />Browse
              </Link>
            </div>

            {/* Next Session Card */}
            {nextAppointment ? (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Next Session</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${nextAppointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {nextAppointment.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                    <User className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{getDoctorName(nextAppointment)}</h4>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(nextAppointment.date).toLocaleDateString()} at {nextAppointment.startTime}
                    </p>
                    <p className="text-gray-600 mt-1">Type: {nextAppointment.sessionType}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-bold text-gray-500 mb-2">No upcoming sessions</h3>
                <Link href="/pages/book-session" className="text-green-600 font-semibold hover:underline">Book your first session</Link>
              </div>
            )}

            {/* Upcoming Appointments */}
            {appointments.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                  <Link href="/pages/appointments" className="text-green-600 font-semibold hover:underline flex items-center gap-1">View All<ChevronRight className="w-4 h-4" /></Link>
                </div>
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <div key={apt._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{getDoctorName(apt)}</div>
                          <div className="text-sm text-gray-600">{new Date(apt.date).toLocaleDateString()} at {apt.startTime}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href="/pages/book-session" className="mt-6 block w-full py-3 bg-green-600 text-white text-center rounded-xl font-semibold hover:bg-green-700 transition-all">
                  Book New Session
                </Link>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  {user?.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.profileImage} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{userName}</h3>
                <p className="text-gray-600 text-sm">Member since {joinedDate}</p>
              </div>
              <div className="space-y-3">
                <Link href="/pages/find-counsellors" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Search className="w-5 h-5" /><span className="font-medium">Find Counsellors</span>
                </Link>
                <Link href="/pages/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <User className="w-5 h-5" /><span className="font-medium">My Profile</span>
                </Link>
                <Link href="/pages/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Settings className="w-5 h-5" /><span className="font-medium">Settings</span>
                </Link>
                <button type="button" onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-all text-red-600 w-full">
                  <LogOut className="w-5 h-5" /><span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Reading</h3>
              {articles.length > 0 ? (
                <div className="space-y-3">
                  {articles.map((article) => (
                    <div key={article._id} className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">{article.category}</span>
                        <span className="text-xs text-gray-500">{article.readTime} min</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{article.title}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">No articles available yet</p>
              )}
              <Link href="/pages/resources" className="mt-4 block w-full py-2 text-center text-green-600 font-semibold hover:underline">
                Explore All Resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
