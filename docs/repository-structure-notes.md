# Repository Structure Notes

This repository is organized around a synthetic enterprise compliance automation and readiness platform.

## Current structure

- `README.md` — project positioning, scope, safe language, and validation commands.
- `src/` — deterministic dashboard readiness data and framework metadata.
- `tests/` — Node.js tests for the synthetic readiness model.
- `docs/` — conceptual architecture notes and SOX ITGC readiness documentation.
- `controls/` — synthetic control-as-code examples.
- `scripts/` — validation scripts and local synthetic examples.

## Placement rules

- GitHub Actions workflows belong in `.github/workflows/*.yml` only when they are runnable and intentionally active.
- Conceptual workflow ideas belong in `docs/`.
- Control-as-code examples belong in `controls/*.yaml`.
- Local synthetic Python examples belong in `scripts/*.py`.
- Root-level extensionless note files should not be used.
