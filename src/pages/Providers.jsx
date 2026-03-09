import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useProviders from "../hooks/useProviders";
import FilterChipBar from "../components/FilterChipBar";

const INITIAL_FILTERS = {
  age: "",
  therapyType: "",
  specialties: [],
  sessionType: "",
  languages: [],
};

export default function ProvidersPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { providers, loading } = useProviders();
  const [filters, setFilters] = useState(() => {
    const age = searchParams.get("age");
    const therapyType = searchParams.get("therapyType");
    const specialties = searchParams.get("specialties");
    const sessionType = searchParams.get("sessionType");
    const languages = searchParams.get("languages");
    return {
      ...INITIAL_FILTERS,
      age: age ? Number(age) : "",
      therapyType: therapyType || "",
      specialties: specialties ? specialties.split(",") : [],
      sessionType: sessionType || "",
      languages: languages ? languages.split(",") : [],
    };
  });

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      if (filters.age && p.ageRange) {
        const age = Number(filters.age);
        if (age < p.ageRange.min || age > p.ageRange.max) return false;
      }
      if (filters.therapyType && !p.therapyTypes?.includes(filters.therapyType)) return false;
      if (filters.specialties.length > 0 && !filters.specialties.some((s) => p.specialties.includes(s))) return false;
      if (filters.sessionType && !p.sessionTypes?.includes(filters.sessionType)) return false;
      if (filters.languages.length > 0 && !filters.languages.some((l) => p.languages.includes(l))) return false;

      return true;
    });
  }, [filters, providers]);

  const handleReset = () => setFilters(INITIAL_FILTERS);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero + Filter: one unified dark section ── */}
      <div className="bg-primary-900">
        {/* Hero text */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Find the right support for you
          </h1>
          <p className="mt-2 text-primary-200 text-lg max-w-2xl">
            Browse our network of licensed mental health professionals
          </p>
        </div>

        {/* Filter bar — same dark bg, flows naturally from hero */}
        <div className="sticky top-16 z-30 bg-primary-900/95 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <FilterChipBar
              filters={filters}
              setFilters={setFilters}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {!loading && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <span className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{filtered.length}</span> provider{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>
      )}

      {/* ── Provider Cards ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-12">
        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden flex flex-col sm:flex-row animate-pulse">
                <div className="sm:w-56 shrink-0 flex items-center justify-center p-6">
                  <div className="w-36 h-36 rounded-2xl bg-gray-200" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="p-5 flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-48" />
                    <div className="h-4 bg-gray-100 rounded-lg w-36" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-6 bg-gray-100 rounded-lg w-20" />
                      <div className="h-6 bg-gray-100 rounded-lg w-24" />
                      <div className="h-6 bg-gray-100 rounded-lg w-16" />
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="h-3.5 bg-gray-100 rounded w-full" />
                      <div className="h-3.5 bg-gray-100 rounded w-3/4" />
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                    <div className="h-3.5 bg-gray-200 rounded w-32" />
                    <div className="h-3.5 bg-gray-200 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-5">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/providers/${p.id}`)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-200/60 hover:border-primary-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row"
              >
                {/* Left side — Avatar */}
                <div className="sm:w-56 shrink-0 flex flex-col items-center justify-center p-6">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-36 h-36 rounded-2xl object-cover ring-4 ring-primary-100 shadow-md"
                  />
                </div>

                {/* Right side — Info */}
                <div className="flex-1 flex flex-col">
                  <div className="p-5 flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-800 transition-colors">{p.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{p.title}</p>

                    {/* Concerns */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.specialties.map((s) => (
                        <span key={s} className="text-[11px] px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-semibold border border-primary-100">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Session + Therapy types */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.sessionTypes?.map((s) => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 font-semibold">{s}</span>
                      ))}
                      {p.therapyTypes?.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 font-medium">{t}</span>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">{p.bio}</p>
                  </div>

                  {/* Footer */}
                  <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span>{p.languages.join(", ")}</span>
                      <span className="text-gray-200">|</span>
                      <span>{p.insurance.length} insurances</span>
                      {p.ageRange && (
                        <>
                          <span className="text-gray-200">|</span>
                          <span>Ages {p.ageRange.min}–{p.ageRange.max}</span>
                        </>
                      )}
                    </div>
                    <span className="text-sm font-bold text-primary-700 group-hover:text-primary-800 flex items-center gap-1 transition-colors">
                      View Profile
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No providers match your filters</h3>
            <p className="mt-2 text-gray-500 text-sm max-w-sm mx-auto">
              Try broadening your search by removing some filters.
            </p>
            <button
              onClick={handleReset}
              className="mt-5 bg-primary-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-primary-800 transition-colors cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
