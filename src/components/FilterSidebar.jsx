import { useState } from "react";
import {
  SPECIALTIES,
  INSURANCE_OPTIONS,
  LANGUAGES,
  GENDERS,
  AVAILABILITY_OPTIONS,
} from "../data/providers";

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-gray-900 cursor-pointer"
      >
        {title}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxGroup({ options, selected, onChange }) {
  return options.map((opt) => (
    <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
      <input
        type="checkbox"
        checked={selected.includes(opt)}
        onChange={() => {
          onChange(
            selected.includes(opt)
              ? selected.filter((s) => s !== opt)
              : [...selected, opt]
          );
        }}
        className="rounded border-gray-300 text-primary-700 focus:ring-primary-500"
      />
      {opt}
    </label>
  ));
}

function RadioGroup({ options, value, onChange, name }) {
  return options.map((opt) => (
    <label key={opt} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={value === opt}
        onChange={() => onChange(opt)}
        className="border-gray-300 text-primary-700 focus:ring-primary-500"
      />
      {opt}
    </label>
  ));
}

export default function FilterSidebar({
  filters,
  setFilters,
  hasLocation,
  onReset,
  mobileOpen,
  setMobileOpen,
}) {
  const content = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-primary-600 hover:text-primary-800 font-medium cursor-pointer"
        >
          Reset All
        </button>
      </div>

      <FilterSection title="Specialty">
        <CheckboxGroup
          options={SPECIALTIES}
          selected={filters.specialties}
          onChange={(v) => setFilters((f) => ({ ...f, specialties: v }))}
        />
      </FilterSection>

      <FilterSection title="Insurance">
        <CheckboxGroup
          options={INSURANCE_OPTIONS}
          selected={filters.insurance}
          onChange={(v) => setFilters((f) => ({ ...f, insurance: v }))}
        />
      </FilterSection>

      {hasLocation && (
        <FilterSection title="Distance">
          <div className="space-y-1">
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={filters.distance}
              onChange={(e) =>
                setFilters((f) => ({ ...f, distance: Number(e.target.value) }))
              }
              className="w-full accent-primary-700"
            />
            <p className="text-xs text-gray-500 text-right">
              Within {filters.distance} miles
            </p>
          </div>
        </FilterSection>
      )}

      <FilterSection title="Availability">
        <RadioGroup
          options={[...AVAILABILITY_OPTIONS, "Any"]}
          value={filters.availability}
          onChange={(v) => setFilters((f) => ({ ...f, availability: v }))}
          name="availability"
        />
      </FilterSection>

      <FilterSection title="Gender" defaultOpen={false}>
        <CheckboxGroup
          options={GENDERS}
          selected={filters.gender}
          onChange={(v) => setFilters((f) => ({ ...f, gender: v }))}
        />
      </FilterSection>

      <FilterSection title="Language" defaultOpen={false}>
        <CheckboxGroup
          options={LANGUAGES}
          selected={filters.languages}
          onChange={(v) => setFilters((f) => ({ ...f, languages: v }))}
        />
      </FilterSection>

      <FilterSection title="Rating" defaultOpen={false}>
        <RadioGroup
          options={["4+", "3+", "Any"]}
          value={filters.rating}
          onChange={(v) => setFilters((f) => ({ ...f, rating: v }))}
          name="rating"
        />
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20 bg-white border border-gray-100 rounded-xl p-5 shadow-sm max-h-[calc(100vh-6rem)] overflow-y-auto">
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
