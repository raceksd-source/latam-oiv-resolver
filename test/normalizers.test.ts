/**
 * Unit tests · identifier normalizers
 *
 * Run with: npm test
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeRutCL,
  isValidRutCL,
  computeVerifierDigitCL,
} from '../src/normalizers/rut-cl.js';
import {
  normalizeCnpjBR,
  isValidCnpjBR,
  computeCnpjChecksumBR,
} from '../src/normalizers/cnpj-br.js';
import {
  normalizeRfcMX,
  isValidRfcMX,
  rfcKindMX,
} from '../src/normalizers/rfc-mx.js';
import {
  normalizeCuitAR,
  isValidCuitAR,
  computeCuitVerifierAR,
} from '../src/normalizers/cuit-ar.js';
import { normalize, isValidIdentifier } from '../src/normalizers/index.js';

describe('rut-cl', () => {
  it('normalizes formatted RUT to canonical form', () => {
    assert.equal(normalizeRutCL('76.086.428-5'), '76086428-5');
    assert.equal(normalizeRutCL('760864285'), '76086428-5');
    assert.equal(normalizeRutCL('97.006.000-6'), '97006000-6');
  });

  it('uppercases K verifier', () => {
    assert.equal(normalizeRutCL('11111111-k'), '11111111-K');
  });

  it('rejects malformed input', () => {
    assert.throws(() => normalizeRutCL(''));
    assert.throws(() => normalizeRutCL('not-a-rut'));
    assert.throws(() => normalizeRutCL('123456789012-5'));
  });

  it('computes valid verifier digits', () => {
    assert.equal(computeVerifierDigitCL('97006000'), '6');
    assert.equal(computeVerifierDigitCL('78387715'), '5');
  });

  it('isValidRutCL accepts canonical and rejects bad checksums', () => {
    assert.equal(isValidRutCL('97006000-6'), true);
    assert.equal(isValidRutCL('78387715-5'), true);
    assert.equal(isValidRutCL('97006000-0'), false);
    assert.equal(isValidRutCL(''), false);
  });
});

describe('cnpj-br', () => {
  it('normalizes raw digits to canonical form', () => {
    assert.equal(normalizeCnpjBR('00000000000191'), '00.000.000/0001-91');
    assert.equal(normalizeCnpjBR('11222333000181'), '11.222.333/0001-81');
  });

  it('accepts already-formatted input', () => {
    assert.equal(normalizeCnpjBR('11.222.333/0001-81'), '11.222.333/0001-81');
  });

  it('rejects wrong lengths', () => {
    assert.throws(() => normalizeCnpjBR('123'));
    assert.throws(() => normalizeCnpjBR(''));
  });

  it('computes correct checksums', () => {
    assert.equal(computeCnpjChecksumBR('00000000000191'), '91');
  });

  it('isValidCnpjBR rejects repeated-digit pathological cases', () => {
    assert.equal(isValidCnpjBR('00.000.000/0001-91'), true);
    assert.equal(isValidCnpjBR('11.111.111/1111-11'), false);
    assert.equal(isValidCnpjBR('not-a-cnpj'), false);
  });
});

describe('rfc-mx', () => {
  it('normalizes uppercase + strips separators', () => {
    assert.equal(normalizeRfcMX('xaxx010101000'), 'XAXX010101000');
    assert.equal(normalizeRfcMX('XAXX-010101-000'), 'XAXX010101000');
  });

  it('detects RFC kind', () => {
    assert.equal(rfcKindMX('XAXX010101000'), 'fisica');
    assert.equal(rfcKindMX('ABC010101000'), 'moral');
    assert.equal(rfcKindMX('not-rfc'), null);
  });

  it('rejects wrong length', () => {
    assert.throws(() => normalizeRfcMX('AB123'));
    assert.throws(() => normalizeRfcMX(''));
  });

  it('isValidRfcMX accepts format-valid inputs only', () => {
    assert.equal(isValidRfcMX('XAXX010101000'), true);
    assert.equal(isValidRfcMX('ABC010101000'), true);
    assert.equal(isValidRfcMX(''), false);
    assert.equal(isValidRfcMX('1234567890ABC'), false);
  });
});

describe('cuit-ar', () => {
  it('normalizes digits to canonical form', () => {
    assert.equal(normalizeCuitAR('30500001735'), '30-50000173-5');
    assert.equal(normalizeCuitAR('30-50000173-5'), '30-50000173-5');
  });

  it('rejects wrong length', () => {
    assert.throws(() => normalizeCuitAR('123'));
    assert.throws(() => normalizeCuitAR(''));
  });

  it('computes verifier digits', () => {
    // Sample CUIT: 30-50000173-5
    assert.equal(computeCuitVerifierAR('3050000173'), '5');
  });

  it('isValidCuitAR rejects bad checksums', () => {
    assert.equal(isValidCuitAR('30-50000173-5'), true);
    assert.equal(isValidCuitAR('30-50000173-0'), false);
  });
});

describe('facade · normalize / isValidIdentifier', () => {
  it('routes by country code', () => {
    assert.equal(normalize('CL', '76.086.428-5'), '76086428-5');
    assert.equal(normalize('BR', '00000000000191'), '00.000.000/0001-91');
    assert.equal(normalize('MX', 'XAXX010101000'), 'XAXX010101000');
    assert.equal(normalize('AR', '30500001735'), '30-50000173-5');
  });

  it('returns trimmed input for not-yet-implemented countries', () => {
    assert.equal(normalize('PE', '  20100000001  '), '20100000001');
  });

  it('isValidIdentifier returns false for stub countries', () => {
    assert.equal(isValidIdentifier('PE', '20100000001'), false);
    assert.equal(isValidIdentifier('UY', '123456789012'), false);
  });

  it('isValidIdentifier delegates to per-country validators', () => {
    assert.equal(isValidIdentifier('CL', '97006000-6'), true);
    assert.equal(isValidIdentifier('BR', '00.000.000/0001-91'), true);
    assert.equal(isValidIdentifier('AR', '30-50000173-5'), true);
  });
});
