import { useNavigate } from "react-router-dom";

export default function ProviderCard({ provider }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/providers/${provider.id}`)}
      className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      <div className="p-5 flex gap-4">
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-primary-100 shadow-md shrink-0"
        />
        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-primary-800 transition-colors">{provider.name}</h3>
          <p className="text-sm text-primary-600 font-medium">{provider.title}</p>
        </div>
      </div>

      <div className="px-5 pb-4 flex-1 space-y-3">
        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5">
          {provider.specialties.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 font-semibold border border-primary-100"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{provider.bio}</p>
      </div>

      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-100">
        <span className="text-xs text-gray-400">{provider.languages.join(", ")}</span>
        <span className="text-sm font-bold text-primary-700 group-hover:text-primary-800 flex items-center gap-1 transition-colors">
          View Profile
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
