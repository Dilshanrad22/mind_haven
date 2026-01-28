"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Heart,
  Shield,
  Users,
  Calendar,
  MessageCircle,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D5FFE3] to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-700"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold shadow-sm">
                  🌟 Your Mental Wellness Journey Starts Here
                </span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Find Peace.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Find Balance.
                </span>
                <br />
                Find You.
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Connect with professional counsellors, access personalized
                mental health resources, and take control of your emotional
                wellbeing in a safe, supportive environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/pages/user-type"
                  className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/pages/login"
                  className="px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-full font-semibold text-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center shadow-lg"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-green-600">500+</div>
                  <div className="text-gray-600 text-sm">Counsellors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">10k+</div>
                  <div className="text-gray-600 text-sm">Happy Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative animate-float">
              <div className="relative z-10">
                <Image
                  src="/images/meditation.png"
                  alt="Mental wellness meditation"
                  width={600}
                  height={600}
                  className="w-full h-auto drop-shadow-2xl"
                  priority
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Choose Mind Haven?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform offers everything you need for your
              mental wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Expert Counsellors",
                description:
                  "Connect with certified mental health professionals",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Shield,
                title: "100% Confidential",
                description: "Your privacy and security are our top priority",
                color: "from-emerald-500 to-teal-500",
              },
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Book sessions that fit your busy lifestyle",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: Heart,
                title: "Personalized Care",
                description: "Tailored treatment plans just for you",
                color: "from-cyan-500 to-green-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/mental-health.png"
                alt="Mental health care"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-gray-900">
                Your Journey to Better Mental Health
              </h2>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Create Your Account",
                    description:
                      "Sign up in minutes and complete your wellness profile",
                  },
                  {
                    step: "02",
                    title: "Find Your Counsellor",
                    description:
                      "Browse our vetted professionals and choose the perfect match",
                  },
                  {
                    step: "03",
                    title: "Book a Session",
                    description:
                      "Schedule your first appointment at a time that works for you",
                  },
                  {
                    step: "04",
                    title: "Start Healing",
                    description:
                      "Begin your journey to better mental health and wellbeing",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl font-bold text-gray-900">
                Access Mental Health Resources
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore our comprehensive library of articles, guides, and tools
                designed to support your mental wellness journey. Learn coping
                strategies, mindfulness techniques, and evidence-based
                practices.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    200+
                  </div>
                  <div className="text-gray-700">Articles & Guides</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    50+
                  </div>
                  <div className="text-gray-700">Video Sessions</div>
                </div>
              </div>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-all shadow-lg"
              >
                Explore Resources
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/images/book-plants.png"
                alt="Mental health resources"
                width={600}
                height={600}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-green-100">
              Real stories from real people
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Marketing Professional",
                text: "Mind Haven has been a game-changer for my mental health. The counsellors are compassionate and professional.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Software Engineer",
                text: "The flexible scheduling and online sessions make it so easy to prioritize my mental wellness.",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                role: "Teacher",
                text: "I finally found the support I needed. The platform is easy to use and the resources are incredibly helpful.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-lg mb-6 text-green-50">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-green-100 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of people who have found peace and balance with Mind
            Haven
          </p>
          <Link
            href="/pages/user-type"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Today
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
