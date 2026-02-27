import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProviders from "../hooks/useProviders";

export default function ProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { providers, loading } = useProviders();

  const [showBooking, setShowBooking] = useState(false);
  const provider = providers.find((p) => p.id === Number(id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 animate-pulse">
        <div className="bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
            <div className="h-4 bg-white/10 rounded w-28 mb-8" />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-40 h-40 rounded-2xl bg-white/10" />
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div className="h-7 bg-white/10 rounded-lg w-56 mx-auto sm:mx-0" />
                <div className="h-5 bg-white/10 rounded-lg w-40 mx-auto sm:mx-0" />
                <div className="h-11 bg-white/20 rounded-xl w-40 mt-5 mx-auto sm:mx-0" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
            <div className="px-8 pt-8 pb-6 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
            <div className="mx-8 border-t border-gray-100" />
            <div className="px-8 py-6 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-100 rounded-lg w-20" />
                <div className="h-8 bg-gray-100 rounded-lg w-24" />
                <div className="h-8 bg-gray-100 rounded-lg w-16" />
              </div>
            </div>
            <div className="mx-8 border-t border-gray-100" />
            <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-100 rounded-lg w-24" />
                  <div className="h-8 bg-gray-100 rounded-lg w-20" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-100 rounded-lg w-20" />
                  <div className="h-8 bg-gray-100 rounded-lg w-28" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Provider not found</h2>
          <button
            onClick={() => navigate("/providers")}
            className="mt-4 bg-primary-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-primary-800 transition-colors cursor-pointer"
          >
            Back to Providers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark hero header */}
      <div className="bg-primary-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to results
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={provider.photo}
              alt={provider.name}
              className="w-40 h-40 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{provider.name}</h1>
              <p className="text-primary-200 text-base font-medium mt-1">{provider.title}</p>
              {/* CTA in header */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                <button onClick={() => setShowBooking(true)} className="bg-white text-primary-800 font-bold py-3 px-8 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer text-sm">
                  Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content — single flowing white container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">

          {/* About */}
          <div className="px-8 pt-8 pb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed text-[15px]">{provider.bio}</p>
          </div>

          <div className="mx-8 border-t border-gray-100" />

          {/* Specialties */}
          <div className="px-8 py-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {provider.specialties.map((s) => (
                <span key={s} className="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-8 border-t border-gray-100" />

          {/* Session & Therapy — side by side */}
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Session Format</h3>
              <div className="flex flex-wrap gap-2">
                {provider.sessionTypes?.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Therapy Type</h3>
              <div className="flex flex-wrap gap-2">
                {provider.therapyTypes?.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Modalities */}
          {provider.modalities?.length > 0 && (
            <>
              <div className="mx-8 border-t border-gray-100" />
              <div className="px-8 py-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Modalities</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.modalities.map((m) => (
                    <span key={m} className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-100">{m}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Ages */}
          {provider.ageRange && (
            <>
              <div className="mx-8 border-t border-gray-100" />
              <div className="px-8 py-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ages</h3>
                <p className="text-[15px] text-gray-600">{provider.ageRange.min} – {provider.ageRange.max} years old</p>
              </div>
            </>
          )}

          <div className="mx-8 border-t border-gray-100" />

          {/* Insurance & Languages — side by side */}
          <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Insurance Accepted</h3>
              <div className="flex flex-wrap gap-2">
                {provider.insurance.map((ins) => (
                  <span key={ins} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 border border-gray-200">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Languages</h3>
              <p className="text-[15px] text-gray-600">{provider.languages.join(", ")}</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-12" />

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowBooking(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-8 text-center">
            <button
              onClick={() => setShowBooking(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">Book a Session</h3>
            <p className="text-sm text-gray-500 mb-5">Call us to schedule an appointment with {provider.name}</p>

            <a
              href="tel:+19541234567"
              className="inline-flex items-center gap-2 bg-primary-700 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-primary-800 transition-colors text-lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              (954) 123-4567
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
