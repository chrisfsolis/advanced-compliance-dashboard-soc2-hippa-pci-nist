# compliance-readiness-advanced-dashboard-soc2-sox-hippa-pci-nist

An enterprise compliance readiness dashboard using synthetic data to visualize control readiness across SOC 2, SOX ITGC, HIPAA, PCI DSS, NIST RMF, and NIST 800-53.

This repository provides a demo-oriented GRC command center for multi-framework readiness. It focuses on synthetic control coverage, evidence completeness, risk scoring, remediation workflows, review support, evidence activity logs, and executive reporting without using real customer data.

## Supported readiness frameworks

The dashboard models 6 frameworks:

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

## Validation

Use the included Node.js scripts to validate the synthetic framework model and claim-safety guardrails:

```bash
npm install
npm run lint
npm run test
npm run build
npm run typecheck
npm run claim-safety
```

## Demo limitations

- All framework data is synthetic and deterministic.
- The app does not add backend services or external API calls.
- The SOX ITGC workflow is limited to readiness visibility for ITGC evidence themes.
- Legal, accounting, and auditor review remain outside the scope of this demo repository.
