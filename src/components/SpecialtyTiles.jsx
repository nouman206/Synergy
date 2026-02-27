import { SPECIALTIES } from "../data/providers";

export default function SpecialtyTiles({ selected, onToggle }) {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar md:flex-wrap">
      {SPECIALTIES.map((name) => {
        const active = selected.includes(name);
        return (
          <button
            key={name}
            onClick={() => onToggle(name)}
            className={`
              shrink-0 px-3.5 py-1.5 rounded-full text-sm transition-all duration-150
              cursor-pointer select-none whitespace-nowrap
              ${active
                ? "bg-primary-700 text-white font-medium"
                : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-700"
              }
            `}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
