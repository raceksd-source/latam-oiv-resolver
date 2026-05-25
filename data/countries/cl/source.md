# Chile — regulatory framework

## Country

- **English:** Chile
- **Local (Spanish):** Chile

## Local term

**OIV — Operadores de Importancia Vital** (Operators of Vital Importance).

## Regulator / agency

**ANCI — Agencia Nacional de Ciberseguridad e Infraestructura Crítica de la Información.**

- Created by Ley 21.663 (2024).
- Public site: https://www.anci.gob.cl

## Legal framework

- **Ley 21.663** (Marco Nacional de Ciberseguridad). Published 2024.
  Establishes the OIV concept, ANCI's mandate, and incident reporting duties.
  Official: https://www.bcn.cl/leychile/navegar?idNorma=1209641
- **Ley 21.459** (Delitos Informáticos). Published 2022. Cybercrime law and
  good-faith research safe harbor framework.
  Official: https://www.bcn.cl/leychile/navegar?idNorma=1177039
- **Resolución Exenta No. 87** (ANCI · December 2025). Publishes the
  first official list of 915 OIVs.

## Official registry availability

**Yes — public.** The 915-entity registry is published as a CSV by ANCI in
the December 2025 Resolución Exenta No. 87 release. The companion package
`anci-oiv-resolver` ingests and normalizes this registry.

## Identifier format

**RUT — Rol Único Tributario.** Format `########-X` with a modulo-11
verifier digit. See `src/normalizers/rut-cl.ts`.

## Last updated

- Source publication: 2025-12 (Res Exenta 87).
- Adapter snapshot: companion package `anci-oiv-resolver` v0.5.0 (2026-05).
- Last verified: 2026-05-24.

## Sources

- ANCI: https://www.anci.gob.cl
- BCN (Ley 21.663): https://www.bcn.cl/leychile/navegar?idNorma=1209641
- BCN (Ley 21.459): https://www.bcn.cl/leychile/navegar?idNorma=1177039
- Companion package: https://github.com/raceksd-source/anci-oiv-resolver
