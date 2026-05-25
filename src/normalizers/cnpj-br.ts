/**
 * CNPJ (Cadastro Nacional da Pessoa Jurídica) normalizer · Brasil
 *
 * Reference: Receita Federal · https://www.gov.br/receitafederal
 * Format: XX.XXX.XXX/XXXX-XX (14 digits + 2 verifier digits embedded).
 *
 * Canonical form preserves the standard punctuation as published by
 * Receita Federal in compliance with IN RFB 1.863/2018.
 */

const CNPJ_DIGITS_REGEX = /^\d{14}$/;

/**
 * Normalize a Brazilian CNPJ to canonical "XX.XXX.XXX/XXXX-XX" form.
 */
export function normalizeCnpjBR(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('CNPJ input must be a string');
  }
  const digits = input.replace(/\D/g, '');
  if (!CNPJ_DIGITS_REGEX.test(digits)) {
    throw new Error(`Invalid CNPJ length: "${input}" (expected 14 digits)`);
  }
  return (
    digits.slice(0, 2) +
    '.' +
    digits.slice(2, 5) +
    '.' +
    digits.slice(5, 8) +
    '/' +
    digits.slice(8, 12) +
    '-' +
    digits.slice(12, 14)
  );
}

/**
 * Verify the embedded two-digit checksum of a CNPJ per Receita Federal
 * algorithm (modulo-11 with positional weights).
 */
export function computeCnpjChecksumBR(digits: string): string {
  if (!CNPJ_DIGITS_REGEX.test(digits)) {
    throw new Error('CNPJ checksum requires 14 digits');
  }
  const base = digits.slice(0, 12);
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = (str: string, weights: number[]) =>
    weights.reduce((acc, w, i) => acc + Number(str[i]) * w, 0);
  const d1 = (sum(base, weights1) * 10) % 11 % 10;
  const d2 = (sum(base + String(d1), weights2) * 10) % 11 % 10;
  return `${d1}${d2}`;
}

/**
 * Validate the format and checksum of a Brazilian CNPJ.
 * Rejects repeated-digit edge cases (e.g. "11111111111111").
 */
export function isValidCnpjBR(input: string): boolean {
  try {
    const digits = input.replace(/\D/g, '');
    if (!CNPJ_DIGITS_REGEX.test(digits)) return false;
    if (/^(\d)\1+$/.test(digits)) return false;
    const expected = computeCnpjChecksumBR(digits);
    return digits.slice(12) === expected;
  } catch {
    return false;
  }
}
