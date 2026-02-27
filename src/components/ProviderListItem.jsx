import { FAMILY_COLORS, getProviderFamily } from "../utils/matchScore";

export default function ProviderListItem({ provider, selected, onClick, distance }) {
  const family = getProviderFamily(provider.specialties);
  const borderColor = FAMILY_COLORS[family];

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-center gap-3 px-4 py-3 border-l-4 ${borderColor}
        transition-colors cursor-pointer
        ${selected
          ? "bg-primary-50 border-r-2 border-r-primary-600"
          : "bg-white hover:bg-gray-50"
        }
      `}
    >
      <img
        src={provider.photo}
        alt={provider.name}
        className="w-11 h-11 rounded-full object-cover shrink-0"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm text-gray-900 truncate">{provider.name}</h3>
          {/* Availability dot */}
          <span
            className={`shrink-0 w-2 h-2 rounded-full ${
              provider.availability === "Today"
                ? "bg-green-500"
                : provider.availability === "This Week"
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
            title={provider.availability}
          />
        </div>
        <p className="text-xs text-gray-500 truncate">{provider.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-amber-500">{"★"} {provider.rating}</span>
          {distance != null && (
            <span className="text-xs text-gray-400">{distance.toFixed(1)} mi</span>
          )}
          <span className="text-xs text-gray-400">
            {provider.location.city}
          </span>
        </div>
      </div>
    </button>
  );
}
