/**
 * Example · identifier normalization
 *
 * Run with:
 *   npx tsx examples/normalize-identifier.ts
 *
 * Shows the unified façade and the per-country validators.
 */

import { normalize, isValidIdentifier } from '../src/normalizers/index.js';
import type { LATAMCountry } from '../src/types.js';

const samples: Array<{ country: LATAMCountry; identifier: string }> = [
  { country: 'CL', identifier: '76.086.428-5' },
  { country: 'CL', identifier: '97006000-6' },
  { country: 'BR', identifier: '00000000000191' },
  { country: 'MX', identifier: 'xaxx010101000' },
  { country: 'AR', identifier: '30500001735' },
  { country: 'PE', identifier: '20100000001' },
];

for (const { country, identifier } of samples) {
  const normalized = normalize(country, identifier);
  const valid = isValidIdentifier(country, identifier);
  console.log(
    `${country} | input=${identifier.padEnd(20)} → ${normalized.padEnd(22)} ` +
    `(valid=${String(valid).padEnd(5)})`
  );
}
