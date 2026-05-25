# Chile (CL) — country dataset

**Status:** Implemented (via companion package).
**Coverage:** 915 / 915 operators (100%).
**Delegate:** [`anci-oiv-resolver`](https://github.com/raceksd-source/anci-oiv-resolver) v0.5.0.

Chile is the reference implementation country. The Chile adapter
(`src/adapters/cl.ts`) delegates resolution to the standalone
`anci-oiv-resolver` package, which holds the full canonical dataset
under the Ley 21.663 / ANCI framework.

The `_placeholder.json` in this directory is an empty file that exists
only to keep the directory under version control. The authoritative
dataset is published by the companion package.

See [`source.md`](source.md) for the regulatory citations.
