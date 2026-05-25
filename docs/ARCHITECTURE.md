# Architecture

`latam-oiv-resolver` is a thin orchestration layer that delegates to
per-country adapters. The package itself ships:

1. A **stable unified API** (`resolveOperator`, `resolveBatch`,
   `normalize`, `isValidIdentifier`).
2. A **typed contract** for country adapters (`CountryAdapter`).
3. A **unified JSON Schema** that all per-country datasets must validate
   against (`data/schema.json`).
4. A **normalizer registry** for LATAM national identifier formats
   (`src/normalizers/`).
5. A **registry of country adapters** loaded lazily (`src/adapters/`).

## Component diagram

```
┌────────────────────────────────────────────────────────────────┐
│                  resolveOperator(input)                        │
│            (src/index.ts · unified entry point)                │
└────────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
                ┌────────────────────────────────┐
                │      getAdapter(country)       │
                │     (src/adapters/index.ts)    │
                └─────┬──────────────┬───────────┘
                      │              │
        ┌─────────────▼───┐    ┌─────▼────────────┐
        │ clAdapter       │    │ createStubAdapter│
        │ src/adapters/   │    │ src/adapters/    │
        │ cl.ts           │    │ stub.ts          │
        └─────┬───────────┘    └──────────────────┘
              │
              ▼
   ┌──────────────────────────┐
   │  anci-oiv-resolver       │   (peer dep · optional)
   │  resolveOIVDomain(...)   │
   └──────────────────────────┘
```

## Design principles

1. **One JSON Schema, many countries.** Every country dataset validates
   against `data/schema.json`. Reviewers do not need to learn 10 schemas.
2. **Adapter isolation.** Country adapters are independent modules that
   share only the typed contract. Failures in one adapter cannot affect
   another.
3. **Optional peer dependencies.** The Chile adapter loads
   `anci-oiv-resolver` dynamically. Callers that do not target Chile do
   not need to install it.
4. **No live network in the core path.** DNS verification is opt-in via
   `ResolveOptions.verify` and currently delegated to country adapters
   that implement it.
5. **Stub-by-default.** A country without an implemented adapter returns
   a `ResolvedOperator` with `source: 'stub'`, `confidence: 0`, and a
   pointer to `data/countries/{cc}/source.md`. Calling code can branch on
   `source === 'stub'` without exception handling.

## File layout

| Path | Purpose |
|---|---|
| `src/index.ts` | Public API entry point |
| `src/types.ts` | Shared TypeScript types |
| `src/normalizers/` | Per-country identifier normalizers |
| `src/adapters/index.ts` | Adapter registry (lazy loader) |
| `src/adapters/{cc}.ts` | Per-country adapters |
| `src/adapters/stub.ts` | Stub adapter factory |
| `data/_meta.json` | Atlas metadata |
| `data/schema.json` | Unified JSON Schema (draft 2020-12) |
| `data/identifier-formats/` | Normalizer index + reference docs |
| `data/countries/{cc}/` | Per-country dataset directories |
| `test/` | Unit tests |
| `examples/` | Runnable example scripts |
| `docs/` | Architecture, roadmap, methodology, governance |

## Versioning

- `MAJOR` · breaking changes to the unified API or schema.
- `MINOR` · new country, new adapter, additive type changes.
- `PATCH` · data correction within a country, bug fixes, doc updates.

See [`ROADMAP.md`](ROADMAP.md) for the planned cadence.
