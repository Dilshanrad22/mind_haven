'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, CheckCircle, Calendar, Clock, Video, MessageCircle, MapPin, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { DoctorProfile, User } from '@/types';

export default function BookSessionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [form, setForm] = useState({ date: '', startTime: '', sessionType: 'video' as string, issue: '', message: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!ApiService.isAuthenticated()) { router.push('/pages/login'); return; }
    fetchDoctors();
  }, [router]);

  const fetchDoctors = async () => {
    try {
      const res = await ApiService.getDoctors({ limit: 50 });
      if (res.success && res.data) setDoctors(res.data.doctors || []);
    } catch {
      console.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((d) => {
    const user = d.userId && typeof d.userId === 'object' ? (d.userId as User) : null;
    const name = user?.name?.toLowerCase() || '';
    return name.includes(search.toLowerCase()) || d.specialization.toLowerCase().includes(search.toLowerCase());
  });

  const handleSubmit = async () => {
    if (!selectedDoctor || !form.date || !form.startTime) return;
    setSubmitting(true);
    try {
      const res = await ApiService.createAppointment({
        doctorId: selectedDoctor._id,
        date: form.date,
        startTime: form.startTime,
        sessionType: form.sessionType,
        issue: form.issue,
        message: form.message,
      });
      if (res.success) setSuccess(true);
    } catch {
      console.error('Failed to create appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const getDoctorName = (d: DoctorProfile) => {
    const user = d.userId && typeof d.userId === 'object' ? (d.userId as User) : null;
    return user?.name || 'Counsellor';
  };

  if (success) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-[#00610B] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#16320D] mb-2">Session Requested!</h2>
          <p className="text-gray-600 mb-6">Your appointment request has been sent. You will be notified when the counsellor confirms.</p>
          <div className="flex gap-3 justify-center">
            <a href="/pages/appointments" className="px-6 py-2 bg-[#00610B] text-white rounded-full font-semibold hover:bg-[#16320D]">View Appointments</a>
            <a href="/pages/dashboard/user" className="px-6 py-2 border-2 border-[#00610B] text-[#00610B] rounded-full font-semibold hover:bg-green-50">Dashboard</a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-[#16320D] mb-2">Book a Session</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['Select Counsellor', 'Date & Time', 'Session Details', 'Confirm'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step > i + 1 ? 'bg-[#00610B] text-white' : step === i + 1 ? 'bg-[#00610B] text-white' : 'bg-gray-200 text-gray-500'}`}>{i + 1}</div>
              <span className={`text-sm hidden md:inline ${step === i + 1 ? 'text-[#00610B] font-semibold' : 'text-gray-400'}`}>{s}</span>
              {i < 3 && <div className="w-8 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Doctor */}
        {step === 1 && (
          <div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or specialization..." className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-[#00610B]" />
            </div>
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDoctors.map((d) => (
                  <button key={d._id} onClick={() => { setSelectedDoctor(d); setStep(2); }} className={`bg-white rounded-xl p-5 shadow-sm hover:shadow-md text-left transition border-2 ${selectedDoctor?._id === d._id ? 'border-[#00610B]' : 'border-transparent'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold text-lg">{getDoctorName(d).charAt(0)}</div>
                      <div>
                        <h3 className="font-bold text-[#16320D]">{getDoctorName(d)}</h3>
                        <p className="text-sm text-gray-500">{d.specialization}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />{d.rating}</span>
                      <span>{d.experience} yrs exp</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#16320D] mb-6">Choose Date & Time</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><Calendar className="w-4 h-4 inline mr-1" />Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split('T')[0]} aria-label="Select date" className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#00610B]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><Clock className="w-4 h-4 inline mr-1" />Time</label>
                <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} aria-label="Select time" className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#00610B]" />
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={() => setStep(3)} disabled={!form.date || !form.startTime} className="flex items-center gap-2 px-6 py-2 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] disabled:opacity-50">Next<ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 3: Session Details */}
        {step === 3 && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#16320D] mb-6">Session Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
              <div className="flex gap-3">
                {[{ value: 'video', icon: Video, label: 'Video' }, { value: 'chat', icon: MessageCircle, label: 'Chat' }, { value: 'in-person', icon: MapPin, label: 'In-Person' }].map((t) => (
                  <button key={t.value} onClick={() => setForm({ ...form, sessionType: t.value })} className={`flex items-center gap-2 px-5 py-3 rounded-lg border-2 font-medium ${form.sessionType === t.value ? 'border-[#00610B] bg-green-50 text-[#00610B]' : 'border-gray-200 text-gray-600'}`}>
                    <t.icon className="w-5 h-5" />{t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">What would you like to discuss?</label>
              <textarea value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} rows={3} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#00610B] resize-none" placeholder="Briefly describe your concern..." />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional message (optional)</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={2} className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#00610B] resize-none" placeholder="Any additional information..." />
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={() => setStep(4)} className="flex items-center gap-2 px-6 py-2 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D]">Review<ArrowRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && selectedDoctor && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#16320D] mb-6">Confirm Booking</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Counsellor</span><span className="font-semibold text-[#16320D]">{getDoctorName(selectedDoctor)}</span></div>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Specialization</span><span className="font-semibold">{selectedDoctor.specialization}</span></div>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Date</span><span className="font-semibold">{new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Time</span><span className="font-semibold">{form.startTime}</span></div>
              <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Session Type</span><span className="font-semibold capitalize">{form.sessionType}</span></div>
              {form.issue && <div className="flex justify-between py-3 border-b"><span className="text-gray-500">Concern</span><span className="font-semibold text-right max-w-xs">{form.issue}</span></div>}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(3)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700"><ArrowLeft className="w-4 h-4" />Back</button>
              <button onClick={handleSubmit} disabled={submitting} className="px-8 py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] disabled:opacity-50">
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
