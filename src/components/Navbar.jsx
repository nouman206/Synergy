import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/providers", label: "Providers" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="My Therapist Cares" className="h-14 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                pathname === l.to
                  ? "text-primary-700"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/providers"
            className="bg-primary-700 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-primary-800 transition-colors"
          >
            Find a Provider
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-600 hover:text-primary-700"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium ${
                pathname === l.to ? "text-primary-700" : "text-gray-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/providers"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center bg-primary-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Find a Provider
          </Link>
        </div>
      )}
    </nav>
  );
}
