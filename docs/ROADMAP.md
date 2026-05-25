# Roadmap

## Q3 2026 · `v0.1.x` → `v0.2.x` · 5-country pilot

- [x] `CL` — Chile · live via `anci-oiv-resolver` v0.5.0.
- [ ] `AR` — Argentina · CUIT normalizer ready · awaiting adapter contribution.
- [ ] `UY` — Uruguay · normalizer + adapter contribution.
- [ ] `BR` — Brasil · CNPJ normalizer ready · partial adapter target.
- [ ] `CO` — Colombia · NIT normalizer + partial adapter target.

Milestones:

- Per-country `source.md` published for all 10 LATAM-pilot countries.
- Schema validator wired into CI (`schema-validate` job).
- Working example for at least 2 implemented countries.

## Q4 2026 · `v0.3.x` → `v1.0.0`

- [ ] `MX` — México · RFC normalizer ready · adapter contribution.
- [ ] `PE` — Perú · RUC normalizer + adapter.
- [ ] `EC` — Ecuador · RUC normalizer + adapter.
- [ ] Cut `v1.0.0` stable once at least 5 countries are implemented and
  cover ≥ 60% of LATAM critical-infrastructure operators by mass.

## Q1–Q2 2027 · expanded coverage

- [ ] `CR` — Costa Rica.
- [ ] `PA` — Panamá.
- [ ] Caribbean: `DO`, `JM` (Spanish + English coverage).
- [ ] Cono Sur: `PY`, `BO`.

## 2028 · maturity

- LATAM 95%+ coverage by operator mass.
- Annual update cadence aligned with each national regulator's revision cycle.
- Companion publication: revised *Coverage Gap in LATAM Critical Infrastructure
  Cybersecurity* (Mellafe, 2027) covering ≥ 5 country case studies.
- Optional sibling packages per country (e.g. `pnsi-oiv-resolver-br`,
  `cnci-oiv-resolver-mx`) following the `anci-oiv-resolver` template.

## Always

- Quarterly review of every country `source.md` (urls, regulator name,
  framework citations).
- Public changelog (per release) for both code and data.
- Security advisories for any data poisoning attempts.

## Out of scope

- Non-LATAM countries (would belong in a sibling package, e.g.
  `eu-nis2-oiv-resolver`).
- Active probing of operator infrastructure.
- Private (non-public) operator data.
- Commercial enrichment data (sales contacts, financials).
