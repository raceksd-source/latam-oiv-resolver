# México — regulatory framework

## Country

- **English:** Mexico
- **Local (Spanish):** México

## Local term

**Sectores Estratégicos** · "infraestructura crítica" used informally
across LFCE Article 28 and federal cybersecurity guidance.

## Regulator / agency

- **Centro Nacional de Respuesta a Incidentes Cibernéticos (CERT-MX)**
  under the **Guardia Nacional**.
- **INAI** · Instituto Nacional de Transparencia, Acceso a la Información
  y Protección de Datos Personales (data protection).

## Legal framework

- **LFPDPPP** · Ley Federal de Protección de Datos Personales en Posesión
  de los Particulares.
  https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf
- **Estrategia Nacional de Ciberseguridad (2017)** · publicada por el
  Comité Especializado en Seguridad de la Información (CESI).
- **LFCE Art. 28** · define los sectores estratégicos a nivel federal.

## Official registry availability

**No unified list.** Sectoral regulators (CNBV for banking, IFT for
telecom, CRE for energy, CONAGUA for water) maintain partial lists in
their respective domains.

## Identifier format

**RFC — Registro Federal de Contribuyentes.** 12 chars (persona moral) or
13 chars (persona física). See `src/normalizers/rfc-mx.ts`. Homoclave is
not verified (SAT-proprietary algorithm).

## Last updated

- Source verification: pending.
- Adapter status: stub.

## Sources

- Guardia Nacional · CERT-MX: https://www.gob.mx/gncertmx
- INAI: https://home.inai.org.mx
- SAT (RFC validator): https://www.sat.gob.mx
