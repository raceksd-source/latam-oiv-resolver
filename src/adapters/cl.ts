/**
 * Chile country adapter · delegates to the companion package
 * `anci-oiv-resolver` (Ley 21.663 · ANCI · 915 operators).
 *
 * The Chile adapter is the only production-tested adapter at v0.1.0-alpha.
 * Loading is dynamic so the peer dependency remains optional: callers that
 * do not target Chile do not need to install `anci-oiv-resolver`.
 */

import { normalizeRutCL, isValidRutCL } from '../normalizers/rut-cl.js';
import type {
  CountryAdapter,
  OperatorIdentifier,
  ResolvedOperator,
  LATAMSector,
} from '../types.js';

/**
 * Map an ANCI sector label to the unified `LATAMSector` taxonomy.
 */
function mapAnciSector(anci: string | undefined): LATAMSector {
  switch (anci) {
    case 'banca_finanzas':
      return 'banking_finance';
    case 'telecomunicaciones':
      return 'telecommunications';
    case 'energia_electrica':
      return 'electricity';
    case 'combustibles':
      return 'oil_gas';
    case 'agua_saneamiento':
      return 'water_sanitation';
    case 'transporte':
      return 'transport';
    case 'salud':
      return 'health';
    case 'administracion_estado':
      return 'public_administration';
    case 'empresas_estado':
      return 'state_enterprise';
    default:
      return 'unknown';
  }
}

let cachedResolver: ((rut: string, razonSocial: string) => Promise<unknown>) | null = null;

/**
 * Lazy-load the companion package. Returns `null` if the peer dependency
 * is not installed, so callers may degrade gracefully.
 */
async function loadAnciResolver(): Promise<typeof cachedResolver> {
  if (cachedResolver) return cachedResolver;
  try {
    const mod = (await import('anci-oiv-resolver')) as {
      resolveOIVDomain: (rut: string, razonSocial: string) => Promise<unknown>;
    };
    cachedResolver = mod.resolveOIVDomain;
    return cachedResolver;
  } catch {
    return null;
  }
}

export const clAdapter: CountryAdapter = {
  country: 'CL',
  primaryIdentifier: 'rut-cl',
  implemented: true,

  async resolve(input: OperatorIdentifier): Promise<ResolvedOperator> {
    const identifier = isValidRutCL(input.identifier)
      ? normalizeRutCL(input.identifier)
      : input.identifier;

    const resolver = await loadAnciResolver();
    if (!resolver) {
      return {
        country: 'CL',
        identifier,
        identifierType: 'rut-cl',
        domain: null,
        razonSocial: input.razonSocial ?? null,
        sector: 'unknown',
        source: 'stub',
        confidence: 0,
        verified: null,
        note:
          'Optional peer dependency "anci-oiv-resolver" is not installed. ' +
          'Install it to enable Chile coverage (915 operators under Ley 21.663).',
      };
    }

    const inner = (await resolver(identifier, input.razonSocial ?? '')) as {
      domain?: string;
      sector?: string;
      source?: string;
      confidence?: number;
      verified?: boolean | null;
      razonSocial?: string;
    };

    return {
      country: 'CL',
      identifier,
      identifierType: 'rut-cl',
      domain: inner.domain ?? null,
      razonSocial: inner.razonSocial ?? input.razonSocial ?? null,
      sector: mapAnciSector(inner.sector),
      sectorLocal: inner.sector,
      source: inner.source === 'known-domains' ? 'companion-package' : 'heuristic',
      confidence: typeof inner.confidence === 'number' ? inner.confidence : 0,
      verified: inner.verified ?? null,
      note: 'Resolved via anci-oiv-resolver (Ley 21.663 · ANCI).',
    };
  },
};

export default clAdapter;
