import { Link } from "react-router-dom";
import useProviders from "../hooks/useProviders";
import ProviderCard from "./ProviderCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden animate-pulse">
      <div className="p-5 flex gap-4">
        <div className="w-20 h-20 rounded-2xl bg-gray-200 shrink-0" />
        <div className="min-w-0 flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-36" />
          <div className="h-3.5 bg-gray-100 rounded w-48" />
        </div>
      </div>
      <div className="px-5 pb-4 space-y-3">
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-100 rounded-lg w-16" />
          <div className="h-6 bg-gray-100 rounded-lg w-20" />
          <div className="h-6 bg-gray-100 rounded-lg w-14" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 bg-gray-100 rounded w-full" />
          <div className="h-3.5 bg-gray-100 rounded w-4/5" />
        </div>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-3 bg-gray-200 rounded w-20" />
      </div>
    </div>
  );
}

export default function FeaturedProviders() {
  const { providers, loading } = useProviders();
  const featured = providers.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Providers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            : featured.map((p) => <ProviderCard key={p.id} provider={p} />)
          }
        </div>

        <div className="text-center mt-10">
          <Link
            to="/providers"
            className="inline-flex items-center gap-2 bg-primary-700 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-800 transition-colors text-sm"
          >
            View All Providers
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
