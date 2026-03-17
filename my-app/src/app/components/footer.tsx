import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0f2a14] text-emerald-50 border-t border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold tracking-wide">Mind Haven</h3>
            <p className="text-emerald-200 text-sm mt-1">Support, guidance, and growth for every step of your journey.</p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/pages/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/pages/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/pages/resources" className="hover:text-white transition-colors">Blogs</Link>
            <Link href="/pages/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-900/40 text-xs text-emerald-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span>© {new Date().getFullYear()} Mind Haven. All rights reserved .</span>
          <div className="flex items-center gap-4">
            <Link href="/pages/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/pages/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-900/40 flex flex-col items-center justify-center gap-2">
          <Image
            src="/images/leo-club-logo.png"
            alt="Leo Club of University of Moratuwa"
            width={160}
            height={48}
            className="h-12 w-auto object-contain"
          />
          <p className="text-xs text-emerald-200">Powered by Leo Club of University of Moratuwa</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
