import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="mb-4">
            <img src="/logo-white.svg" alt="Synergy" className="h-10 w-auto" />
          </Link>
          <p className="text-primary-200 text-sm leading-relaxed max-w-md">
            Connecting you with trusted mental health professionals. Your
            journey to wellness starts here.
          </p>
          <div className="mt-4 text-primary-300 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Pembroke Pines, FL 33024</span>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-primary-400 text-xs">
          &copy; {new Date().getFullYear()} Synergy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
