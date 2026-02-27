import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterChipBar from "./FilterChipBar";

const INITIAL_FILTERS = {
  age: "",
  therapyType: "",
  specialties: [],
  sessionType: "",
  languages: [],
  modalities: [],
};

export default function Hero() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.age) params.set("age", filters.age);
    if (filters.therapyType) params.set("therapyType", filters.therapyType);
    if (filters.specialties.length > 0) params.set("specialties", filters.specialties.join(","));
    if (filters.sessionType) params.set("sessionType", filters.sessionType);
    if (filters.languages.length > 0) params.set("languages", filters.languages.join(","));
    if (filters.modalities.length > 0) params.set("modalities", filters.modalities.join(","));
    navigate(`/providers?${params.toString()}`);
  };

  const handleReset = () => setFilters(INITIAL_FILTERS);

  return (
    <section className="relative bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950 text-white overflow-visible">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-36">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">

            Not just any therapist, the <span className="text-accent-light">right therapist</span> for you.
          </h1>
        </div>

        {/* Filters */}
        <FilterChipBar
          filters={filters}
          setFilters={setFilters}
          onReset={handleReset}
          onSearch={handleSearch}
        />
      </div>
    </section>
  );
}
