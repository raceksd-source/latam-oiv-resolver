/**
 * Country adapter contract.
 *
 * Each per-country module under `src/adapters/{cc}.ts` MUST export an object
 * conforming to `CountryAdapter` as its default. The unified resolver loads
 * adapters lazily through `src/adapters/index.ts`.
 */

export type { CountryAdapter } from '../types.js';
