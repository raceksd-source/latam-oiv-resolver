# Argentina — regulatory framework

## Country

- **English:** Argentina
- **Local (Spanish):** Argentina

## Local term

**OSE — Operadores de Servicios Esenciales.** Also referenced as
"infraestructuras críticas de información" in derived regulations.

## Regulator / agency

**Dirección Nacional de Ciberseguridad** (under the Secretaría de
Innovación Pública). Coordinated with **ICIC-CERT** (Programa Nacional de
Infraestructuras Críticas de Información y Ciberseguridad).

## Legal framework

- **Estrategia Nacional de Ciberseguridad** · Resolución 580/2011 (founding)
  and successors. https://www.argentina.gob.ar/jefatura/innovacion-publica
- **Decreto 577/2017** · Comité de Ciberseguridad.
- **Ley 25.326** · Protección de Datos Personales (cross-cutting).

## Official registry availability

**No.** Argentina does not publish a unified registry of OSEs. Mapping is
inferred from sectoral regulators (BCRA for banking, ENACOM for telecom,
ENRE for electricity, etc.).

## Identifier format

**CUIT — Clave Única de Identificación Tributaria.** Format `XX-XXXXXXXX-X`
with a modulo-11 verifier digit. See `src/normalizers/cuit-ar.ts`.

## Last updated

- Source verification: pending.
- Adapter status: stub.

## Sources

- Dirección Nacional de Ciberseguridad: https://www.argentina.gob.ar/jefatura/innovacion-publica/ciberseguridad
- ICIC: https://www.argentina.gob.ar/jefatura/innovacion-publica/ssetic/direccion-nacional-ciberseguridad
- AFIP (CUIT lookup): https://www.afip.gob.ar
