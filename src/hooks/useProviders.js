import { useState, useEffect } from "react";
import { fetchProviders } from "../utils/parseProviders";

let cache = null;

export default function useProviders() {
  const [providers, setProviders] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;

    let cancelled = false;

    fetchProviders()
      .then((data) => {
        if (cancelled) return;
        cache = data;
        setProviders(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { providers, loading, error };
}
