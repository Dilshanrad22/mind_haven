'use client';
import Image from "next/image";

const HeroSection02 = () => {
  return (
    <section className="bg-[#D5FFE3]">
      <div className="max-w-full mx-auto flex items-center gap-12 md:gap-20">
        
        {/* Left side - Image */}
        <div className="flex-1 flex justify-center ml-(-10)">
          <img 
            src="/images/hero02.png" 
            alt="Mental wellness illustration" 
            className="w-72 h-72 md:w-124 md:h-124 object-contain "
          />
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1">
          <h1 className="text-5xl md:text-5xl lg:text-5xl font-bold text-[#16320d] mb-6">
            Empower Your <br />
             Mental Wellness.
          </h1>
          <p className="text-[#16320d] text-lg leading-relaxed">
            At Mind Haven, we believe in empowering individuals to take control of their mental being. 
            <br />Our platform provides the tools and support needed to cultivate a calmer,<br /> more balanced life.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection02;