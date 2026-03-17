'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';
import Footer from './footer';

interface LayoutShellProps {
  children: React.ReactNode;
}

const LayoutShell = ({ children }: LayoutShellProps) => {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/pages/dashboard');

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default LayoutShell;
