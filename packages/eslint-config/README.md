# `@lanun/eslint-config` 🏴‍☠️

Reusable flat-config ESLint presets. `@eslint/js`, `globals` and `typescript-eslint` are bundled; everything else is an optional peer — install only what your entries use.

| Entry | Purpose | Extra peers |
|---|---|---|
| `@lanun/eslint-config` / `/base` | JS + TypeScript rules, no formatting | `eslint`, `typescript` |
| `/prettier` | Prettier via ESLint | `prettier`, `eslint-config-prettier`, `eslint-plugin-prettier` |
| `/stylistic` | `@stylistic` formatting (alternative to Prettier) | `@stylistic/eslint-plugin` |
| `/only-warn` | Downgrade all rules to warnings | `eslint-plugin-only-warn` |
| `/react` | Base + React and hooks | `eslint-plugin-react`, `eslint-plugin-react-hooks` |
| `/next` | React + Next.js | `@next/eslint-plugin-next`, `eslint-config-next` |
| `/turbo` | Turborepo env var rule | `eslint-plugin-turbo` |

Each entry exports `config` (an array). Put formatting and `only-warn` last.

```js
// eslint.config.mjs
import { config } from '@lanun/eslint-config/react'
import { config as prettier } from '@lanun/eslint-config/prettier'

export default [...config, ...prettier, { ignores: ['.next/**'] }]
```

```bash
pnpm add -D @lanun/eslint-config eslint typescript
# plus the peers for the entries you use, e.g.
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier
```
