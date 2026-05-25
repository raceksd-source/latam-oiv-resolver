# Pull request

## Summary

<!-- A 1-3 line summary of the change. -->

## Type of change

- [ ] New country dataset
- [ ] Data correction (existing country)
- [ ] Normalizer (new or improvement)
- [ ] Adapter (new or improvement)
- [ ] Documentation (README, source.md, METHODOLOGY)
- [ ] Build / CI / tooling
- [ ] Bug fix
- [ ] Refactor (no functional change)

## Country (if applicable)

- ISO 3166-1 alpha-2: `<CL | BR | MX | AR | UY | CO | PE | EC | CR | PA>`

## Sources

<!-- For new country or data corrections, cite the public regulator publication(s). -->

## Checklist

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` produces `dist/index.js` and `dist/index.d.ts`.
- [ ] If a new country, `data/countries/<cc>/source.md` is included.
- [ ] If a new country, the `_meta.json` country block is updated.
- [ ] If a new normalizer, tests cover ≥3 valid + ≥3 invalid + ≥1 edge case.
- [ ] Public, non-paywalled sources cited for any new dataset entry.
- [ ] PR scope is limited (one country or one concern per PR).

## Notes for reviewers

<!-- Optional context, follow-ups, caveats. -->
