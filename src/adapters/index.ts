/**
 * Adapter registry · lazily loads per-country adapters and falls back to
 * stub adapters for not-yet-implemented countries.
 */

import { createStubAdapter } from './stub.js';
import type { CountryAdapter, LATAMCountry } from '../types.js';

const cache = new Map<LATAMCountry, CountryAdapter>();

/**
 * Resolve the adapter for a given country. Implemented countries are loaded
 * dynamically; placeholder countries return a stub.
 */
export async function getAdapter(country: LATAMCountry): Promise<CountryAdapter> {
  const cached = cache.get(country);
  if (cached) return cached;

  let adapter: CountryAdapter;
  switch (country) {
    case 'CL': {
      const mod = await import('./cl.js');
      adapter = mod.clAdapter;
      break;
    }
    // Future country adapters land here as PRs.
    default:
      adapter = createStubAdapter(country);
      break;
  }
  cache.set(country, adapter);
  return adapter;
}
