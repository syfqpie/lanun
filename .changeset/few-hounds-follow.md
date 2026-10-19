---
'@lanun/eslint-config': patch
---

`base` no longer includes Prettier, `only-warn` or core stylistic rules. Add `@lanun/eslint-config/prettier` (or `/stylistic`) and `/only-warn` explicitly.
- Added `prettier`, `stylistic` and `only-warn` entries, plus a default `.` export.
- `@eslint/js`, `globals` and `typescript-eslint` are now regular dependencies; formatting and framework plugins are optional peers.
- Added `curly`, `no-console` and `no-debugger` rules.
