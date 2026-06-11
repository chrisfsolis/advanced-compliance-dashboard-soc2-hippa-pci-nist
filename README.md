# soc2-sox-enterprise-private-compliance-platform

A synthetic security program operations and compliance readiness platform demonstrating control ownership, evidence workflows, vendor risk review, identity/access operations, operational resilience, control-as-code examples, evidence pipeline concepts, and multi-framework readiness dashboard patterns.

This repository provides a demo-oriented GRC command center for synthetic control coverage, evidence completeness, risk scoring, remediation workflows, review support, evidence activity logs, and executive reporting without using real customer data. The product demo UI focuses broadly on security program operations while SOC 2, SOX ITGC, HIPAA, PCI DSS, NIST RMF, and NIST 800-53 remain supported synthetic readiness frameworks.

All data is synthetic. Outputs are readiness/demo artifacts, not compliance determinations.

## What this project demonstrates

- Synthetic security program operations dashboard patterns.
- Product demo UI for framework readiness, control ownership, evidence workflows, vendor risk, identity/access operations, operational resilience, and AI tooling governance.
- SOC 2 readiness and SOX ITGC readiness workflows.
- Control-as-code example structure in `controls/`.
- Evidence pipeline concept notes for local-first demo artifacts.
- PR gate / control check concepts for safe review workflows.
- Safe non-claim language for advisory readiness signals.


## Product Demo UI

The product demo UI provides a synthetic view of security program operations, including framework readiness, control ownership, evidence workflows, vendor risk, identity/access operations, operational resilience, fraud and funds-transfer review workflows, and AI tooling governance.

Run the local demo with:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the default homepage route.

The UI includes:

- A Security Program Operations Dashboard hero and overview cards.
- Framework readiness across SOC 2, SOX ITGC, HIPAA, PCI DSS, NIST RMF, and NIST 800-53.
- Security Program Pillars with owners, evidence examples, next actions, friction, and automation opportunities.
- Vendor Risk Review Queue with synthetic vendor categories, report review status, contract safeguard status, gaps, reviewers, and next actions.
- Identity & Access Operations for SSO, MFA, access reviews, provisioning, stale accounts, service accounts, and exceptions.
- Evidence Worth Collecting to distinguish useful operating-practice evidence from low-value documentation.
- Operational Security Loop, Business Continuity & Disaster Recovery, Fraud and Funds-Transfer Controls, and AI Tooling Governance sections.
- A reusable Control Detail Panel and Product Demo Path.

All UI data is synthetic and local-demo-oriented. The dashboard uses readiness language only, requires human review, does not determine compliance, and does not validate control effectiveness.

SOX coverage is limited to synthetic ITGC readiness workflows and does not represent SOX compliance, financial audit assurance, or control effectiveness validation.

See [Product Demo Guide](docs/product-demo-guide.md) for the walkthrough and validation commands.

## Supported readiness frameworks

The dashboard models 6 synthetic readiness frameworks:

- SOC 2
- SOX ITGC
- HIPAA
- PCI DSS
- NIST RMF
- NIST 800-53

## SOX ITGC Readiness

SOX ITGC Readiness focuses on synthetic IT General Control workflows for systems that support financial reporting, including user access review, privileged access, change management, deployment approval, segregation of duties, audit logging, backup/recovery, and evidence owner review.

SOX coverage is limited to synthetic ITGC readiness workflows and does not represent SOX compliance, financial audit assurance, or control effectiveness validation.

## Synthetic SOX ITGC control areas

The SOX ITGC readiness model includes deterministic demo controls for:

- Access Management
- Privileged Access
- Joiner / Mover / Leaver
- Change Management
- Deployment Approval
- Segregation of Duties
- Audit Logging
- Backup and Recovery
- Incident and Change Evidence Retention
- Financial Application Owner Review

## Dashboard coverage

The dashboard data model represents framework cards, charts, readiness summaries, framework filters, coverage tables, synthetic evidence inventories, and demo readiness signals for SOC 2, SOX ITGC, HIPAA, PCI DSS, NIST RMF, and NIST 800-53.

SOX ITGC is represented as readiness and evidence completeness only. The project does not determine SOX compliance, does not validate control design or operating effectiveness, and does not provide financial audit assurance.

## Control-as-code and evidence concepts

- [SOC 2 + SOX control-as-code example](controls/soc2-sox-control-as-code-example.yaml)
- [Control evaluation engine concept](docs/control-evaluation-engine.md)
- [Evidence pipeline architecture concept](docs/evidence-pipeline-architecture.md)
- [PR gate / control check concept](docs/pr-gate-concept.md)
- [Repository structure notes](docs/repository-structure-notes.md)
- [SOX ITGC readiness note](docs/sox-itgc-readiness.md)
- [Product demo guide](docs/product-demo-guide.md)

Local Python examples are provided for synthetic metadata collection and advisory readiness evaluation:

- `scripts/evidence_collector_example.py`
- `scripts/control_evaluation_example.py`

## Validation

Use the included scripts to validate the synthetic framework model, migrated example files, and claim-safety guardrails:

```bash
npm install
npm run lint
npm run test
npm run build
npm run typecheck
npm run claim-safety
```

Additional focused checks can be run with standard local tooling:

```bash
ruby -e 'require "yaml"; Dir[".github/workflows/*.yml", "controls/*.yaml"].each { |file| YAML.load_file(file) }'
python3 -m py_compile scripts/*.py
find . -maxdepth 1 -type f ! -name '*.*' ! -name 'LICENSE' -print
```

## Demo limitations

- All framework data is synthetic and deterministic.
- The app does not add backend services or external API calls.
- Control-as-code and evidence pipeline materials are examples and concepts.
- The SOX ITGC workflow is limited to readiness visibility for ITGC evidence themes.
- Legal, accounting, and auditor review remain outside the scope of this demo repository.
