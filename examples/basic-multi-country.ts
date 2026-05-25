/**
 * Example · basic multi-country resolution
 *
 * Run with:
 *   npx tsx examples/basic-multi-country.ts
 *
 * Demonstrates resolving operators across multiple LATAM jurisdictions
 * using the unified resolver API. Stub-country results document the
 * pending coverage status so callers can treat them gracefully.
 */

import { resolveOperator, resolveBatch } from '../src/index.js';

async function main(): Promise<void> {
  // Chile — live coverage via the companion package (if installed).
  const cl = await resolveOperator({
    country: 'CL',
    identifier: '97006000-6',
    razonSocial: 'BANCO DE CRÉDITO E INVERSIONES',
  });
  console.log('CL →', cl);

  // Brasil — currently a stub, returns documented placeholder.
  const br = await resolveOperator({
    country: 'BR',
    identifier: '00.000.000/0001-91',
    razonSocial: 'Banco do Brasil',
  });
  console.log('BR →', br);

  // Mixed batch · resolveBatch groups by country for adapter caching.
  const batch = await resolveBatch([
    { country: 'CL', identifier: '76086428-5', razonSocial: 'Empresa X' },
    { country: 'AR', identifier: '30-50000173-5', razonSocial: 'YPF' },
    { country: 'MX', identifier: 'XAXX010101000', razonSocial: 'CFE' },
  ]);
  console.log('Batch →', batch);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
