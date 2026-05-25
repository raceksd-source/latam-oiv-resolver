# latam-oiv-resolver

> **Registro canônico de operadores de infraestrutura crítica da América Latina.**
> Primeiro resolver multi-país para os equivalentes a "Operadores de Importancia
> Vital" (OIV) nos marcos regulatórios da região.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![npm version](https://img.shields.io/badge/npm-v0.1.0--alpha-orange.svg)](https://www.npmjs.com/package/latam-oiv-resolver)

Ler em: [English](README.md) · [Español](README.es.md) · **Português (BR)**

---

## Por que um Atlas LATAM?

Cada país da América Latina tem regulação emergente que designa "operadores
de infraestrutura crítica" sob termos locais diferentes, com reguladores e
identificadores nacionais heterogêneos:

| País | Termo local | Marco normativo | Registro público |
|---|---|---|---|
| Chile | OIV (Operadores de Importancia Vital) | Lei 21.663 (2024) | Res Exenta 87 (dez 2025) · 915 entidades |
| Brasil | Operadores de Infraestrutura Crítica | PNSI + LGPD | Parcial · GSI/PR |
| México | Infraestructura Crítica · Sectores Estratégicos | LFPD + ISO 27001 MX | Sem lista unificada |
| Colômbia | Infraestructura Crítica Cibernética | CONPES 3854 + Lei 2300 | Parcial · ColCERT |
| Argentina | OSE (Operadores de Servicios Esenciales) | Estratégia Nacional de Cibersegurança | Sem registro oficial |
| Uruguai | Operadores Críticos | Marco AGESIC | Limitado |
| Peru | Operadores de Infraestructura Crítica | DLeg 1412 · Política Nac. Ciberseg. 2030 | Parcial · DINI |
| Equador | Setores Estratégicos · Operadores Críticos | Política Nacional de Cibersegurança | Não |
| Costa Rica | Infraestrutura Crítica | Estratégia Nacional de Cibersegurança | Não |
| Panamá | Infraestruturas Críticas | Estratégia Nacional de Cibersegurança | Não |

**Desafio:** entre 5.000 e 8.000 operadores críticos na LATAM sem um registro
unificado. A pesquisa em cibersegurança precisa ser reconstruída do zero por
país. Relatórios de fornecedores produzem falsos positivos. Os formatos de
identificador são heterogêneos (RUT · CPF/CNPJ · RFC · CUIT · CC · DNI · RUC).

**Solução:** `latam-oiv-resolver` provê uma API unificada e um JSON Schema
para resolver operadores críticos em jurisdições LATAM, com adapters por
país e normalização de identificadores.

---

## Status: `v0.1.0-alpha` · piloto em 5 países

| País | Status | Cobertura | Fonte |
|---|---|---|---|
| Chile (CL) | Estável | 915 / 915 (100%) | Via [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0 |
| Argentina (AR) | Stub | — | Aguardando contribuição |
| Uruguai (UY) | Stub | — | Aguardando contribuição |
| Brasil (BR) | Stub (prioritário) | — | Aguardando contribuição |
| Colômbia (CO) | Stub | — | Aguardando contribuição |
| México (MX) | Stub | — | Aguardando contribuição |
| Peru (PE) | Stub | — | Aguardando contribuição |
| Equador (EC) | Stub | — | Aguardando contribuição |
| Costa Rica (CR) | Stub | — | Aguardando contribuição |
| Panamá (PA) | Stub | — | Aguardando contribuição |

> Este release é intencionalmente um **esqueleto alpha**. Apenas o Chile
> delega a um pacote produtivo verificado. Os demais países são placeholders
> que documentam fontes oficiais e convidam contribuidores locais.

---

## Contribuição prioritária: Brasil

Como o mercado de cibersegurança brasileiro é o maior da região, contribuições
para `data/countries/br/` têm prioridade. Fontes-alvo iniciais:

- **GSI/PR** — Gabinete de Segurança Institucional da Presidência da República.
- **PNSI** — Política Nacional de Segurança da Informação (Dec. 9.637/2018).
- **LGPD** — Lei Geral de Proteção de Dados (Lei 13.709/2018).
- **CTIR Gov** — Centro de Tratamento e Resposta a Incidentes Cibernéticos.
- **ANPD** — Autoridade Nacional de Proteção de Dados.

Identificadores suportados (esboço inicial):

- **CNPJ** (Cadastro Nacional da Pessoa Jurídica) · 14 dígitos · `00.000.000/0001-00`
- **CPF** (Cadastro de Pessoas Físicas) · 11 dígitos · `000.000.000-00` (somente quando aplicável)

---

## Início rápido

```bash
npm install latam-oiv-resolver
npm install anci-oiv-resolver   # peer dependency opcional para cobertura Chile
```

```typescript
import { resolveOperator } from 'latam-oiv-resolver';

const br = await resolveOperator({
  country: 'BR',
  identifier: '00.000.000/0001-91',
  razonSocial: 'Banco do Brasil',
});
```

---

## Licença

Apache License 2.0 · ver [LICENSE](LICENSE).

## Autor

**David Mellafe Zuvic** · Pesquisa independente em cibersegurança ·
La Serena, Chile · `david@reizan.io`

## Segurança

Para reportar uma vulnerabilidade de forma privada, ver [SECURITY.md](SECURITY.md).
