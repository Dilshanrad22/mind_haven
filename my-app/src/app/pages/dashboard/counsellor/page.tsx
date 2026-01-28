'use client'

import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, Clock, DollarSign, Bell, Settings, LogOut, TrendingUp, Video, MessageCircle, Award, ChevronRight, CheckCircle, XCircle } from "lucide-react";

export default function CounsellorDashboard() {
  const counsellor = {
    name: "Dr. Michael Chen",
    specialization: "Anxiety & Stress Management",
    rating: 4.9,
    reviews: 127,
    joinedDate: "June 2023",
    totalClients: 42,
    monthlyEarnings: 5240
  };

  const todaySchedule = [
    { id: 1, client: "Sarah J.", time: "10:00 AM", type: "Video", status: "upcoming" },
    { id: 2, client: "John D.", time: "2:00 PM", type: "Chat", status: "upcoming" },
    { id: 3, client: "Emily R.", time: "4:30 PM", type: "Video", status: "upcoming" }
  ];

  const pendingRequests = [
    { id: 1, client: "Alex Thompson", requestedDate: "Jan 30, 3:00 PM", issue: "Anxiety" },
    { id: 2, client: "Maria Garcia", requestedDate: "Jan 31, 10:00 AM", issue: "Depression" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Counsellor Dashboard</h1>
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Good morning, {counsellor.name}! ☀️</h2>
              <p className="text-emerald-100 text-lg">You have {todaySchedule.length} sessions scheduled for today</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{counsellor.rating}</div>
                  <div className="text-emerald-100 text-sm">Rating</div>
                </div>
                <div className="w-px h-16 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-1">{counsellor.reviews}</div>
                  <div className="text-emerald-100 text-sm">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{counsellor.totalClients}</div>
                <div className="text-gray-600 text-sm">Total Clients</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{todaySchedule.length}</div>
                <div className="text-gray-600 text-sm">Today's Sessions</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{pendingRequests.length}</div>
                <div className="text-gray-600 text-sm">Pending Requests</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">${counsellor.monthlyEarnings}</div>
                <div className="text-gray-600 text-sm">This Month</div>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Today's Schedule</h3>
                <Link href="/schedule" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                  View Full Calendar
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {todaySchedule.map((session, index) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-white rounded-xl shadow-sm">
                        <div className="text-xs text-gray-500">Session</div>
                        <div className="text-lg font-bold text-emerald-600">{index + 1}</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 mb-1">{session.client}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {session.type === 'Video' ? <Video className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                            {session.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all">
                      Start Session
                    </button>
                  </div>
                ))}
              </div>

              {todaySchedule.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No sessions scheduled for today</p>
                </div>
              )}
            </div>

            {/* Pending Appointment Requests */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Appointment Requests</h3>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                  {pendingRequests.length} Pending
                </span>
              </div>

              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{request.client}</h4>
                        <p className="text-gray-600 text-sm">Requested: {request.requestedDate}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {request.issue}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                      <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{counsellor.name}</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-2">{counsellor.specialization}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-600 text-sm">{counsellor.rating} ({counsellor.reviews} reviews)</p>
              </div>

              <div className="space-y-3">
                <Link href="/profile" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">My Profile</span>
                </Link>
                <Link href="/messages" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">Messages</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">5</span>
                </Link>
                <Link href="/availability" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Set Availability</span>
                </Link>
                <Link href="/earnings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all text-gray-700">
                  <DollarSign className="w-5 h-5" />
                  <span className="font-medium">Earnings</span>
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

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Block Time Off
                </button>
                <button className="w-full px-4 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all">
                  View Client List
                </button>
                <button className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                  Generate Report
                </button>
              </div>
            </div>

            {/* This Week Overview */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Sessions</span>
                  <span className="text-2xl font-bold">18</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">New Clients</span>
                  <span className="text-2xl font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-100">Earnings</span>
                  <span className="text-2xl font-bold">$1,240</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
