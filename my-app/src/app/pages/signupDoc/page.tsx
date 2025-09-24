'use client'

import Image from "next/image";
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: '',
    userName: '',
    email: '',
    dob: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simple client-side validation example
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // TODO: submit to API
    console.log('submit', form);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#e6f5ea] p-6">
      {/* Background image */}
      <Image
        src="/images/background04.png"
        alt="Learning background"
        fill
        className="object-cover z-0"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

  <div className="relative z-10 w-full max-w-4xl bg-white border-2 border-[#35bc08] rounded-xl shadow-lg p-8 transform translate-x-6 md:translate-x-80">
        <div className="flex items-center gap-4 mb-6">
          <Image src="/images/logo.png" alt="Mind Haven Logo" width={84} height={84} />
          <div>
            <h1 className="text-4xl font-bold text-[#16320d]">Sign up</h1>
            <p className="text-m text-[#16320d]">Enter your details below to create your account and get started.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-m text-[#16320d]">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              placeholder="Enter your Full name"
              className="mt-1 w-full px-4 py-2  text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">User Name</label>
            <input
              name="userName"
              value={form.userName}
              onChange={onChange}
              placeholder="Enter your user name"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Email address</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              placeholder="Enter your Email address"
              className="mt-1 w-full px-4 py-2  text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Date of Birth</label>
            <input
              name="dob"
              value={form.dob}
              onChange={onChange}
              type="date"
              placeholder="DD/MM/YYYY"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]"> Counsellor ID</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Enter your Counsellor ID"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Enter your Phone Number"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Gender</label>
            <input
              name="gender"
              value={form.gender}
              onChange={onChange}
              placeholder="Enter your gender"
              className="mt-1 w-full px-4 py-2 text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div>
            <label className="text-m text-[#16320d]">Confirm Password</label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              type="password"
              placeholder="Confirm your password"
              className="mt-1 w-full px-4 py-2  text-[#16320d] border rounded-full placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-[#16320d]"
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between mt-2">
            <button
              type="submit"
              className="bg-[#35bc08] text-white px-8 py-2 rounded-full shadow-md hover:bg-[#175701] transition"
            >
              Sign Up
            </button>

            <div className="text-sm text-[#00610B]">
              Already have an account? <a href="/login" className="text-[#35bc08] underline">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
