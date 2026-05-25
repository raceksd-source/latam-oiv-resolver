# Contributing to `latam-oiv-resolver`

Thank you for considering a contribution. This project aims to build a
**canonical Latin American Critical Infrastructure Operator Registry** through
collaboration with country-resident experts, national CSIRTs, and academic
researchers.

This document is available in: **English** · *Spanish version forthcoming*.

---

## Code of Conduct

By participating you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md)
(Contributor Covenant 2.1).

---

## Ways to contribute

1. **Add a new country dataset** — the highest-impact contribution.
2. **Correct an existing entity** — incorrect domain, sector, or identifier.
3. **Improve a normalizer** — better validation, edge cases.
4. **Improve documentation** — translations, clarifications, examples.
5. **File an issue** — see [Issue templates](.github/ISSUE_TEMPLATE/).

---

## Governance for country contributions

A country dataset is **stewarded by contributors with verifiable expertise on
that country's regulatory framework**. To become a steward:

1. Open an issue using the [New Country template](.github/ISSUE_TEMPLATE/new-country.yml).
2. Cite the national framework (law, decree, regulator publication).
3. Identify at least one **public, citable source** for the entity list.
4. Provide a representative sample (10–20 entities) for initial review.

The maintainer will review, request changes if needed, and accept the country
into the registry. A `MINOR` version bump is cut on acceptance.

---

## Per-country contribution checklist

To add a country (`{cc}` = ISO 3166-1 alpha-2 lowercase, e.g. `br`, `mx`):

### 1. Legal framework documentation

Create `data/countries/{cc}/source.md` with:

- Country name (English + local).
- Local term used for "critical infrastructure operator".
- Citation of the national law / decree / regulator publication.
- Stable URL(s) to the public source (no paywalled links).
- Identifier format (CNPJ · RFC · CUIT · etc.) and validation rule.
- Date of last verification of the source.

### 2. Identifier normalizer

Create `src/normalizers/{type}-{cc}.ts` implementing:

```typescript
export function normalize{Type}(input: string): string;
export function isValid{Type}(input: string): boolean;
```

Tests under `test/normalizers.{cc}.test.ts` with at least:

- 3 valid examples (canonical form).
- 3 invalid examples (wrong checksum, wrong length, malformed).
- 1 edge case (whitespace, formatting variants).

### 3. Country adapter

Create `src/adapters/{cc}-{regulator}.ts` implementing the
[`CountryAdapter`](src/adapters/interface.ts) interface.

### 4. Entity dataset

Create `data/countries/{cc}/known-domains.json` validating against
[`data/schema.json`](data/schema.json).

**Quality bar:**

- Each entry must be sourced from a public, citable publication.
- Each entry's domain must be DNS-resolvable at time of submission.
- No private or scraped data.
- No mock or fabricated entries.

### 5. Documentation

Update:

- `data/countries/{cc}/README.md` with country-specific context.
- The main [`README.md`](README.md) status table.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) milestone.

---

## Development workflow

```bash
# Clone
git clone https://github.com/raceksd-source/latam-oiv-resolver.git
cd latam-oiv-resolver

# Install
npm install

# Typecheck
npm run typecheck

# Lint
npm run lint

# Build
npm run build

# Test
npm test
```

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(br): add Brasil adapter via GSI/PR registry
fix(cl): correct sector for BancoEstado entry
docs(roadmap): mark MX pilot as in-progress
chore(deps): bump TypeScript to 5.7.1
```

Scopes:

- Country code (`cl`, `br`, `mx`, etc.) for country-specific changes.
- `core` for shared infrastructure.
- `docs`, `ci`, `deps`, `meta` for cross-cutting changes.

## Pull request expectations

- One country per PR (do not bundle multiple countries).
- All CI checks must pass (typecheck, lint, tests, build).
- New entries must validate against `data/schema.json`.
- Sources must be cited in `data/countries/{cc}/source.md`.

---

## License

By contributing you agree that your contributions will be licensed under the
[Apache License 2.0](LICENSE).

---

## Questions

Open a [Discussion](https://github.com/raceksd-source/latam-oiv-resolver/discussions)
or email `david@reizan.io`.
