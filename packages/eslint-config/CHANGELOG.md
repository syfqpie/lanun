# @lanun/eslint-config

## 0.0.5

### Patch Changes

- [`5519d23`](https://github.com/syfqpie/lanun/commit/5519d237055606b30ae1e1dc944d61779eefc87f) Thanks [@syfqpie](https://github.com/syfqpie)! - Added missing config

## 0.0.4

### Patch Changes

- [#24](https://github.com/syfqpie/lanun/pull/24) [`4423f9c`](https://github.com/syfqpie/lanun/commit/4423f9cd79fc2ed5e7672de82c0edbf7b28f1a31) Thanks [@syfqpie](https://github.com/syfqpie)! - `base` no longer includes Prettier, `only-warn` or core stylistic rules. Add `@lanun/eslint-config/prettier` (or `/stylistic`) and `/only-warn` explicitly.
  - Added `prettier`, `stylistic` and `only-warn` entries, plus a default `.` export.
  - `@eslint/js`, `globals` and `typescript-eslint` are now regular dependencies; formatting and framework plugins are optional peers.
  - Added `curly`, `no-console` and `no-debugger` rules.

## 0.0.3

### Patch Changes

- f680f4c: - Added `turbo` config.
  - Changed `react-internal` to `react`
  - Rules improvement

## 0.0.2

### Patch Changes

- 9d304b4: fix npm publish config
