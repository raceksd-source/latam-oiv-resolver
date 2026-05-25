/**
 * latam-oiv-resolver · main API
 *
 * Canonical Latin American Critical Infrastructure Operator Registry.
 * Unified resolver for "Operadores de Importancia Vital" (OIV) equivalents
 * across LATAM cybersecurity regulatory frameworks.
 *
 * Resolution strategy:
 *   1. Detect country adapter from `input.country`.
 *   2. Delegate to the country adapter (e.g. `anci-oiv-resolver` for CL).
 *   3. Fall back to stub adapter for not-yet-implemented countries.
 *
 * @example
 * import { resolveOperator } from 'latam-oiv-resolver';
 * const r = await resolveOperator({
 *   country: 'CL',
 *   identifier: '97006000-6',
 *   razonSocial: 'BANCO DE CRÉDITO E INVERSIONES',
 * });
 */

import { getAdapter } from './adapters/index.js';
import { normalize, isValidIdentifier } from './normalizers/index.js';
import type {
  OperatorIdentifier,
  ResolvedOperator,
  ResolveOptions,
  LATAMCountry,
} from './types.js';

/**
 * Resolve a single critical infrastructure operator across LATAM jurisdictions.
 *
 * @param input - Country + national identifier + (optional) razón social.
 * @param options - Resolver flags.
 * @returns ResolvedOperator record (always returns; check `confidence` + `source`).
 */
export async function resolveOperator(
  input: OperatorIdentifier,
  options: ResolveOptions = {}
): Promise<ResolvedOperator> {
  const adapter = await getAdapter(input.country);
  return adapter.resolve(input);
}

/**
 * Resolve multiple operators in batch. Adapters MAY implement an optimized
 * `resolveBatch` path; otherwise this falls back to per-entry resolution.
 */
export async function resolveBatch(
  inputs: OperatorIdentifier[],
  options: ResolveOptions = {}
): Promise<ResolvedOperator[]> {
  // Group inputs by country so each adapter is loaded at most once.
  const groups = new Map<LATAMCountry, OperatorIdentifier[]>();
  for (const input of inputs) {
    const arr = groups.get(input.country) ?? [];
    arr.push(input);
    groups.set(input.country, arr);
  }

  const results: ResolvedOperator[] = [];
  for (const [country, entries] of groups) {
    const adapter = await getAdapter(country);
    if (adapter.resolveBatch) {
      const batch = await adapter.resolveBatch(entries);
      results.push(...batch);
    } else {
      for (const entry of entries) {
        results.push(await adapter.resolve(entry));
      }
    }
  }
  return results;
}

/**
 * List the LATAM countries currently exposed by the package.
 * (Implemented countries plus stub placeholders for the LATAM 10 pilot scope.)
 */
export function listCountries(): LATAMCountry[] {
  return ['CL', 'AR', 'UY', 'BR', 'CO', 'MX', 'PE', 'EC', 'CR', 'PA'];
}

// Re-export the public surface area.
export { normalize, isValidIdentifier };
export { getAdapter };
export type {
  LATAMCountry,
  IdentifierType,
  LATAMSector,
  ResolutionSource,
  OperatorIdentifier,
  ResolvedOperator,
  CountryAdapter,
  ResolveOptions,
  AtlasMeta,
  Confidence,
} from './types.js';
