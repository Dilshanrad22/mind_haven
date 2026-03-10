'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../../components/navbar';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'support@mindhaven.com' },
    { icon: Phone, title: 'Phone', value: '+94 11 234 5678' },
    { icon: MapPin, title: 'Address', value: 'Colombo, Sri Lanka' },
    { icon: Clock, title: 'Hours', value: 'Mon-Fri 9AM-6PM' },
  ];

  const faqs = [
    { q: 'How do I book my first session?', a: 'Create an account, browse our counsellors, and click "Request a Session" on any counsellor\'s profile. Choose your preferred date, time, and session type.' },
    { q: 'Is my information confidential?', a: 'Absolutely. We follow strict privacy protocols and all communications between you and your counsellor are encrypted and confidential.' },
    { q: 'Can I change my counsellor?', a: 'Yes, you can switch counsellors at any time. Simply browse our directory and book a session with a different counsellor.' },
    { q: 'What if I need urgent help?', a: 'If you are in immediate danger, please call your local emergency services. For non-emergency urgent support, use our crisis support feature for priority access.' },
    { q: 'How much does it cost?', a: 'We offer both free and premium plans. Free users get limited sessions, while premium subscribers enjoy unlimited access to all features.' },
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
          <p className="text-xl text-green-100 max-w-3xl mx-auto">Have questions? We&#39;d love to hear from you.</p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#00610B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#00610B] mb-2">Message Sent!</h3>
                <p className="text-gray-600">We&#39;ll get back to you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'general', message: '' }); }} className="mt-6 text-[#00610B] font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-[#16320D] mb-6">Send us a message</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none bg-white">
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00610B] focus:border-transparent outline-none resize-none" placeholder="How can we help?" />
                  </div>
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
                <p className="text-[#16320D] font-semibold">Colombo, Sri Lanka</p>
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
