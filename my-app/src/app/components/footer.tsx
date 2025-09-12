'use client';

import React from 'react';
import { Facebook, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div className="max-w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
              {/* Replace with your actual logo */}
              <img 
                src="logo.png" 
                alt="Mind Haven Logo" 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  // Fallback lotus icon if logo.png doesn't load
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                  }
                }}
              />
              <div className="w-10 h-10 text-green-600 hidden">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C11 2 10.09 2.38 9.4 3L12 8L14.6 3C13.91 2.38 13 2 12 2M8.5 4.5C7.84 4.97 7.35 5.66 7.13 6.5L11 12L8.5 4.5M15.5 4.5L13 12L16.87 6.5C16.65 5.66 16.16 4.97 15.5 4.5M6 8C5.45 8.55 5.13 9.27 5.13 10H10L6 8M18 8L14 10H18.87C18.87 9.27 18.55 8.55 18 8M5 12C5 13.1 5.9 14 7 14H17C18.1 14 19 13.1 19 12H5M7 16C6.45 16 6 16.45 6 17S6.45 18 7 18H17C17.55 18 18 17.55 18 17S17.55 16 17 16H7Z"/>
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">MIND HAVEN</h3>
              <p className="text-green-100 text-sm">Mental Wellness Center</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8">
            <a 
              href="/about" 
              className="text-white hover:text-green-200 transition-colors duration-300 font-medium hover:underline decoration-2 underline-offset-4"
            >
              About Us
            </a>
            <a 
              href="/contact" 
              className="text-white hover:text-green-200 transition-colors duration-300 font-medium hover:underline decoration-2 underline-offset-4"
            >
              Contact Us
            </a>
            <a 
              href="/privacy" 
              className="text-white hover:text-green-200 transition-colors duration-300 font-medium hover:underline decoration-2 underline-offset-4"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-white hover:text-green-200 transition-colors duration-300 font-medium hover:underline decoration-2 underline-offset-4"
            >
              Terms of Use
            </a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-900 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-900 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
            {/* X (Twitter) */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-green-800 rounded-lg flex items-center justify-center hover:bg-green-900 transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white bg-opacity-20 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-green-100 text-sm">
          <p>
            Copyright 2025 MindHaven.com. All Rights Reserved - Built with 
            <span className="font-semibold text-white"> Volusion</span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
    </footer>
  );
};

export default Footer;