import { useEffect, useRef } from "react";

export default function FilterPopover({ open, onClose, title, children }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      const clickedInDesktop = desktopRef.current?.contains(e.target);
      const clickedInMobile = mobileRef.current?.contains(e.target);
      // Also check if click was on the chip button (parent)
      const clickedOnChip = e.target.closest("[data-chip-button]");
      if (!clickedInDesktop && !clickedInMobile && !clickedOnChip) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll on mobile when open
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(max-width: 767px)");
    if (mql.matches) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Mobile: bottom sheet */}
      <div className="md:hidden fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div
        ref={mobileRef}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto animate-slide-up"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>

      {/* Desktop: dropdown popover */}
      <div
        ref={desktopRef}
        className="hidden md:block absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-40 min-w-[240px] max-h-[400px] overflow-y-auto"
      >
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
