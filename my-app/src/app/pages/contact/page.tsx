'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../components/navbar';

const CONTACT_SETTINGS = {
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'dulanjanassd@gmail.com',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '0717646067',
  supportAddress: process.env.NEXT_PUBLIC_SUPPORT_ADDRESS || 'University of Moratuwa',
  supportHours: process.env.NEXT_PUBLIC_SUPPORT_HOURS || '24 h',
  emergencyLine: process.env.NEXT_PUBLIC_EMERGENCY_LINE || '0781385218',
  mapLabel: process.env.NEXT_PUBLIC_CONTACT_MAP_LABEL || 'University of Moratuwa',
};

const SUBJECT_OPTIONS = [
  { value: 'general', label: 'General Question' },
  { value: 'account', label: 'Account and Login Help' },
  { value: 'appointment', label: 'Appointment Support' },
  { value: 'billing', label: 'Billing and Payments' },
  { value: 'partnership', label: 'Partnership and Media' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = [
    { icon: Mail, title: 'Email', value: CONTACT_SETTINGS.supportEmail },
    { icon: Phone, title: 'Phone', value: CONTACT_SETTINGS.supportPhone },
    { icon: MapPin, title: 'Address', value: CONTACT_SETTINGS.supportAddress },
    { icon: Clock, title: 'Hours', value: CONTACT_SETTINGS.supportHours },
  ];

  const faqs = [
    {
      q: 'How soon will I receive a response?',
      a: 'Our support team usually responds within 4 business hours for standard requests and within 1 business hour for appointment-related issues.',
    },
    {
      q: 'Is my personal and therapy information confidential?',
      a: 'Yes. Mind Haven follows strict confidentiality practices. Data shared through the platform is handled according to our privacy policy and local data protection standards.',
    },
    {
      q: 'Can I reschedule or cancel a session?',
      a: 'Yes. You can manage upcoming sessions from your dashboard. For urgent scheduling issues, contact support and include your booking email.',
    },
    {
      q: 'What if I need immediate medical or crisis support?',
      a: `If this is an emergency, call your local emergency line immediately (Sri Lanka: ${CONTACT_SETTINGS.emergencyLine}). Mind Haven support is not a replacement for emergency medical services.`,
    },
    {
      q: 'Do you support organizations and universities?',
      a: 'Yes. We provide customized mental wellness programs for organizations, schools, and universities. Select Partnership and Media in the contact form to reach our team.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">Our clinical support and customer success teams are here to help you with appointments, account access, and wellness guidance.</p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
          <h2 className="text-lg font-bold text-red-800 mb-1">Need urgent help?</h2>
          <p className="text-red-700 text-sm">
            If you are in immediate danger or experiencing a mental health crisis, call emergency services now.
            {' '}Sri Lanka emergency line: <span className="font-semibold">{CONTACT_SETTINGS.emergencyLine}</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#00610B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#00610B] mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thanks for reaching out. Our team will contact you shortly using the details you provided.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'general', message: '' }); }} className="mt-6 text-[#00610B] font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-[#16320D] mb-6">Send us a message</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input id="contact-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">Work or Personal Email</label>
                    <input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select id="contact-subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none bg-white">
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none resize-none" placeholder="How can we help?" />
                  </div>
                  <p className="text-xs text-gray-500">By submitting this form, you consent to being contacted by our support team regarding your request.</p>
                  <button type="submit" className="w-full py-3 bg-[#00610B] text-white rounded-lg font-semibold hover:bg-[#16320D] transition-colors">Send Message</button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {contactInfo.map((c) => (
                <div key={c.title} className="bg-white rounded-xl p-5 shadow-md">
                  <c.icon className="w-8 h-8 text-[#00610B] mb-3" />
                  <h3 className="font-bold text-[#16320D] text-sm">{c.title}</h3>
                  <p className="text-gray-600 text-sm">{c.value}</p>
                </div>
              ))}
            </div>
            {/* Map placeholder */}
            <div className="bg-green-100 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#00610B] mx-auto mb-2" />
                <p className="text-[#16320D] font-semibold">{CONTACT_SETTINGS.mapLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50">
                  <span className="font-semibold text-[#16320D]">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
