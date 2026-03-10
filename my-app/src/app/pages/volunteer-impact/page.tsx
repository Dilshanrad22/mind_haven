'use client';
import { Heart, Clock, Users, Award } from 'lucide-react';
import Navbar from '../../components/navbar';

export default function VolunteerImpactPage() {
  const stats = [
    { icon: Clock, value: '5,000+', label: 'Volunteer Hours' },
    { icon: Users, value: '2,500+', label: 'People Helped' },
    { icon: Heart, value: '800+', label: 'Sessions Donated' },
    { icon: Award, value: '150+', label: 'Volunteer Counsellors' },
  ];

  const testimonials = [
    { name: 'Dr. Amanda Silva', role: 'Clinical Psychologist', quote: 'Volunteering with Mind Haven has been incredibly rewarding. Being able to provide free sessions to those who cannot afford therapy is truly fulfilling.' },
    { name: 'Dr. Rajesh Kumar', role: 'Counselling Therapist', quote: 'The platform makes it easy to manage volunteer sessions alongside my regular practice. I can give back to the community while maintaining my schedule.' },
    { name: 'Dr. Priya Fernando', role: 'Mental Health Counsellor', quote: 'Mind Haven connects me with people who genuinely need help but lack resources. Every session makes a real difference in someone\'s life.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[#00610B] to-[#16320D] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Volunteer Impact</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our volunteer counsellors make mental health support accessible to everyone. See the difference they are making.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-7 h-7 text-[#00610B]" />
              </div>
              <div className="text-3xl font-bold text-[#16320D] mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How to Volunteer */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">How to Become a Volunteer</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Register as a Counsellor', desc: 'Create your account and complete your professional profile with your credentials and specializations.' },
              { step: '2', title: 'Verify Your License', desc: 'Submit your professional license for verification. Our team reviews credentials within 48 hours.' },
              { step: '3', title: 'Set Volunteer Hours', desc: 'Designate specific hours in your schedule for volunteer sessions. Even 2 hours a week makes a difference.' },
              { step: '4', title: 'Start Helping', desc: 'Connect with individuals in need and provide the support they deserve. Track your impact through your dashboard.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-[#00610B] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">{item.step}</div>
                <div>
                  <h3 className="text-lg font-bold text-[#16320D] mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-[#00610B] mb-12">Volunteer Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-[#00610B] font-bold text-lg">
                    {t.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#16320D]">{t.name}</h3>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#00610B] to-[#16320D] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-green-200 mb-8">Join our volunteer counsellor network and help make mental health support accessible to all.</p>
          <a href="/pages/signupDoc" className="inline-block px-8 py-3 bg-white text-[#00610B] rounded-full font-semibold hover:bg-green-50 transition">Become a Volunteer</a>
        </div>
      </section>
    </div>
  );
}
