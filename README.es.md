# latam-oiv-resolver

> **Registro canónico de operadores de infraestructura crítica de América Latina.**
> Primer resolver multi-país para los equivalentes a "Operadores de Importancia
> Vital" (OIV) dentro de los marcos regulatorios LATAM.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://img.shields.io/badge/npm-v0.1.0--alpha-orange.svg)](https://www.npmjs.com/package/latam-oiv-resolver)

Leer en: [English](README.md) · **Español** · [Português (BR)](README.pt-br.md)

---

## ¿Por qué un Atlas LATAM?

Cada país de la región tiene regulación emergente que designa a "operadores de
infraestructura crítica" bajo términos locales distintos, con reguladores e
identificadores nacionales heterogéneos:

| País | Término local | Marco normativo | Registro público |
|---|---|---|---|
| Chile | OIV (Operadores de Importancia Vital) | Ley 21.663 (2024) | Res Exenta 87 (dic 2025) · 915 entidades |
| Brasil | Operadores de Infraestrutura Crítica | PNSI + LGPD | Parcial · GSI/PR |
| México | Infraestructura Crítica · Sectores Estratégicos | LFPD + ISO 27001 MX | Sin lista unificada |
| Colombia | Infraestructura Crítica Cibernética | CONPES 3854 + Ley 2300 | Parcial · ColCERT |
| Argentina | OSE (Operadores de Servicios Esenciales) | Estrategia Nacional de Ciberseguridad | Sin registro oficial |
| Uruguay | Operadores Críticos | Marco AGESIC | Limitado |
| Perú | Operadores de Infraestructura Crítica | DLeg 1412 · Política Nac. Ciberseg. 2030 | Parcial · DINI |
| Ecuador | Sectores Estratégicos · Operadores Críticos | Política Nacional de Ciberseguridad | No |
| Costa Rica | Infraestructura Crítica | Estrategia Nacional de Ciberseguridad | No |
| Panamá | Infraestructuras Críticas | Estrategia Nacional de Ciberseguridad | No |

**Problema:** entre 5.000 y 8.000 operadores críticos en LATAM sin un registro
unificado. La investigación en ciberseguridad debe reconstruirse desde cero
por cada país. Los reportes de vendors generan falsos positivos. Los formatos
de identificador son heterogéneos (RUT · CPF/CNPJ · RFC · CUIT · CC · DNI · RUC).

**Solución:** `latam-oiv-resolver` ofrece una API unificada y un JSON Schema
para resolver operadores críticos en jurisdicciones LATAM, con adaptadores
por país y normalización de identificadores.

---

## Estado: `v0.1.0-alpha` · piloto en 5 países

| País | Estado | Cobertura | Fuente |
|---|---|---|---|
| Chile (CL) | Estable | 915 / 915 (100%) | Vía [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0 |
| Argentina (AR) | Stub | — | Pendiente contribución |
| Uruguay (UY) | Stub | — | Pendiente contribución |
| Brasil (BR) | Stub (prioritario) | — | Pendiente contribución |
| Colombia (CO) | Stub | — | Pendiente contribución |
| México (MX) | Stub | — | Pendiente contribución |
| Perú (PE) | Stub | — | Pendiente contribución |
| Ecuador (EC) | Stub | — | Pendiente contribución |
| Costa Rica (CR) | Stub | — | Pendiente contribución |
| Panamá (PA) | Stub | — | Pendiente contribución |

> Este release es intencionalmente un **esqueleto alpha**. Solo Chile delega
> en un paquete productivo verificado. Los demás países son placeholders que
> documentan fuentes oficiales e invitan contribuciones locales.

---

## Cómo contribuir un país

Ver [CONTRIBUTING.md](CONTRIBUTING.md). Cada país nuevo requiere:

1. **Documentación del marco legal** (`data/countries/{cc}/source.md`)
2. **Normalizador de identificador** (`src/normalizers/{tipo}-{cc}.ts`)
3. **Adapter del país** (`src/adapters/{cc}-{regulador}.ts`)
4. **Dataset JSON de entidades** (`data/countries/{cc}/known-domains.json`)
5. **Tests unitarios + documentación**

---

## Inicio rápido

```bash
npm install latam-oiv-resolver
npm install anci-oiv-resolver   # peer dependency opcional para cobertura Chile
```

```typescript
import { resolveOperator } from 'latam-oiv-resolver';

const cl = await resolveOperator({
  country: 'CL',
  identifier: '97006000-6',
  razonSocial: 'BANCO DE CRÉDITO E INVERSIONES',
});
```

---

## Licencia

Apache License 2.0 · ver [LICENSE](LICENSE).

## Autor

**David Mellafe Zuvic** · Investigación independiente de ciberseguridad ·
La Serena, Chile · `david@reizan.io`

## Seguridad

Para reportar una vulnerabilidad de forma privada, ver [SECURITY.md](SECURITY.md).
