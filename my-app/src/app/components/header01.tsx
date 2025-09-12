'use client';
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-[#D5FFE3]">
      <div className="max-w-full mx-auto px-6 lg:px-12  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text */}
        <div className="mt-(-20px) ml-10">
          <h1 className="text-7xl font-bold text-gray-900 leading-snug ml-5">
            Find Peace.<br />
            Find Balance.<br />
            Find You.
          </h1>
          <p className="mt-6 ml-5 text-lg text-gray-700">
            Mind Haven helps you manage stress,<br/> improve focus, 
            and nurture your mental being.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex space-x-50 ml-3">
            <button className="px-8 py-3 rounded-full bg-green-800 text-white font-medium hover:bg-green-900 transition">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-full bg-white text-green-800 font-medium border border-green-800 hover:bg-green-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center">
          <Image
            src="/images/hero01.png" // <-- replace with your uploaded image path
            alt="Mind Haven Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
