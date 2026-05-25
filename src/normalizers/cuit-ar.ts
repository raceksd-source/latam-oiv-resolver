/**
 * CUIT (Clave Única de Identificación Tributaria) normalizer · Argentina
 *
 * Reference: Administración Federal de Ingresos Públicos (AFIP)
 *   · https://www.afip.gob.ar
 * Format: XX-XXXXXXXX-X (11 digits with embedded checksum digit).
 *
 * The same algorithm applies to CUIL (Clave Única de Identificación
 * Laboral). The leading two digits indicate the entity kind.
 */

const CUIT_DIGITS_REGEX = /^\d{11}$/;
const CUIT_WEIGHTS = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

/**
 * Normalize a CUIT/CUIL to canonical "XX-XXXXXXXX-X" form.
 */
export function normalizeCuitAR(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('CUIT input must be a string');
  }
  const digits = input.replace(/\D/g, '');
  if (!CUIT_DIGITS_REGEX.test(digits)) {
    throw new Error(`Invalid CUIT length: "${input}" (expected 11 digits)`);
  }
  return `${digits.slice(0, 2)}-${digits.slice(2, 10)}-${digits.slice(10, 11)}`;
}

/**
 * Compute the CUIT verifier digit per AFIP algorithm (modulo-11).
 */
export function computeCuitVerifierAR(firstTenDigits: string): string {
  if (!/^\d{10}$/.test(firstTenDigits)) {
    throw new Error('CUIT verifier requires the first 10 digits');
  }
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(firstTenDigits[i]) * (CUIT_WEIGHTS[i] ?? 0);
  }
  const mod = 11 - (sum % 11);
  if (mod === 11) return '0';
  if (mod === 10) return '9'; // AFIP rule: replace 10 with 9 (alternative kind code)
  return String(mod);
}

/**
 * Validate format and checksum of an Argentine CUIT/CUIL.
 */
export function isValidCuitAR(input: string): boolean {
  try {
    const digits = input.replace(/\D/g, '');
    if (!CUIT_DIGITS_REGEX.test(digits)) return false;
    const expected = computeCuitVerifierAR(digits.slice(0, 10));
    return digits.slice(10) === expected;
  } catch {
    return false;
  }
}
