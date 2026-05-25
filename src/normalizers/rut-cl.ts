/**
 * RUT (Rol Único Tributario) normalizer · Chile
 *
 * Reference: Servicio de Impuestos Internos · https://www.sii.cl
 * Format: ########-X where X is a checksum digit (0-9 or K).
 *
 * Canonical form: digits-only body + "-" + uppercase verifier.
 * Strips dots, spaces, leading zeros.
 */

const RUT_REGEX = /^(\d{1,8})-?([\dkK])$/;

/**
 * Normalize a Chilean RUT to canonical "########-X" form.
 * Accepts inputs like "76.086.428-5", "760864285", "76086428-K".
 *
 * @throws Error if the input cannot be parsed.
 */
export function normalizeRutCL(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('RUT input must be a string');
  }
  const cleaned = input.replace(/[.\s]/g, '').toUpperCase();
  const match = cleaned.match(RUT_REGEX) ?? cleaned.replace('-', '').match(/^(\d{1,8})([\dK])$/);
  if (!match) {
    throw new Error(`Invalid RUT format: "${input}"`);
  }
  const body = (match[1] ?? '').replace(/^0+/, '') || '0';
  const verifier = (match[2] ?? '').toUpperCase();
  return `${body}-${verifier}`;
}

/**
 * Compute the canonical RUT verifier digit using the modulo-11 algorithm
 * defined by the Servicio de Impuestos Internos.
 */
export function computeVerifierDigitCL(body: string): string {
  const digits = body.replace(/\D/g, '');
  if (!digits) {
    throw new Error('RUT body must contain digits');
  }
  let sum = 0;
  let factor = 2;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += Number(digits[i]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const mod = 11 - (sum % 11);
  if (mod === 11) return '0';
  if (mod === 10) return 'K';
  return String(mod);
}

/**
 * Validate that a string is a syntactically correct Chilean RUT with a
 * matching verifier digit.
 */
export function isValidRutCL(input: string): boolean {
  try {
    const normalized = normalizeRutCL(input);
    const [body, verifier] = normalized.split('-');
    if (!body || !verifier) return false;
    return computeVerifierDigitCL(body) === verifier;
  } catch {
    return false;
  }
}
