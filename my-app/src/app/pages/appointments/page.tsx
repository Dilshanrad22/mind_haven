'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Video, MessageCircle, MapPin, Star, X, Loader2 } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { Appointment } from '@/types';

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [reviewModal, setReviewModal] = useState<{ appointmentId: string; doctorId: string } | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!ApiService.isAuthenticated()) {
      router.push('/pages/login');
      return;
    }
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const statusMap = { upcoming: 'pending,confirmed', completed: 'completed', cancelled: 'cancelled' };
      const statuses = statusMap[activeTab].split(',');
      const allAppointments: Appointment[] = [];
      for (const status of statuses) {
        const res = await ApiService.getAppointments({ status, limit: 50 });
        if (res.success && res.data) allAppointments.push(...res.data);
      }
      setAppointments(allAppointments);
    } catch {
      console.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    try {
      const res = await ApiService.cancelAppointment(id, 'Cancelled by user');
      if (res.success) fetchAppointments();
    } catch {
      console.error('Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  };

  const handleReview = async () => {
    if (!reviewModal) return;
    setSubmitting(true);
    try {
      await ApiService.createReview({ doctorId: reviewModal.doctorId, appointmentId: reviewModal.appointmentId, rating, comment });
      setReviewModal(null);
      setRating(5);
      setComment('');
    } catch {
      console.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const sessionIcon = (type: string) => {
    if (type === 'video') return <Video className="w-4 h-4" />;
    if (type === 'chat') return <MessageCircle className="w-4 h-4" />;
    return <MapPin className="w-4 h-4" />;
  };

  const statusColor = (status: string) => {
    const colors: Record<string, string> = { pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', completed: 'bg-blue-100 text-blue-700', cancelled: 'bg-red-100 text-red-700', rescheduled: 'bg-purple-100 text-purple-700' };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#16320D] mb-8">My Appointments</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['upcoming', 'completed', 'cancelled'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full font-medium capitalize transition-colors ${activeTab === tab ? 'bg-[#00610B] text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-400">No {activeTab} appointments</h3>
            {activeTab === 'upcoming' && (
              <a href="/pages/find-counsellors" className="inline-block mt-4 px-6 py-2 bg-[#00610B] text-white rounded-full text-sm hover:bg-[#16320D]">Find a Counsellor</a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const doctor = typeof apt.doctorId === 'object' ? apt.doctorId : null;
              const doctorUser = doctor?.userId && typeof doctor.userId === 'object' ? doctor.userId : null;
              const doctorName = doctorUser?.name || 'Counsellor';
              return (
                <div key={apt._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold text-lg">
                        {doctorName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#16320D]">{doctorName}</h3>
                        {doctor && <p className="text-sm text-gray-500">{doctor.specialization}</p>}
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(apt.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{apt.startTime}</span>
                          <span className="flex items-center gap-1">{sessionIcon(apt.sessionType)}{apt.sessionType}</span>
                        </div>
                        {apt.issue && <p className="text-sm text-gray-600 mt-2">{apt.issue}</p>}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(apt.status)}`}>{apt.status}</span>
                      {(apt.status === 'pending' || apt.status === 'confirmed') && (
                        <button onClick={() => handleCancel(apt._id)} disabled={cancellingId === apt._id} className="text-red-500 text-xs hover:underline">
                          {cancellingId === apt._id ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                      {apt.status === 'completed' && doctor && (
                        <button onClick={() => setReviewModal({ appointmentId: apt._id, doctorId: doctor._id })} className="text-[#00610B] text-xs hover:underline">Leave Review</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#16320D]">Leave a Review</h3>
              <button type="button" aria-label="Close review modal" onClick={() => setReviewModal(null)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" aria-label={`Rate ${s} stars`} onClick={() => setRating(s)}>
                  <Star className={`w-8 h-8 ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-[#00610B] outline-none resize-none" />
            <button onClick={handleReview} disabled={submitting} className="w-full py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
