# Security Policy

## Responsible Disclosure (Divulgación Responsable)

If you discover a vulnerability in this tool, please report it **privately** via:

- **Email:** `david@reizan.io`
- **PGP key:** published on [keys.openpgp.org](https://keys.openpgp.org/search?q=david%40reizan.io) (fingerprint announced in release notes).
- **Suggested subject:** `[SECURITY] latam-oiv-resolver — <short description>`

**Do not publish** the vulnerability publicly until disclosure has been
coordinated with the maintainer.

### What to include

- Clear description of the vulnerability.
- Reproduction steps (proof of concept).
- Potential impact for consumers of the package.
- Your name or handle for credit (optional · anonymous reports accepted).

### Response timelines (ISO/IEC 29147:2018)

| Stage | Target |
|---|---|
| Acknowledgement of receipt | **≤ 72 hours** |
| Initial evaluation + triage | **≤ 7 days** |
| Patch development | **≤ 30 days** (severity-dependent) |
| Coordinated public disclosure | **≤ 90 days from report** |

Critical vulnerabilities (CVSS ≥ 9.0) may be patched on accelerated timelines
with private notification to known downstream consumers.

This security policy is **aligned with** ISO/IEC 29147:2018 and ISO/IEC
30111:2019. ISO 29147 is a non-certifiable framework; the project does not
claim certification.

## Scope

### In scope

- The `latam-oiv-resolver` package (all published versions).
- Accuracy of country datasets under `data/countries/*/` (incorrect mappings,
  missing entities, false positives).
- Integrity of build, CI, and release pipeline.
- Supply chain vectors (dependency confusion, typosquatting).
- Data-poisoning vectors against `data/countries/*/known-domains.json`
  (incorrect entries that bypass CI validation).

### Out of scope

- Vulnerabilities in external services referenced (e.g. registrar APIs,
  national CSIRT websites).
- Social engineering against the maintainer or contributors.
- Resource-exhaustion DoS against the optional verifier modules.

## Supported versions

| Version | Support |
|---|---|
| 0.1.x-alpha | Active (early development) |

The package is currently in alpha. Production users should pin a specific
version and consult [CHANGELOG.md](CHANGELOG.md) before upgrading.

## Applicable legal frameworks

This tool operates with reference to (no certification claim):

- **Chile** — Ley 21.663 (Marco Nacional de Ciberseguridad, 2024) ·
  Ley 21.459 (Delitos Informáticos, 2022).
- **Brasil** — PNSI (Política Nacional de Segurança da Informação, Dec. 9.637/2018)
  · LGPD (Lei 13.709/2018).
- **México** — LFPD, Lineamientos Generales sobre Protección de Datos.
- **Colombia** — CONPES 3854 (Política Nacional de Seguridad Digital) · Ley 2300.
- **Argentina** — Estrategia Nacional de Ciberseguridad.
- **Uruguay** — Marco AGESIC para Operadores Críticos.
- **Perú** — DLeg 1412 · Política Nacional de Ciberseguridad 2030.
- **Standards** — ISO/IEC 29147:2018, ISO/IEC 30111:2019.
- **United States** — DOJ Good Faith Security Research Framework (2017),
  cross-border safe harbor for good-faith research.

Researchers acting in good faith under these frameworks **will not be subject
to legal action** by the maintainer or affiliated entities.

## Safe Harbor

**We commit to:**

- Not initiate legal action against good-faith researchers.
- Work collaboratively to understand and validate reports.
- Credit contributors in release notes (absent request for anonymity).
- Provide reasonable time for patch deployment before public disclosure.

**We expect researchers to:**

- Make a good-faith effort to avoid privacy violations.
- Only interact with accounts or data they own or have explicit permission
  to access.
- Not exploit findings beyond what is necessary to verify.
- Not engage in extortion or threats.

## Notes on tool purpose

`latam-oiv-resolver` is a tool for **defensive research** and **academic
study** — not for offensive use. It performs only public, passive lookups
and does not initiate active probing of third-party systems.

## Hall of Fame

Researchers who responsibly report will be credited here (with their consent).

*No entries yet.*

---

**Maintainer:** David Mellafe Z. · `david@reizan.io`
**Last updated:** 2026-05-24
