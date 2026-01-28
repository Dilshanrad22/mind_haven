'use client'

import Image from "next/image";
import Link from "next/link";
import { User, Briefcase, ArrowRight } from "lucide-react";

export default function UserTypePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D5FFE3] via-emerald-50 to-green-50 flex items-center justify-center p-6">
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Image
            src="/images/logo.png"
            alt="Mind Haven Logo"
            width={100}
            height={100}
            className="mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Mind Haven</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose how you'd like to continue your mental wellness journey
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* User Card */}
          <Link href="/pages/signup" className="group">
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-green-500 overflow-hidden">
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  I'm Looking for Help
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Connect with professional mental health counsellors, book sessions, 
                  and access resources to support your wellbeing journey.
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {[
                    "Browse certified counsellors",
                    "Book flexible appointments",
                    "Access mental health resources",
                    "Track your wellness progress"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold text-lg group-hover:shadow-lg transition-all">
                  <span>Sign Up as User</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Counsellor Card */}
          <Link href="/pages/signupDoc" className="group">
            <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-emerald-500 overflow-hidden">
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  I'm a Counsellor
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Join our network of mental health professionals. Manage your practice, 
                  connect with clients, and make a difference in people's lives.
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {[
                    "Manage your client appointments",
                    "Set your own availability",
                    "Secure video consultations",
                    "Professional dashboard tools"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-semibold text-lg group-hover:shadow-lg transition-all">
                  <span>Sign Up as Counsellor</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

        </div>

        {/* Already have account */}
        <div className="text-center mt-10 animate-fade-in">
          <p className="text-gray-600 text-lg">
            Already have an account?{' '}
            <Link href="/pages/login" className="text-green-600 font-semibold hover:text-green-700 hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>

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

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
