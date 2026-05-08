import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          <Link to="/" className="mb-4">
            <img src="/logo-white.svg" alt="My Therapist Cares" className="h-14 w-auto" />
          </Link>
          <p className="text-primary-200 text-sm leading-relaxed max-w-md">
            Connecting you with trusted mental health professionals. Your
            journey to wellness starts here.
          </p>
        </div>

        <div className="border-t border-primary-800 mt-10 pt-6 text-center text-primary-400 text-xs">
          &copy; {new Date().getFullYear()} My Therapist Cares. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
