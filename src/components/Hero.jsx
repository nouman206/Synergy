import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FilterChipBar from "./FilterChipBar";

const INITIAL_FILTERS = {
  age: "",
  therapyType: "",
  specialties: [],
  sessionType: "",
  languages: [],
};

export default function Hero() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const navigateWithFilters = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.age) params.set("age", newFilters.age);
    if (newFilters.therapyType) params.set("therapyType", newFilters.therapyType);
    if (newFilters.specialties.length > 0) params.set("specialties", newFilters.specialties.join(","));
    if (newFilters.sessionType) params.set("sessionType", newFilters.sessionType);
    if (newFilters.languages.length > 0) params.set("languages", newFilters.languages.join(","));

    const qs = params.toString();
    if (qs) navigate(`/providers?${qs}`);
  }, [navigate]);

  const handleSetFilters = useCallback((updater) => {
    setFilters((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => navigateWithFilters(next), 400);
      return next;
    });
  }, [navigateWithFilters]);

  const handleReset = () => {
    clearTimeout(timerRef.current);
    setFilters(INITIAL_FILTERS);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white overflow-visible">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-400/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">

            Not just any provider, the <span className="text-accent-light">right provider</span> for you.
          </h1>
        </div>

        {/* Filters */}
        <FilterChipBar
          filters={filters}
          setFilters={handleSetFilters}
          onReset={handleReset}
        />
      </div>
    </section>
  );
}
