import { useState, useEffect, useRef, useCallback } from "react";
import {
  SPECIALTIES,
  LANGUAGES,
  THERAPY_TYPES,
  SESSION_TYPES,

} from "../data/providers";

/* ── Dropdown ── */
function Dropdown({ open, onClose, title, children }) {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (desktopRef.current?.contains(e.target) || mobileRef.current?.contains(e.target)) return;
      onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    if (window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/40 z-50" onClick={onClose} />
      <div ref={mobileRef} className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto animate-slide-up">
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

      <div ref={desktopRef} className="hidden md:block absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] min-w-[250px] max-h-[360px] overflow-y-auto">
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

/* ── Checkbox list ── */
function CheckList({ options, selected, onChange }) {
  return (
    <div className="space-y-0.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt])}
            className="rounded border-gray-300 text-primary-700 focus:ring-primary-500 w-4 h-4"
          />
          <span className={selected.includes(opt) ? "font-medium text-primary-700" : ""}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

/* ── Radio list ── */
function RadioList({ options, value, onChange }) {
  return (
    <div className="space-y-0.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer py-2 px-3 rounded-lg hover:bg-primary-50 transition-colors">
          <input
            type="radio"
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="border-gray-300 text-primary-700 focus:ring-primary-500 w-4 h-4"
          />
          <span className={value === opt ? "font-medium text-primary-700" : ""}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

/* ── Filter trigger button (for dark bg) ── */
function FilterButton({ value, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full h-[46px] flex items-center justify-between gap-2 px-4 rounded-xl text-left
        cursor-pointer transition-all duration-200
        ${active
          ? "bg-white text-gray-900 shadow-md"
          : "bg-white text-gray-900 hover:bg-white/90"
        }
      `}
    >
      <p className="text-sm truncate font-semibold text-gray-900">{value}</p>
      <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
}

/* ── Main ── */
export default function FilterChipBar({ filters, setFilters, onReset }) {
  const [openFilter, setOpenFilter] = useState(null);
  const toggle = useCallback((name) => setOpenFilter((p) => (p === name ? null : name)), []);
  const close = useCallback(() => setOpenFilter(null), []);

  const specialtyLabel = filters.specialties.length > 0
    ? filters.specialties.length === 1 ? filters.specialties[0] : `${filters.specialties.length} selected`
    : "All Concerns";
  const therapyLabel = filters.therapyType || "All Types";
  const sessionLabel = filters.sessionType || "In Clinic/Telehealth";
  const langLabel = filters.languages.length > 0
    ? filters.languages.length === 1 ? filters.languages[0] : `${filters.languages.length} selected`
    : "Any Language";
  const hasActiveFilters =
    filters.age || filters.therapyType || filters.specialties.length > 0 ||
    filters.sessionType || filters.languages.length > 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Age */}
        <div className={`
          h-[46px] flex items-center gap-2 px-4 rounded-xl transition-all duration-200
          ${filters.age ? "bg-white shadow-md" : "bg-white hover:bg-white/90"}
        `}>
          <div className="min-w-0 flex-1">
            <input
              type="number"
              min={1}
              max={120}
              placeholder="Enter age"
              value={filters.age || ""}
              onChange={(e) => setFilters((f) => ({ ...f, age: e.target.value ? Number(e.target.value) : "" }))}
              className={`
                w-full text-sm bg-transparent border-none p-0 font-semibold focus:outline-none focus:ring-0
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                ${filters.age ? "text-gray-900 placeholder:text-gray-900" : "text-gray-900 placeholder:text-gray-900"}
              `}
            />
          </div>
        </div>

        {/* Therapy Type */}
        <div className="relative">
          <FilterButton value={therapyLabel} active={!!filters.therapyType} onClick={() => toggle("therapyType")} />
          <Dropdown open={openFilter === "therapyType"} onClose={close} title="Type of Therapy">
            <RadioList
              options={["All Types", ...THERAPY_TYPES]}
              value={filters.therapyType || "All Types"}
              onChange={(v) => { setFilters((f) => ({ ...f, therapyType: v === "All Types" ? "" : v })); close(); }}
            />
          </Dropdown>
        </div>

        {/* Concerns */}
        <div className="relative">
          <FilterButton value={specialtyLabel} active={filters.specialties.length > 0} onClick={() => toggle("specialties")} />
          <Dropdown open={openFilter === "specialties"} onClose={close} title="Concerns">
            <CheckList options={SPECIALTIES} selected={filters.specialties} onChange={(v) => setFilters((f) => ({ ...f, specialties: v }))} />
          </Dropdown>
        </div>

        {/* Session Type */}
        <div className="relative">
          <FilterButton value={sessionLabel} active={!!filters.sessionType} onClick={() => toggle("sessionType")} />
          <Dropdown open={openFilter === "sessionType"} onClose={close} title="Session Type">
            <RadioList
              options={["In Clinic/Telehealth", ...SESSION_TYPES]}
              value={filters.sessionType || "In Clinic/Telehealth"}
              onChange={(v) => { setFilters((f) => ({ ...f, sessionType: v === "In Clinic/Telehealth" ? "" : v })); close(); }}
            />
          </Dropdown>
        </div>

        {/* Language */}
        <div className="relative">
          <FilterButton value={langLabel} active={filters.languages.length > 0} onClick={() => toggle("languages")} />
          <Dropdown open={openFilter === "languages"} onClose={close} title="Language">
            <CheckList options={LANGUAGES} selected={filters.languages} onChange={(v) => setFilters((f) => ({ ...f, languages: v }))} />
          </Dropdown>
        </div>



      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <button onClick={onReset} className="text-sm text-white/70 hover:text-white font-medium cursor-pointer flex items-center gap-1.5 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
