# Tests

Unit tests use Node.js built-in test runner (`node:test`) via `tsx`.

## Run

```bash
npm test
```

## Conventions

- One test file per concern (normalizers, adapters, resolver).
- Per-country normalizer tests: at least 3 valid · 3 invalid · 1 edge case.
- Tests must not make network calls. Network-bound checks (DNS verification
  in adapters) belong in a separate `live-*` suite gated by environment.

## Adding tests for a new country

When contributing a new country, add:

1. Normalizer tests under `test/normalizers.test.ts` (extend the existing
   file rather than spawning per-country files until the suite becomes
   unwieldy).
2. Adapter tests under `test/adapters.{cc}.test.ts` (create on first need).
3. Schema validation in CI is enforced by `.github/workflows/ci.yml`.
