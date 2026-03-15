'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Filter, Star, Users, Clock, Award, Heart,
  MessageCircle, ChevronLeft, X, CheckCircle, Loader2,
  MapPin, Calendar, Video, Send
} from 'lucide-react';

interface Doctor {
  _id: string;
  specialization: string;
  experience: number;
  rating: number;
  totalReviews: number;
  bio: string;
  services: string[];
  isVerified: boolean;
  availableSlots: { day: string; startTime: string; endTime: string }[];
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string;
  };
}

interface RequestForm {
  issue: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  sessionType: 'Video' | 'Chat' | 'In-Person';
}

export default function FindCounsellorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalError, setModalError] = useState('');
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [form, setForm] = useState<RequestForm>({
    issue: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    sessionType: 'Video',
  });

  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (specFilter) params.append('specialization', specFilter);
      const res = await fetch(`${API}/api/doctors?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data.doctors);
      } else {
        setError('Failed to load counsellors.');
      }
    } catch {
      setError('Could not connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, [specFilter]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctors.filter((d) => {
    const name = d.userId?.name?.toLowerCase() || '';
    const spec = d.specialization?.toLowerCase() || '';
    const q = search.toLowerCase();
    return name.includes(q) || spec.includes(q);
  });

  function openRequestModal(doctor: Doctor) {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/pages/login');
      return;
    }
    setSelectedDoctor(doctor);
    setForm({ issue: '', message: '', preferredDate: '', preferredTime: '', sessionType: 'Video' });
    setSuccessMsg('');
    setModalError('');
    setShowModal(true);
  }

  async function handleSubmitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDoctor) return;
    setSubmitting(true);
    setModalError('');
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (!token) {
        setModalError('Please log in to continue.');
        setSubmitting(false);
        return;
      }
      const res = await fetch(`${API}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          doctorId: selectedDoctor._id,
          date: form.preferredDate,
          startTime: form.preferredTime,
          sessionType: form.sessionType.toLowerCase(),
          issue: form.issue,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
        setModalError('');
      } else {
        setModalError(data.message || 'Failed to send request.');
      }
    } catch {
      setModalError('Could not send request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const specializations = [...new Set(doctors.map((d) => d.specialization))];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] to-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/pages/dashboard/user"
            className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Find a Counsellor 🩺</h1>
          <p className="text-green-100 text-lg max-w-xl">
            Browse our volunteer mental health professionals and send a session request.
            All counsellors are here to help — free of charge.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl text-gray-900 outline-none shadow-lg focus:ring-2 focus:ring-white/50"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                aria-label="Filter counsellors by specialization"
                value={specFilter}
                onChange={(e) => setSpecFilter(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-2xl text-gray-900 outline-none shadow-lg appearance-none bg-white focus:ring-2 focus:ring-white/50"
              >
                <option value="">All Specializations</option>
                {specializations.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-gray-900">{filteredDoctors.length}</span>
            <span>counsellors available</span>
          </div>
          {search || specFilter ? (
            <button
              onClick={() => { setSearch(''); setSpecFilter(''); }}
              className="text-sm text-green-600 hover:underline flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Clear filters
            </button>
          ) : null}
        </div>

        {/* Error */}
        {error && !showModal && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            <p className="text-gray-500">Loading counsellors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-24">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No counsellors found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-xl">
                        {doctor.userId?.name?.charAt(0) || 'D'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-lg truncate">
                          {doctor.userId?.name || 'Unknown'}
                        </h3>
                        {doctor.isVerified && (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" aria-label="Verified" />
                        )}
                      </div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {doctor.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex">{renderStars(doctor.rating)}</div>
                    <span className="font-semibold text-gray-800">{doctor.rating.toFixed(1)}</span>
                    <span className="text-gray-500 text-sm">({doctor.totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 text-emerald-500" />
                      <span>{doctor.experience} yrs experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span>Volunteer</span>
                    </div>
                  </div>

                  {/* Bio */}
                  {doctor.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {doctor.bio}
                    </p>
                  )}

                  {/* Services */}
                  {doctor.services?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.services.slice(0, 3).map((service, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          {service}
                        </span>
                      ))}
                      {doctor.services.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs">
                          +{doctor.services.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Available Days */}
                  {doctor.availableSlots?.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                      <Clock className="w-4 h-4" />
                      <span>Available: {doctor.availableSlots.map((s) => s.day.slice(0, 3)).join(', ')}</span>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => openRequestModal(doctor)}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Request a Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-3xl text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Request a Session</h2>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setSuccessMsg(''); setModalError(''); }}
                  aria-label="Close modal"
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-lg">
                  {selectedDoctor.userId?.name?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold">{selectedDoctor.userId?.name}</div>
                  <div className="text-green-100 text-sm">{selectedDoctor.specialization}</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Success State */}
              {successMsg ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent! 🎉</h3>
                  <p className="text-gray-600 mb-6">{successMsg}</p>
                  <button
                    onClick={() => { setShowModal(false); setSuccessMsg(''); setModalError(''); }}
                    className="px-8 py-3 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-all"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  {modalError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
                      {modalError}
                    </div>
                  )}

                  {/* Issue / Concern */}
                  <div>
                    <label htmlFor="issue-input" className="block text-sm font-semibold text-gray-700 mb-1">
                      What brings you here? <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="issue-input"
                      required
                      type="text"
                      value={form.issue}
                      onChange={(e) => setForm({ ...form, issue: e.target.value })}
                      placeholder="e.g. Anxiety, Stress, Depression, Relationship issues..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors text-black placeholder:text-black"
                    />
                  </div>

                  {/* Session Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Session Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Video', 'Chat', 'In-Person'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm({ ...form, sessionType: type })}
                          className={`py-2 px-3 rounded-xl border-2 text-sm font-semibold transition-all flex items-center justify-center gap-1 ${form.sessionType === type
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 text-gray-600 hover:border-green-300'
                            }`}
                        >
                          {type === 'Video' && <Video className="w-4 h-4" />}
                          {type === 'Chat' && <MessageCircle className="w-4 h-4" />}
                          {type === 'In-Person' && <MapPin className="w-4 h-4" />}
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="date-input" className="block text-sm font-semibold text-gray-700 mb-1">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Preferred Date
                      </label>
                      <input
                        id="date-input"
                        type="date"
                        value={form.preferredDate}
                        onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors text-sm text-black"
                      />
                    </div>
                    <div>
                      <label htmlFor="time-input" className="block text-sm font-semibold text-gray-700 mb-1">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Preferred Time
                      </label>
                      <input
                        id="time-input"
                        type="time"
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        aria-label="Preferred time"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors text-sm text-black"
                      />
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label htmlFor="message-input" className="block text-sm font-semibold text-gray-700 mb-1">
                      Additional message (optional)
                    </label>
                    <textarea
                      id="message-input"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell the counsellor anything else that might help them prepare..."
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-400 transition-colors resize-none text-black placeholder:text-black"
                    />
                    <div className="text-xs text-gray-400 text-right">{form.message.length}/500</div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Session Request
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-500">
                    Your request will be sent to the counsellor. They will respond soon.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
