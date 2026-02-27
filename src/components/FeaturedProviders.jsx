import { Link } from "react-router-dom";
import providers from "../data/providers";
import ProviderCard from "./ProviderCard";

export default function FeaturedProviders() {
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
          {featured.map((p) => (
            <ProviderCard key={p.id} provider={p} />
          ))}
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
