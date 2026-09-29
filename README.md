# NEC Design Scaffold MCP

A reusable Model Context Protocol server for the NEC (Not Even Close) design scaffold.

## Design grammar

- Xanh Mono — display / expression
- Overpass Mono — structure / navigation
- Fira Code — information / body
- Absolute black / white surfaces
- 1px structural rules
- 92px desktop rail / 54px mobile rail
- 0.8–2.4px tracking
- open leading with 1.2–2.4pt breathing space
- editorial grid proportions
- slow physical-feeling tile flips
- progressive disclosure: front → flip → back → enter

## MCP tools

- `nec_tokens` — complete design-token system
- `nec_typography` — type roles and hierarchy
- `nec_layout` — grid, rail, spacing and responsive rules
- `nec_motion` — motion language
- `nec_tile` — generate a flip-tile component
- `nec_scaffold` — generate a bare-bones NEC HTML scaffold
- `nec_validate` — validate HTML/CSS against the scaffold

## Run

```bash
npm install
npm run dev
```

The server communicates over stdio as an MCP server.
