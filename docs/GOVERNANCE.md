# Governance

`latam-oiv-resolver` is an independent research artifact maintained by
David Mellafe Zuvic (Independent Security Researcher · Chile).

This document records the governance model under which contributions
are accepted, country datasets are stewarded, and releases are cut.

## Roles

### Maintainer

- David Mellafe Zuvic · `david@reizan.io`
- Responsibilities:
  - Merge / reject pull requests.
  - Cut releases.
  - Approve country stewards.
  - Operate the security disclosure mailbox.
  - Steward the shared infrastructure: schema, normalizers, adapter contract.

### Country Steward

- One or more contributors per country with verifiable expertise on the
  country's regulatory framework.
- Responsibilities:
  - Maintain `data/countries/{cc}/source.md` and dataset.
  - Triage country-specific issues.
  - Co-review PRs that touch their country.

A country dataset has at most one **lead steward**; additional contributors
may hold steward status with the lead steward's sign-off.

### Contributor

Anyone who opens an issue or pull request, files a corrected entry, or
proposes a translation. No formal status required.

## Decision-making

- **Code (src/), schema (data/schema.json), adapter contract** — final
  decision rests with the maintainer.
- **Country dataset** — primary decision rests with the country steward(s);
  maintainer reserves a final review for compliance with the shared schema
  and public-source policy.
- **Cross-cutting changes** — discussed publicly via GitHub Discussions
  before a PR is merged.

## Release cadence

- Patches: as needed when bugs or data corrections are merged.
- Minor: when a new country is added or a significant API addition lands.
- Major: when a breaking change is required (e.g. schema MAJOR bump).

All releases produce a tag, a `CHANGELOG.md` entry, and a published npm
package version (once `v0.1.0` graduates from alpha).

## Trademarks and attribution

- "Coverage Gap Closure Method™" is used as a methodological label by the
  maintainer's independent research programme. The mark does NOT extend
  to community contributions.
- Country regulator names (ANCI, GSI/PR, AGESIC, etc.) are trademarks
  or designations of their respective owners and are used here for
  identification only.

## Disputes

Disagreements between contributors are mediated by the maintainer. The
[Code of Conduct](../CODE_OF_CONDUCT.md) governs interpersonal conduct.

If a country steward and the maintainer cannot reach agreement on a
dataset entry, the entry is held until additional public sources are
identified. The maintainer's final decision is binding for releases.

## Independent forks

Apache 2.0 permits forks. Contributors who wish to operate a parallel
registry (e.g. with private data sources outside this project's scope)
are encouraged to fork rather than dilute the curation principles
documented in [`METHODOLOGY-LATAM.md`](METHODOLOGY-LATAM.md).

## Last updated

2026-05-24.
