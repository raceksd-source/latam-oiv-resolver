# Identifier formats reference

This directory documents the LATAM national identifier formats currently
supported by the resolver, plus the canonical normalization rules applied
by each normalizer module under [`src/normalizers/`](../../src/normalizers/).

See [`normalizers.json`](normalizers.json) for the machine-readable summary.

## Quick reference

| Country | Identifier | Length | Canonical form | Checksum |
|---|---|---|---|---|
| Chile (CL) | RUT | 7–9 digits + 1 verifier | `########-X` (digits + uppercase X) | Modulo-11, last char 0–9 or K |
| Brasil (BR) | CNPJ | 14 digits | `XX.XXX.XXX/XXXX-XX` | Modulo-11 (2 digits) |
| México (MX) | RFC | 12 (moral) / 13 (física) | Uppercase alphanumeric | Homoclave (SAT proprietary) |
| Argentina (AR) | CUIT/CUIL | 11 digits | `XX-XXXXXXXX-X` | Modulo-11 verifier |
| Uruguay (UY) | RUT | 12 digits | `XXXXXXXXXXXX` | Not currently validated |
| Colombia (CO) | NIT | 9 digits + 1 verifier | `XXXXXXXXX-X` | Not currently validated |
| Perú (PE) | RUC | 11 digits | `XXXXXXXXXXX` | Modulo-11 (planned) |
| Ecuador (EC) | RUC | 13 digits | `XXXXXXXXXXXXX` | Mod-11 / variant (planned) |
| Costa Rica (CR) | Cédula Jurídica | 10 digits | `3-101-XXXXXX` | Not currently validated |
| Panamá (PA) | RUC | Variable | TBD | Not currently validated |

The "not currently validated" rows are tracked under the `data/countries/{cc}/`
source documents and the corresponding stub adapters.

## Adding a new normalizer

1. Create `src/normalizers/{type}-{cc}.ts` exposing `normalize{Type}{CC}`
   and `isValid{Type}{CC}` pure functions.
2. Add the type to the `IdentifierType` union in `src/types.ts`.
3. Update the switch in `src/normalizers/index.ts`.
4. Add an entry to `data/identifier-formats/normalizers.json`.
5. Add tests under `test/`.

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for the full checklist.
