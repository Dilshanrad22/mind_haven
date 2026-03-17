'use client';
import { Heart, Shield, Clock, Award, Users, BookOpen } from 'lucide-react';
import Navbar from '../../components/navbar';

export default function AboutPage() {
  const values = [
    { icon: Heart, title: 'Compassion', desc: 'We approach every interaction with empathy and understanding.' },
    { icon: Shield, title: 'Privacy', desc: 'Your information and sessions are 100% confidential.' },
    { icon: Clock, title: 'Accessibility', desc: 'Mental health support available 24/7, whenever you need it.' },
    { icon: Award, title: 'Excellence', desc: 'Licensed professionals committed to the highest standards.' },
  ];

  const stats = [
    { value: '500+', label: 'Licensed Counsellors' },
    { value: '10,000+', label: 'Users Helped' },
    { value: '24/7', label: 'Support Available' },
    { value: '50+', label: 'Specializations' },
  ];

  return (
    <div className="min-h-screen bg-[#D5FFE3]">
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Mind Haven</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            We believe everyone deserves access to quality mental health support. Mind Haven connects you with licensed professionals in a safe, confidential environment.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#00610B]">
            <h2 className="text-2xl font-bold text-[#00610B] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To make mental health care accessible, affordable, and stigma-free for everyone. We strive to create a platform where individuals can find the support they need, when they need it, from qualified professionals who truly care.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-[#16320D]">
            <h2 className="text-2xl font-bold text-[#16320D] mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A world where mental wellness is prioritized alongside physical health. We envision a future where seeking help for mental health is normalized, and quality support is just a click away for anyone who needs it.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F6FFF9]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-xl bg-green-50 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#00610B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#16320D] mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-green-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#00610B] mb-4">What We Do</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Mind Haven provides a comprehensive platform that connects individuals seeking mental health support with qualified counsellors and resources.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Users className="w-12 h-12 text-[#00610B] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Connect</h3>
            <p className="text-gray-600 text-sm">Find the right counsellor based on your needs, preferences, and schedule.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Heart className="w-12 h-12 text-[#00610B] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Heal</h3>
            <p className="text-gray-600 text-sm">Work with professionals through video, chat, or in-person sessions.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <BookOpen className="w-12 h-12 text-[#00610B] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Learn</h3>
            <p className="text-gray-600 text-sm">Access articles, guides, and resources to support your wellness journey.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-50 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#00610B] mb-4">Start Your Journey Today</h2>
          <p className="text-gray-600 mb-8">Take the first step towards better mental health. Join Mind Haven and connect with a counsellor who understands.</p>
          <a href="/pages/user-type" className="px-8 py-3 bg-[#00610B] text-white rounded-full font-semibold hover:bg-[#16320D] transition-colors">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
