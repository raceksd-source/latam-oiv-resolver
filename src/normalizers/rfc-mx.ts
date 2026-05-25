/**
 * RFC (Registro Federal de Contribuyentes) normalizer · México
 *
 * Reference: Servicio de Administración Tributaria (SAT) · https://www.sat.gob.mx
 * Format:
 *   - Persona moral: 12 characters (3 letters + 6 digits + 3 alphanum)
 *   - Persona física: 13 characters (4 letters + 6 digits + 3 alphanum)
 *
 * RFC homoclave (last 3 chars) is computed by SAT; we validate format
 * only · checksum verification requires the SAT-internal algorithm.
 */

const RFC_MORAL_REGEX = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
const RFC_FISICA_REGEX = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;

/**
 * Normalize a Mexican RFC to canonical uppercase form (no spaces, no hyphens).
 */
export function normalizeRfcMX(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('RFC input must be a string');
  }
  const cleaned = input.replace(/[\s\-_.]/g, '').toUpperCase();
  if (cleaned.length !== 12 && cleaned.length !== 13) {
    throw new Error(`Invalid RFC length: "${input}" (expected 12 or 13 chars)`);
  }
  return cleaned;
}

/**
 * Return the RFC kind (moral for empresas · física for personas) or null
 * if the input does not match either format.
 */
export function rfcKindMX(input: string): 'moral' | 'fisica' | null {
  try {
    const normalized = normalizeRfcMX(input);
    if (RFC_MORAL_REGEX.test(normalized)) return 'moral';
    if (RFC_FISICA_REGEX.test(normalized)) return 'fisica';
    return null;
  } catch {
    return null;
  }
}

/**
 * Validate the format of a Mexican RFC. Does NOT verify the SAT homoclave
 * checksum (which requires a proprietary algorithm).
 */
export function isValidRfcMX(input: string): boolean {
  return rfcKindMX(input) !== null;
}
