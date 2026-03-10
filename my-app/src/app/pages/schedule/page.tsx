'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Video, MessageCircle, MapPin, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { Appointment } from '@/types';

export default function SchedulePage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week'>('week');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!ApiService.isAuthenticated()) { router.push('/pages/login'); return; }
    fetchAppointments();
  }, [router]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await ApiService.getAppointments({ limit: 100 });
      if (res.success && res.data) setAppointments(res.data);
    } catch {
      console.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const filteredAppointments = appointments.filter((a) => {
    if (filter !== 'all' && a.status !== filter) return false;
    const aptDate = new Date(a.date).toDateString();
    if (view === 'day') return aptDate === currentDate.toDateString();
    const weekDates = getWeekDates();
    return weekDates.some((d) => d.toDateString() === aptDate);
  });

  const navigate = (dir: number) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + (view === 'day' ? dir : dir * 7));
    setCurrentDate(d);
  };

  const statusColor = (s: string) => {
    const c: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700 border-yellow-300', confirmed: 'bg-green-100 text-green-700 border-green-300', completed: 'bg-blue-100 text-blue-700 border-blue-300', cancelled: 'bg-red-100 text-red-700 border-red-300' };
    return c[s] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const sessionIcon = (t: string) => {
    if (t === 'video') return <Video className="w-3.5 h-3.5" />;
    if (t === 'chat') return <MessageCircle className="w-3.5 h-3.5" />;
    return <MapPin className="w-3.5 h-3.5" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#16320D]">Schedule</h1>
          <div className="flex items-center gap-3">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter appointments by status" className="px-3 py-2 border rounded-lg text-sm outline-none">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex bg-white rounded-lg border">
              <button onClick={() => setView('day')} className={`px-4 py-2 text-sm font-medium rounded-l-lg ${view === 'day' ? 'bg-[#00610B] text-white' : 'text-gray-600'}`}>Day</button>
              <button onClick={() => setView('week')} className={`px-4 py-2 text-sm font-medium rounded-r-lg ${view === 'week' ? 'bg-[#00610B] text-white' : 'text-gray-600'}`}>Week</button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm mb-6">
          <button type="button" aria-label="Previous" onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
          <h2 className="text-lg font-bold text-[#16320D]">
            {view === 'day' ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : `Week of ${getWeekDates()[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${getWeekDates()[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
          </h2>
          <button type="button" aria-label="Next" onClick={() => navigate(1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
        ) : view === 'week' ? (
          <div className="grid grid-cols-7 gap-2">
            {getWeekDates().map((date) => {
              const dayApts = filteredAppointments.filter((a) => new Date(a.date).toDateString() === date.toDateString());
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div key={date.toISOString()} className={`bg-white rounded-xl p-3 min-h-[200px] ${isToday ? 'ring-2 ring-[#00610B]' : 'border'}`}>
                  <div className={`text-center mb-3 pb-2 border-b ${isToday ? 'text-[#00610B]' : 'text-gray-600'}`}>
                    <div className="text-xs font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className={`text-lg font-bold ${isToday ? 'text-[#00610B]' : ''}`}>{date.getDate()}</div>
                  </div>
                  <div className="space-y-2">
                    {dayApts.map((apt) => {
                      const user = typeof apt.userId === 'object' ? apt.userId : null;
                      return (
                        <div key={apt._id} className={`p-2 rounded-lg border text-xs ${statusColor(apt.status)}`}>
                          <div className="font-semibold truncate">{user?.name || 'Patient'}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />{apt.startTime}
                          </div>
                          <div className="flex items-center gap-1">{sessionIcon(apt.sessionType)}{apt.sessionType}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">No appointments for this day</p>
              </div>
            ) : filteredAppointments.map((apt) => {
              const user = typeof apt.userId === 'object' ? apt.userId : null;
              return (
                <div key={apt._id} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold">
                    {user?.name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#16320D]">{user?.name || 'Patient'}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{apt.startTime}</span>
                      <span className="flex items-center gap-1">{sessionIcon(apt.sessionType)}{apt.sessionType}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(apt.status)}`}>{apt.status}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
