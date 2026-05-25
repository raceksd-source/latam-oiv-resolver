# Methodology — LATAM Coverage Gap

This document describes the methodology used to assess critical
infrastructure cybersecurity coverage across Latin American jurisdictions
and the curation process for `latam-oiv-resolver` datasets.

It is a regional generalization of the *Coverage Gap Closure Method™*
applied in the Chile reference work
([`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) ·
companion paper forthcoming).

## 1. Definitions

- **Critical Infrastructure Operator (CIO)** · an entity designated by a
  national regulator under a cybersecurity framework as essential for
  the continuity of public services or national security.
- **Local term** · the country-specific label for the CIO concept (OIV,
  OSE, ICC, Sectores Estratégicos, etc.).
- **Coverage Gap** · the difference between (a) the population of CIOs
  designated by the national regulator and (b) the population that is
  effectively monitored by a passive observer.

## 2. Per-country assessment template

A new country is added to the registry only after the following template
is completed in `data/countries/{cc}/source.md`:

1. **Country identification.** Official English + local names.
2. **Local term.** The exact regulator vocabulary.
3. **Regulator / agency.** Primary regulator and any cooperating agencies.
4. **Legal framework.** Laws, decrees, regulator publications with stable
   public URLs.
5. **Official registry availability.** One of `yes`, `partial`, `no`.
6. **Identifier format.** National identifier scheme with normalizer
   reference.
7. **Last updated.** ISO 8601 date of last verification.
8. **Sources.** Primary and secondary public URLs.

## 3. Dataset curation principles

1. **Public sources only.** Every operator entry must cite a publicly
   accessible regulator publication. No scraped, paywalled, or private
   data sources.
2. **No mock data.** Empty datasets are documented as empty (the
   `_placeholder.json` convention). The atlas does NOT ship invented
   entries to inflate coverage.
3. **Confidence is recorded.** Each entry carries a confidence band
   between 0.0 and 1.0 reflecting whether it derives from a canonical
   registry entry (1.0), heuristic inference (0.4–0.9), or stub
   placeholder (0.0).
4. **Provenance is explicit.** The `source` field on every entry
   distinguishes `official-registry`, `companion-package`,
   `community-curated`, `heuristic`, and `stub`.

## 4. Curation lifecycle

```
   propose          curate           review            publish
     │                │                 │                │
     ▼                ▼                 ▼                ▼
  issue           data PR          CI checks         MINOR release
 (new-country     (source.md         (schema +        (atlas + adapter
  template)        + dataset)         tests)           shipped together)
```

1. Contributor opens a `new-country` issue.
2. Maintainer evaluates regulator framework references.
3. Contributor opens a PR with `source.md`, normalizer (if needed), and
   initial dataset (validated against `data/schema.json`).
4. CI validates schema, runs tests, lints code.
5. Maintainer reviews public-source citations and cuts a `MINOR` release.

## 5. Verification expectations

- **DNS resolvability.** Every domain entry is expected to resolve at
  submission time. CI does NOT make live DNS queries; resolvability is
  spot-checked by maintainer during PR review.
- **Identifier correctness.** Where checksum algorithms exist (RUT CL,
  CNPJ BR, CUIT AR), entries must pass the corresponding `isValid*`
  function.
- **Regulator wording.** `razonSocial` SHOULD match the regulator's
  exact published form (including punctuation, abbreviations, and case).

## 6. Reproducibility

Each release ships a tagged data snapshot, allowing prior research to
re-run against the historical view of the registry. The `data/_meta.json`
file records `version`, `generated` timestamp, and per-country
`lastVerified` dates.

## 7. References

- *Coverage Gap Closure Method™* · companion paper for Chile (Mellafe, 2026).
- ISO/IEC 29147:2018 · Information technology — Security techniques —
  Vulnerability disclosure.
- ISO/IEC 30111:2019 · Vulnerability handling processes.
- DOJ Good Faith Security Research Framework (2017).
