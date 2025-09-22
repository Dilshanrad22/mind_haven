'use client'

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className=" flex items-center justify-center bg-[#D5FFE3]">
      <div className="flex w-full max-w-full max bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Left side with background image */}
        <div className="hidden md:flex md:w-1/2 bg-[#e6f5ea] items-center justify-center p-6">
          <Image
            src="/images/background02.png" // save your background book image in public folder as book-bg.png
            alt="Learning background"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

        {/* Right side login form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/images/logo.png" // save your Mind Haven logo in public folder as logo.png
              alt="Mind Haven Logo"
              width={80}
              height={80}
              className="mb-2"
            />
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-500 text-center">
              Enter your login details to begin your learning journey
            </p>
          </div>

          {/* Form */}
          <form className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Enter your User Name"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
