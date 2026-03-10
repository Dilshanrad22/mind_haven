'use client';
import { Video, MessageCircle, Users, BookOpen, Phone, Shield } from 'lucide-react';
import Navbar from '../../components/navbar';

export default function ServicesPage() {
  const services = [
    { icon: Video, title: 'Video Sessions', desc: 'Face-to-face counselling from the comfort of your home.', features: ['HD video quality', 'Screen sharing', 'Session recording (with consent)', 'Flexible scheduling'] },
    { icon: MessageCircle, title: 'Chat Support', desc: 'Text-based counselling for those who prefer writing.', features: ['Real-time messaging', 'Async communication', 'File sharing', 'Chat history'] },
    { icon: Users, title: 'Individual Counselling', desc: 'One-on-one sessions with licensed professionals.', features: ['Personalized treatment', 'Goal-oriented approach', 'Progress tracking', 'Multiple specializations'] },
    { icon: Phone, title: 'In-Person Sessions', desc: 'Traditional face-to-face meetings with your counsellor.', features: ['Local counsellors', 'Comfortable settings', 'Direct interaction', 'Flexible locations'] },
    { icon: BookOpen, title: 'Mental Health Resources', desc: 'Educational content to support your wellness journey.', features: ['200+ articles', 'Video guides', 'Self-help tools', 'Expert-written content'] },
    { icon: Shield, title: 'Crisis Support', desc: 'Immediate help when you need it most.', features: ['Priority access', 'Trained responders', 'Safety planning', '24/7 availability'] },
  ];

  const steps = [
    { num: '01', title: 'Create Account', desc: 'Sign up in minutes with a free account.' },
    { num: '02', title: 'Find Your Counsellor', desc: 'Browse profiles and find the right match.' },
    { num: '03', title: 'Book a Session', desc: 'Choose your preferred time and session type.' },
    { num: '04', title: 'Start Healing', desc: 'Begin your journey to better mental health.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Comprehensive mental health support tailored to your needs. Choose the service that works best for you.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <s.icon className="w-7 h-7 text-[#00610B]" />
              </div>
              <h3 className="text-xl font-bold text-[#16320D] mb-2">{s.title}</h3>
              <p className="text-gray-600 mb-4">{s.desc}</p>
              <ul className="space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 bg-[#00610B] rounded-full mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.num} className="text-center relative">
                <div className="text-5xl font-bold text-green-100 mb-2">{s.num}</div>
                <h3 className="text-lg font-bold text-[#16320D] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
                {i < 3 && <div className="hidden md:block absolute top-8 right-0 w-1/2 h-0.5 bg-green-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-[#16320D] mb-2">Free</h3>
            <p className="text-gray-500 mb-4">Get started with basic features</p>
            <div className="text-4xl font-bold text-[#00610B] mb-6">$0<span className="text-lg text-gray-400">/mo</span></div>
            <ul className="space-y-3 mb-8">
              {['Browse counsellors', 'Read articles & resources', '1 chat session/month', 'Community support'].map((f) => (
                <li key={f} className="flex items-center text-gray-600"><span className="text-green-500 mr-2">&#10003;</span>{f}</li>
              ))}
            </ul>
            <a href="/pages/user-type" className="block text-center py-3 border-2 border-[#00610B] text-[#00610B] rounded-full font-semibold hover:bg-green-50 transition">Get Started</a>
          </div>
          <div className="bg-gradient-to-br from-[#00610B] to-[#16320D] rounded-2xl p-8 shadow-lg text-white">
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-green-200 mb-4">Full access to all features</p>
            <div className="text-4xl font-bold mb-6">$29<span className="text-lg text-green-200">/mo</span></div>
            <ul className="space-y-3 mb-8">
              {['Unlimited sessions', 'Video & chat support', 'Priority booking', 'Progress tracking', 'Crisis support', 'All resources access'].map((f) => (
                <li key={f} className="flex items-center text-green-100"><span className="mr-2">&#10003;</span>{f}</li>
              ))}
            </ul>
            <a href="/pages/user-type" className="block text-center py-3 bg-white text-[#00610B] rounded-full font-semibold hover:bg-green-50 transition">Get Premium</a>
          </div>
        </div>
      </section>
    </div>
  );
}
