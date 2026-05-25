# latam-oiv-resolver

> **Canonical Latin American Critical Infrastructure Operator Registry.**
> First multi-country resolver for "Operadores de Importancia Vital" (OIV)
> equivalents across LATAM regulatory frameworks.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://img.shields.io/badge/npm-v0.1.0--alpha-orange.svg)](https://www.npmjs.com/package/latam-oiv-resolver)
[![CI](https://github.com/raceksd-source/latam-oiv-resolver/actions/workflows/ci.yml/badge.svg)](https://github.com/raceksd-source/latam-oiv-resolver/actions/workflows/ci.yml)
[![CodeQL](https://github.com/raceksd-source/latam-oiv-resolver/actions/workflows/codeql.yml/badge.svg)](https://github.com/raceksd-source/latam-oiv-resolver/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/raceksd-source/latam-oiv-resolver/badge)](https://scorecard.dev/viewer/?uri=github.com/raceksd-source/latam-oiv-resolver)

Read this in: **English** · [Español](README.es.md) · [Português (BR)](README.pt-br.md)

---

## Why a LATAM Atlas?

Each Latin American country has emerging cybersecurity regulation designating
"critical infrastructure operators" under different local terms, regulators,
and identifier formats:

| Country | Local term | Framework | Public registry |
|---|---|---|---|
| Chile | OIV (Operadores de Importancia Vital) | Ley 21.663 (2024) | Res Exenta 87 (Dec 2025) · 915 entities |
| Brasil | Operadores de Infraestrutura Crítica | PNSI + LGPD | Partial · GSI/PR |
| México | Infraestructura Crítica · Sectores Estratégicos | LFPD + ISO 27001 MX | No unified list |
| Colombia | Infraestructura Crítica Cibernética | CONPES 3854 + Ley 2300 | Partial · ColCERT |
| Argentina | OSE (Operadores de Servicios Esenciales) | Estrategia Nacional de Ciberseguridad | No official registry |
| Uruguay | Operadores Críticos | Marco AGESIC | Limited |
| Perú | Operadores de Infraestructura Crítica | DLeg 1412 · Política Nac. Ciberseg. 2030 | Partial · DINI |
| Ecuador | Sectores Estratégicos · Operadores Críticos | Política Nacional de Ciberseguridad | No |
| Costa Rica | Infraestructura Crítica | Estrategia Nacional Ciberseguridad | No |
| Panamá | Infraestructuras Críticas | Estrategia Nacional Ciberseguridad | No |

**The challenge:** ~5,000–8,000 critical operators across LATAM with no
unified registry. Cybersecurity researchers must rebuild from scratch
per country. Vendor reports produce false-positives. Identifier formats
are heterogeneous (RUT · CPF/CNPJ · RFC · CUIT · CC · DNI · RUC).

**The solution:** `latam-oiv-resolver` provides a unified API and JSON Schema
for resolving critical-infrastructure operators across LATAM jurisdictions,
with country-specific adapters and identifier normalization.

---

## Status: `v0.1.0-alpha` · pilot 5 countries

| Country | Status | Coverage | Source |
|---|---|---|---|
| Chile (CL) | Stable | 915 / 915 (100%) | Via [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0 |
| Argentina (AR) | Stub | — | Awaiting contribution |
| Uruguay (UY) | Stub | — | Awaiting contribution |
| Brasil (BR) | Stub (priority) | — | Awaiting contribution |
| Colombia (CO) | Stub | — | Awaiting contribution |
| México (MX) | Stub | — | Awaiting contribution |
| Perú (PE) | Stub | — | Awaiting contribution |
| Ecuador (EC) | Stub | — | Awaiting contribution |
| Costa Rica (CR) | Stub | — | Awaiting contribution |
| Panamá (PA) | Stub | — | Awaiting contribution |

> This release is intentionally an **alpha skeleton**. Only Chile delegates to
> a production-tested package. All other countries are placeholders documenting
> sources and inviting in-country contributors.

---

## Companion artifacts

- **Methodology paper:** *"The Coverage Gap in LATAM Critical Infrastructure
  Cybersecurity"* (Mellafe, 2026 · companion to the Chile Phase 1 paper · forthcoming).
- **Single-country reference:** [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0 (Chile · stable production).
- **Coverage Gap Closure Method™:** per-country assessment framework documented
  in [`docs/COVERAGE-GAP-LATAM-METHODOLOGY.md`](docs/COVERAGE-GAP-LATAM-METHODOLOGY.md).
- **Governance:** [`docs/GOVERNANCE.md`](docs/GOVERNANCE.md).

---

## Roadmap

- **Q3 2026** — 5-country pilot (CL stable · AR · UY · BR partial · CO partial).
- **Q4 2026** — Add MX · PE · EC pilots · cut `v1.0.0` stable.
- **Q1–Q2 2027** — Add CR · PA · DO · PY · BO · VE · GT · SV · NI · HN.
- **2028** — LATAM 95%+ coverage · annual update cadence aligned with each
  national regulator's revision cycle.

Full roadmap: [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Quick start

```bash
npm install latam-oiv-resolver
# Optional peer dependency for Chile coverage:
npm install anci-oiv-resolver
```

```typescript
import { resolveOperator } from 'latam-oiv-resolver';

// Chile (live · 915 entities via anci-oiv-resolver)
const cl = await resolveOperator({
  country: 'CL',
  identifier: '97006000-6',
  razonSocial: 'BANCO DE CRÉDITO E INVERSIONES',
});

// Brazil (stub · contribution welcome)
const br = await resolveOperator({
  country: 'BR',
  identifier: '00.000.000/0001-91',
  razonSocial: 'Banco do Brasil',
});
```

Identifier normalization is exposed independently:

```typescript
import { normalize } from 'latam-oiv-resolver';

normalize('CL', '76.086.428-5');    // → '76086428-5'
normalize('BR', '00000000000191');  // → '00.000.000/0001-91'
normalize('MX', 'XAXX010101000');   // → 'XAXX010101000'
normalize('AR', '30500001735');     // → '30-50000173-5'
```

See [`examples/`](examples/) for runnable scripts.

---

## Contributing a country

See [CONTRIBUTING.md](CONTRIBUTING.md). Each new country requires:

1. **Legal framework documentation** (`data/countries/{cc}/source.md`)
2. **Identifier normalizer** (`src/normalizers/{type}-{cc}.ts`)
3. **Country adapter** (`src/adapters/{cc}-{regulator}.ts`)
4. **Entity dataset JSON** (`data/countries/{cc}/known-domains.json`)
5. **Unit tests + documentation**

Templates are available under `data/countries/_template/` once a contributor opens
an issue using the [New Country template](.github/ISSUE_TEMPLATE/new-country.yml).

---

## Design principles

1. **One JSON Schema, many countries.** All datasets validate against
   `data/schema.json`.
2. **Public sources only.** Every entry must cite a publicly accessible
   regulator publication. No scraping of private portals.
3. **Country-stewarded.** A country dataset is maintained by contributors
   resident in (or with verified expertise on) that country's framework.
4. **Versioned data, semantic releases.** Datasets follow SemVer; adding a
   country is a `MINOR` bump, correcting an entity is a `PATCH`, breaking
   schema changes are `MAJOR`.
5. **Conformant with ISO/IEC 29147:2018 / 30111:2019** (coordinated
   vulnerability disclosure) as a *reference*, not a certification claim.

---

## License

Apache License 2.0 · see [LICENSE](LICENSE).

---

## Citation

Mellafe Zuvic, D. (2026). *latam-oiv-resolver: Canonical LATAM Critical
Infrastructure Operator Registry* (Version 0.1.0-alpha) [Computer software].
GitHub. https://github.com/raceksd-source/latam-oiv-resolver

Machine-readable citation: [`CITATION.cff`](CITATION.cff).

---

## Author

**David Mellafe Zuvic** · Independent Security Research · La Serena, Chile
· `david@reizan.io`

## Acknowledgments

Built as part of the *Coverage Gap* research programme. Chile (CL) data is
provided via the companion package [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0.
Per-country contributions, regulators, and CSIRTs will be acknowledged as the
registry grows.

---

## Security

To report a vulnerability privately, see [SECURITY.md](SECURITY.md).
