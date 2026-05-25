/**
 * Stub adapter · used for LATAM countries that are pilot-stage placeholders.
 *
 * Returns a `ResolvedOperator` with `source: 'stub'`, `confidence: 0`,
 * and a documented note pointing contributors to the country's
 * `data/countries/{cc}/source.md` for the regulator framework.
 */

import { normalize, isValidIdentifier } from '../normalizers/index.js';
import type {
  CountryAdapter,
  LATAMCountry,
  IdentifierType,
  OperatorIdentifier,
  ResolvedOperator,
} from '../types.js';

const PRIMARY_IDENTIFIER: Record<LATAMCountry, IdentifierType> = {
  CL: 'rut-cl',
  BR: 'cnpj-br',
  MX: 'rfc-mx',
  AR: 'cuit-ar',
  UY: 'rut-uy',
  CO: 'nit-co',
  PE: 'ruc-pe',
  EC: 'ruc-ec',
  CR: 'cedula-jur-cr',
  PA: 'ruc-pa',
};

/**
 * Build a stub adapter for a not-yet-implemented country.
 */
export function createStubAdapter(country: LATAMCountry): CountryAdapter {
  return {
    country,
    primaryIdentifier: PRIMARY_IDENTIFIER[country] ?? 'unknown',
    implemented: false,
    async resolve(input: OperatorIdentifier): Promise<ResolvedOperator> {
      let normalized: string;
      try {
        normalized = normalize(country, input.identifier);
      } catch {
        normalized = input.identifier;
      }
      return {
        country,
        identifier: normalized,
        identifierType: PRIMARY_IDENTIFIER[country] ?? 'unknown',
        domain: null,
        razonSocial: input.razonSocial ?? null,
        sector: 'unknown',
        source: 'stub',
        confidence: 0,
        verified: null,
        note:
          `Country adapter not yet implemented. See data/countries/${country.toLowerCase()}/source.md ` +
          `for the regulatory framework. Contributions welcome via the New Country issue template. ` +
          `Identifier format ${isValidIdentifier(country, input.identifier) ? 'validated' : 'unvalidated'}.`,
      };
    },
  };
}
