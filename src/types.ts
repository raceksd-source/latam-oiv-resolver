/**
 * latam-oiv-resolver · TypeScript type definitions
 *
 * Unified type system for resolving "Operadores de Importancia Vital" (OIV)
 * equivalents across LATAM cybersecurity regulatory frameworks.
 */

/**
 * ISO 3166-1 alpha-2 country codes for LATAM jurisdictions supported by
 * this resolver. Additional countries are added through MINOR releases.
 */
export type LATAMCountry =
  | 'CL' // Chile · Ley 21.663 · ANCI
  | 'AR' // Argentina · Estrategia Nacional de Ciberseguridad
  | 'UY' // Uruguay · AGESIC framework
  | 'BR' // Brasil · PNSI + LGPD
  | 'CO' // Colombia · CONPES 3854
  | 'MX' // México · LFPD + sectores estratégicos
  | 'PE' // Perú · DLeg 1412
  | 'EC' // Ecuador · Política Nacional de Ciberseguridad
  | 'CR' // Costa Rica · MICITT / Estrategia Nacional
  | 'PA'; // Panamá · AIG / Estrategia Nacional

/**
 * Format identifiers used across LATAM national identifier systems.
 * Each value maps 1:1 to a normalizer module under `src/normalizers/`.
 */
export type IdentifierType =
  | 'rut-cl' // Rol Único Tributario · Chile
  | 'cnpj-br' // Cadastro Nacional da Pessoa Jurídica · Brasil
  | 'cpf-br' // Cadastro de Pessoas Físicas · Brasil
  | 'rfc-mx' // Registro Federal de Contribuyentes · México
  | 'cuit-ar' // Clave Única de Identificación Tributaria · Argentina
  | 'cuil-ar' // Clave Única de Identificación Laboral · Argentina
  | 'rut-uy' // Registro Único Tributario · Uruguay
  | 'nit-co' // Número de Identificación Tributaria · Colombia
  | 'ruc-pe' // Registro Único de Contribuyentes · Perú
  | 'ruc-ec' // Registro Único de Contribuyentes · Ecuador
  | 'cedula-jur-cr' // Cédula Jurídica · Costa Rica
  | 'ruc-pa' // Registro Único de Contribuyentes · Panamá
  | 'unknown';

/**
 * Confidence band for a resolution. Mirrors the convention established by
 * the Chile reference implementation (`anci-oiv-resolver`):
 *   1.0         → canonical table lookup
 *   0.4 – 0.9   → heuristic inference
 *   0.0         → unresolved / error
 */
export type Confidence = number;

/**
 * Country-agnostic sector taxonomy. Each adapter MAY extend with a
 * `sectorLocal` field to expose the country-specific label.
 */
export type LATAMSector =
  | 'banking_finance'
  | 'telecommunications'
  | 'electricity'
  | 'oil_gas'
  | 'water_sanitation'
  | 'transport'
  | 'health'
  | 'public_administration'
  | 'state_enterprise'
  | 'digital_infrastructure'
  | 'unknown';

/**
 * Source attribution for a resolved operator record. Mirrors ISO/IEC 19770-2
 * SWID-style provenance principles.
 */
export type ResolutionSource =
  | 'official-registry' // National regulator-published list
  | 'companion-package' // Delegated to anci-oiv-resolver or sibling
  | 'community-curated' // PR-merged dataset, schema-validated
  | 'heuristic' // Inference from identifier + razón social
  | 'stub'; // Country not yet implemented

/**
 * Input to the unified resolver.
 */
export interface OperatorIdentifier {
  /** ISO 3166-1 alpha-2 country code (uppercase). */
  country: LATAMCountry;
  /** National identifier in any common formatting (will be normalized). */
  identifier: string;
  /** Legal name of the entity (optional but recommended for heuristics). */
  razonSocial?: string;
}

/**
 * Resolved operator record. Stable contract across all country adapters.
 */
export interface ResolvedOperator {
  /** Country of the resolution. */
  country: LATAMCountry;
  /** Normalized national identifier (canonical form per `IdentifierType`). */
  identifier: string;
  /** Detected identifier type. */
  identifierType: IdentifierType;
  /** Web domain of the operator (e.g. "bci.cl"), null if unresolved. */
  domain: string | null;
  /** Legal name as reported by the country adapter, or as provided in input. */
  razonSocial: string | null;
  /** Country-agnostic sector classification. */
  sector: LATAMSector;
  /** Optional country-specific sector label (regulator vocabulary). */
  sectorLocal?: string;
  /** Resolution source (provenance). */
  source: ResolutionSource;
  /** Confidence band 0–1 (see `Confidence`). */
  confidence: Confidence;
  /** True if the country adapter verified DNS resolvability of the domain. */
  verified: boolean | null;
  /** Free-form notes (regulator references, caveats). */
  note?: string;
}

/**
 * Country adapter contract. Each per-country module exports an object that
 * conforms to this interface.
 */
export interface CountryAdapter {
  /** Country handled by this adapter. */
  country: LATAMCountry;
  /** Primary identifier type for the country (RUT for CL, CNPJ for BR, etc.). */
  primaryIdentifier: IdentifierType;
  /** Whether the adapter is fully implemented (vs. stub). */
  implemented: boolean;
  /** Resolve a single operator by identifier (+ optional razón social). */
  resolve(input: OperatorIdentifier): Promise<ResolvedOperator>;
  /** Optional batch resolution for adapter-specific optimizations. */
  resolveBatch?(inputs: OperatorIdentifier[]): Promise<ResolvedOperator[]>;
}

/**
 * Optional resolver flags forwarded to adapters that support them.
 */
export interface ResolveOptions {
  /** Request DNS verification (where the adapter supports it). */
  verify?: boolean;
  /** Force re-load of cached adapter data (rarely needed). */
  refresh?: boolean;
}

/**
 * Metadata for the unified atlas. Mirrors `data/_meta.json`.
 */
export interface AtlasMeta {
  version: string;
  generated: string; // ISO 8601 UTC timestamp
  schemaVersion: string;
  countries: Array<{
    code: LATAMCountry;
    name: string;
    implemented: boolean;
    sourceCount: number; // 0 for stubs
    lastVerified: string | null;
  }>;
}
