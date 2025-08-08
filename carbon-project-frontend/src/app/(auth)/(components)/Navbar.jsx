import Link from "next/link";

export default function Navbar({ buttonLabel = "Sign Up", buttonHref = "/signup" }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 relative z-10">
      {/* Logo Placeholder */}
      <div className="flex items-center">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
          <span className="text-white font-bold text-sm">LOGO</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-white hover:text-white/80 transition-colors font-medium">
          DoE List
        </a>
        <a href="#" className="text-white hover:text-white/80 transition-colors font-medium">
          Eligible Activity List
        </a>
      </div>

      {/* Action Button */}
      <Link href={buttonHref} className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-white/90 transition-colors font-medium">
        {buttonLabel}
      </Link>
    </nav>
  );
}
