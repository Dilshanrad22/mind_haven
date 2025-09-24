'use client'

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#e6f5ea]">
      {/* Background image */}
      <Image
        src="/images/background04.png"
        alt="Learning background"
        fill
        className="object-cover z-0"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      {/* Login card (enlarged) */}
  <div className="relative z-10 w-full max-w-md bg-[#f6fffa] border-2 border-[#35bc08] rounded-xl shadow-xl p-8 flex flex-col items-center transform translate-x-40 md:translate-x-100">
        <Image
          src="/images/logo.png"
          alt="Mind Haven Logo"
          width={120}
          height={120}
          className="mb-3"
        />
        <h2 className="text-3xl font-bold text-[#16320d] text-center">Welcome Back</h2>
        <p className="text-base text-[#16320d] text-center mb-6">
          Enter your login details to begin your learning journey
        </p>
        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your Email Address"
            className="w-full px-5 py-3 text-[#16320d] border rounded-full focus:outline-none focus:ring-2 focus:ring-[#00610B]"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full px-5 text-[#16320d] py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#00610B]"
          />
          <div className="flex justify-end">
            <a href="#" className="text-lg text-[#00610B] hover:underline">
              Forget Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#35bc08] text-white py-3 rounded-full hover:bg-[#175701] transition font-semibold text-lg shadow-lg"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-sm text-[#00610B] text-center">
          Dont have an account?{' '}
          <Link href="/signup" className="text-[#35bc08] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
