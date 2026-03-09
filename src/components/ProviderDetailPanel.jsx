export default function ProviderDetailPanel({ provider, distance, onClose }) {
  if (!provider) return null;

  return (
    <div className="h-full overflow-y-auto">
      {/* Dark header — matches card header */}
      <div className="bg-primary-900 px-6 pt-6 pb-8 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-white/50 hover:text-white cursor-pointer rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={provider.photo}
          alt={provider.name}
          className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-white/20"
        />
        <h3 className="mt-4 text-xl font-bold text-white">{provider.name}</h3>
        <p className="text-primary-200 text-sm font-medium mt-0.5">{provider.title}</p>
        <div className="flex items-center justify-center gap-3 mt-3 text-sm">
          <span className="text-primary-300 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {provider.location.city}, {provider.location.state}
          </span>
          {distance != null && (
            <>
              <span className="text-white/20">|</span>
              <span className="text-white font-medium">{distance.toFixed(1)} mi</span>
            </>
          )}
        </div>
        {/* Availability badge */}
        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
              provider.availability === "Today"
                ? "bg-green-400/20 text-green-300"
                : provider.availability === "This Week"
                ? "bg-blue-400/20 text-blue-300"
                : "bg-white/10 text-white/60"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${
              provider.availability === "Today" ? "bg-green-400" : provider.availability === "This Week" ? "bg-blue-400" : "bg-white/40"
            }`} />
            Available {provider.availability === "Today" ? "today" : provider.availability === "This Week" ? "this week" : "soon"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* About */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">About</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{provider.bio}</p>
        </div>

        {/* Concerns */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Concerns</h4>
          <div className="flex flex-wrap gap-2">
            {provider.specialties.map((s) => (
              <span key={s} className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Session & Therapy Types */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Session</h4>
            <div className="flex flex-wrap gap-1.5">
              {provider.sessionTypes?.map((s) => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Therapy Type</h4>
            <div className="flex flex-wrap gap-1.5">
              {provider.therapyTypes?.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600">{t}</span>
              ))}
            </div>
          </div>
        </div>


        {/* Insurance */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Insurance Accepted</h4>
          <div className="flex flex-wrap gap-2">
            {provider.insurance.map((ins) => (
              <span key={ins} className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                {ins}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Languages</h4>
          <p className="text-sm text-gray-600">{provider.languages.join(", ")}</p>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary-700 text-white font-bold py-3.5 rounded-xl hover:bg-primary-800 transition-colors cursor-pointer text-base">
          Book a Session
        </button>
      </div>
    </div>
  );
}
