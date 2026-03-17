'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Bell } from 'lucide-react';
import ApiService from '@/services/api';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const auth = ApiService.isAuthenticated();
    setIsLoggedIn(auth);
    if (auth) {
      ApiService.getCurrentUser().then((res) => {
        if (res.success && res.data) setUserType(res.data.userType);
      }).catch(() => {});
      ApiService.getUnreadNotificationCount().then((res) => {
        if (res.success && res.data) setUnreadCount(res.data.count);
      }).catch(() => {});
    }
  }, []);

  const loggedInLinks = [
    { href: '/pages/services', label: 'Services' },
    { href: '/pages/resources', label: 'Blogs' },
    { href: '/pages/about', label: 'About Us' },
    { href: '/pages/contact', label: 'Contact Us' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#D5FFE3] z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <Image src="/images/logo.png" alt="Mind Haven Logo" width={68} height={68} className="h-17 w-17" />
            <Link href="/" className="text-[#00610B] font-bold text-2xl mt-2">MIND HAVEN</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex ml-auto items-center space-x-8">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="text-[#00610B] text-lg hover:text-[#16320d]">Home</Link>
                <Link href="/pages/about" className="text-[#00610B] text-lg hover:text-[#16320d]">About Us</Link>
                <Link href="/pages/services" className="text-[#00610B] text-lg hover:text-[#16320d]">Services</Link>
                <Link href="/pages/contact" className="px-5 py-2 rounded-full bg-[#16320d] text-white hover:bg-green-700">Contact Us</Link>
              </>
            ) : (
              <>
                {loggedInLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="text-[#00610B] text-lg hover:text-[#16320d]">{item.label}</Link>
                ))}
                <div className="relative">
                  <Link href="/pages/settings" className="text-[#00610B] hover:text-[#16320d]">
                    <Bell className="w-5 h-5" />
                  </Link>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden ml-auto p-2">
            {mobileOpen ? <X className="w-6 h-6 text-[#00610B]" /> : <Menu className="w-6 h-6 text-[#00610B]" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {!isLoggedIn ? (
              <>
                <Link href="/" className="block py-2 text-[#00610B]">Home</Link>
                <Link href="/pages/about" className="block py-2 text-[#00610B]">About Us</Link>
                <Link href="/pages/services" className="block py-2 text-[#00610B]">Services</Link>
                <Link href="/pages/contact" className="block py-2 text-[#00610B]">Contact Us</Link>
              </>
            ) : (
              <>
                {loggedInLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="block py-2 text-[#00610B]">{item.label}</Link>
                ))}
                <Link href="/pages/settings" className="block py-2 text-[#00610B]">Settings</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
