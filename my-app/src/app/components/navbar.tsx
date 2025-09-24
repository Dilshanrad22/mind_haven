import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#D5FFE3]  z-50">
      <div className="w-full ml-5px px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo.png" // replace with your lotus logo path
              alt="Mind Haven Logo"
              className="h-17 w-17"
            />
            <span className="text-[#00610B] font-bold text-2xl mt-2">MIND HAVEN</span>
          </div>
          
          {/* Links */}
          <div className="hidden md:flex ml-100 space-x-20">
            <Link href="/" className="text-[#00610B] text-xl hover:text-[#16320d] ">
              Home
            </Link>
            <Link href="/about" className="text-[#00610B] text-xl hover:text-[#16320d] ">
              About Us
            </Link>
            <Link
              href="/services"
              className="text-[#00610B] text-xl hover:text-[#16320d]  "
            >
              Services
            </Link>
          </div>
          
          {/* Contact Button */}
          <div className="ml-auto">
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full bg-[#16320d] text-white hover:bg-green-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;