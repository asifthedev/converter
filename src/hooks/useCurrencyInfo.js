import { useEffect, useState } from "react";

/** Base URL for the free currency exchange rate API. */
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

/**
 * Custom hook that fetches exchange rates for a given base currency.
 *
 * @param {string} currency - The base currency code (e.g. "usd").
 * @returns {{ data: Object, isLoading: boolean, error: string | null }}
 *   - data: An object mapping target currency codes to their exchange rates.
 *   - isLoading: Whether a fetch is currently in progress.
 *   - error: An error message string if the request failed, otherwise null.
 */
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip fetching if no currency is provided.
    if (!currency) return;

    // AbortController lets us cancel the request if the currency changes
    // before the previous request completes (prevents race conditions).
    const controller = new AbortController();

    async function fetchCurrencyData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/${currency}.json`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch rates (${response.status})`);
        }

        const result = await response.json();
        // The API returns { [currency]: { ...rates } }, so we extract the inner object.
        setData(result[currency] ?? {});
      } catch (err) {
        // Ignore AbortErrors -- they are expected when we cancel stale requests.
        if (err.name !== "AbortError") {
          setError(err.message);
          setData({});
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrencyData();

    // Cleanup: abort the in-flight request when the currency changes or the
    // component unmounts.
    return () => controller.abort();
  }, [currency]);

  return { data, isLoading, error };
}

export default useCurrencyInfo;
