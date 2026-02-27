import { useEffect } from "react";
import ProviderDetailPanel from "./ProviderDetailPanel";

export default function MobileDetailSheet({ provider, distance, onClose }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Handle + close */}
        <div className="sticky top-0 bg-white z-10 px-5 pt-3 pb-2 border-b border-gray-100">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-2" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">Provider Details</span>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <ProviderDetailPanel provider={provider} distance={distance} />
      </div>
    </div>
  );
}
