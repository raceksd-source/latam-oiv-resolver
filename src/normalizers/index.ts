/**
 * latam-oiv-resolver · identifier normalizers
 *
 * Country-aware façade over the per-country normalizer modules.
 */

import { normalizeRutCL, isValidRutCL } from './rut-cl.js';
import { normalizeCnpjBR, isValidCnpjBR } from './cnpj-br.js';
import { normalizeRfcMX, isValidRfcMX } from './rfc-mx.js';
import { normalizeCuitAR, isValidCuitAR } from './cuit-ar.js';
import type { LATAMCountry } from '../types.js';

/**
 * Normalize a national identifier into the canonical form for the country.
 *
 * For countries without a registered normalizer, the input is returned
 * after whitespace trimming so callers may still pass it downstream.
 */
export function normalize(country: LATAMCountry, identifier: string): string {
  switch (country) {
    case 'CL':
      return normalizeRutCL(identifier);
    case 'BR':
      return normalizeCnpjBR(identifier);
    case 'MX':
      return normalizeRfcMX(identifier);
    case 'AR':
      return normalizeCuitAR(identifier);
    default:
      return identifier.trim();
  }
}

/**
 * Validate the format (and where applicable, the checksum) of a national
 * identifier for the given country.
 *
 * Returns `false` for countries that do not yet have a registered
 * normalizer (does NOT throw).
 */
export function isValidIdentifier(country: LATAMCountry, identifier: string): boolean {
  switch (country) {
    case 'CL':
      return isValidRutCL(identifier);
    case 'BR':
      return isValidCnpjBR(identifier);
    case 'MX':
      return isValidRfcMX(identifier);
    case 'AR':
      return isValidCuitAR(identifier);
    default:
      return false;
  }
}

// Re-export per-country normalizers for callers that need direct access.
export { normalizeRutCL, isValidRutCL, computeVerifierDigitCL } from './rut-cl.js';
export { normalizeCnpjBR, isValidCnpjBR, computeCnpjChecksumBR } from './cnpj-br.js';
export { normalizeRfcMX, isValidRfcMX, rfcKindMX } from './rfc-mx.js';
export { normalizeCuitAR, isValidCuitAR, computeCuitVerifierAR } from './cuit-ar.js';
