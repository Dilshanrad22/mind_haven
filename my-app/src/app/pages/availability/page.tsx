'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Save, Loader2 } from 'lucide-react';
import Navbar from '../../components/navbar';
import ApiService from '@/services/api';
import type { AvailableSlot } from '@/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export default function AvailabilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [slots, setSlots] = useState<Record<string, { enabled: boolean; startTime: string; endTime: string }>>({});

  useEffect(() => {
    if (!ApiService.isAuthenticated()) { router.push('/pages/login'); return; }
    loadProfile();
  }, [router]);

  const loadProfile = async () => {
    try {
      const res = await ApiService.getDoctorProfile();
      if (res.success && res.data) {
        const initial: Record<string, { enabled: boolean; startTime: string; endTime: string }> = {};
        DAYS.forEach((day) => {
          const existing = res.data!.availableSlots?.find((s: AvailableSlot) => s.day === day);
          initial[day] = existing ? { enabled: true, startTime: existing.startTime, endTime: existing.endTime } : { enabled: false, startTime: '09:00', endTime: '17:00' };
        });
        setSlots(initial);
      }
    } catch {
      // Initialize defaults
      const initial: Record<string, { enabled: boolean; startTime: string; endTime: string }> = {};
      DAYS.forEach((day) => { initial[day] = { enabled: false, startTime: '09:00', endTime: '17:00' }; });
      setSlots(initial);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const availableSlots: AvailableSlot[] = [];
    DAYS.forEach((day) => {
      if (slots[day]?.enabled) {
        availableSlots.push({ day, startTime: slots[day].startTime, endTime: slots[day].endTime });
      }
    });
    try {
      const res = await ApiService.updateDoctorProfile({ availableSlots });
      if (res.success) setSuccess(true);
    } catch {
      console.error('Failed to save');
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50"><Navbar />
      <div className="pt-24 flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-[#00610B]" /></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24 max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#16320D]">Manage Availability</h1>
            <p className="text-gray-500 mt-1">Set your weekly schedule for appointments</p>
          </div>
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {success && <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 font-medium">Availability updated successfully!</div>}

        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day} className={`bg-white rounded-xl p-5 shadow-sm flex items-center gap-6 ${slots[day]?.enabled ? '' : 'opacity-60'}`}>
              <button type="button" onClick={() => setSlots({ ...slots, [day]: { ...slots[day], enabled: !slots[day]?.enabled } })} aria-label={`Toggle ${day} availability`} className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${slots[day]?.enabled ? 'bg-[#00610B]' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${slots[day]?.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
              <span className="w-28 font-semibold text-[#16320D]">{day}</span>
              {slots[day]?.enabled ? (
                <div className="flex items-center gap-3 flex-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input type="time" value={slots[day]?.startTime} onChange={(e) => setSlots({ ...slots, [day]: { ...slots[day], startTime: e.target.value } })} aria-label={`${day} start time`} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] outline-none" />
                  <span className="text-gray-400">to</span>
                  <input type="time" value={slots[day]?.endTime} onChange={(e) => setSlots({ ...slots, [day]: { ...slots[day], endTime: e.target.value } })} aria-label={`${day} end time`} className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] outline-none" />
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Unavailable</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
