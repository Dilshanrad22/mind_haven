'use client'

import Image from "next/image";
import Link from "next/link";
import { Calendar, MessageCircle, BookOpen, User, Bell, Settings, LogOut, Heart, TrendingUp, Clock, ChevronRight } from "lucide-react";

export default function UserDashboard() {
  const user = {
    name: "Sarah Johnson",
    avatar: "/images/logo.png",
    joinedDate: "January 2024",
    sessionsCompleted: 12,
    upcomingSession: {
      counsellor: "Dr. Michael Chen",
      date: "Tomorrow, 2:00 PM",
      type: "Video Call"
    }
  };

  const upcomingAppointments = [
    { id: 1, counsellor: "Dr. Michael Chen", date: "Jan 29, 2:00 PM", type: "Video", status: "confirmed" },
    { id: 2, counsellor: "Dr. Emily Rodriguez", date: "Feb 2, 10:00 AM", type: "Chat", status: "pending" }
  ];

  const recentArticles = [
    { id: 1, title: "Understanding Anxiety", category: "Anxiety", readTime: "5 min" },
    { id: 2, title: "Mindfulness Techniques", category: "Mindfulness", readTime: "8 min" },
    { id: 3, title: "Better Sleep Habits", category: "Sleep", readTime: "6 min" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50">
      
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
              <p className="text-green-100 text-lg">You've completed {user.sessionsCompleted} sessions since {user.joinedDate}</p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-16 h-16" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{user.sessionsCompleted}</div>
                <div className="text-gray-600 text-sm">Sessions Completed</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">3</div>
                <div className="text-gray-600 text-sm">Active Conversations</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-gray-600 text-sm">Articles Read</div>
              </div>
            </div>

            {/* Next Session Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Next Session</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Confirmed
                </span>
              </div>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <User className="w-10 h-10 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{user.upcomingSession.counsellor}</h4>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {user.upcomingSession.date}
                  </p>
                  <p className="text-gray-600 mt-1">Type: {user.upcomingSession.type}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Join Session
                </button>
                <button className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  Reschedule
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                <Link href="/appointments" className="text-green-600 font-semibold hover:underline flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{appointment.counsellor}</div>
                        <div className="text-sm text-gray-600">{appointment.date}</div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/book-session" className="mt-6 block w-full py-3 bg-green-600 text-white text-center rounded-xl font-semibold hover:bg-green-700 transition-all">
                Book New Session
              </Link>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                <p className="text-gray-600 text-sm">Member since {user.joinedDate}</p>
              </div>

              <div className="space-y-3">
                <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <User className="w-5 h-5" />
                  <span className="font-medium">My Profile</span>
                </Link>
                <Link href="/messages" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Messages</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </Link>
                <button className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl transition-all text-red-600 w-full">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>

            {/* Recommended Resources */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Reading</h3>
              
              <div className="space-y-3">
                {recentArticles.map((article) => (
                  <Link key={article.id} href={`/articles/${article.id}`} className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">{article.title}</h4>
                  </Link>
                ))}
              </div>

              <Link href="/resources" className="mt-4 block w-full py-2 text-center text-green-600 font-semibold hover:underline">
                Explore All Resources
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
