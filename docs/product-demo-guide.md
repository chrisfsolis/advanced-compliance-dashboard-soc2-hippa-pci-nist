# Product Demo Guide: Security Program Operations Dashboard

## Demo goal

The product demo UI provides a synthetic view of security program operations, including framework readiness, control ownership, evidence workflows, vendor risk, identity/access operations, operational resilience, fraud and funds-transfer review workflows, and AI tooling governance.

The goal is to help a viewer understand what controls exist, who owns them, what evidence is available, what needs review, and where operational security gaps remain.

## How to run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the homepage product demo.

## Product walkthrough

1. Review the security program overview.
2. Open framework readiness.
3. Review vendor risk queue.
4. Inspect identity and access operations.
5. Review evidence worth collecting.
6. Check operational resilience and BCDR readiness.
7. Review AI tooling governance.
8. Close with the boundary note.

## Sections explained

- **Security program overview** shows synthetic status, priority, owner role, and reason cards for major operating areas.
- **Framework readiness** shows readiness signals across SOC 2, SOX ITGC, HIPAA, PCI DSS, NIST RMF, and NIST 800-53.
- **Security Program Pillars** maps program areas to owners, evidence examples, next actions, friction, and automation opportunities.
- **Vendor Risk Review Queue** shows criticality, data sensitivity, SOC 2 report status, contract safeguard status, gaps, reviewers, and next actions.
- **Identity & Access Operations** emphasizes low-friction workflows for SSO, MFA, access reviews, provisioning, stale accounts, service accounts, and exceptions.
- **Evidence Worth Collecting** separates operating-practice evidence from low-value documentation.
- **Operational Security Loop** surfaces repeatable review areas such as DLP review, backup monitoring, endpoint compliance, asset lifecycle, risk assessment, incident intake, exceptions, and retention.
- **Business Continuity & Disaster Recovery** highlights plan ownership, backup policy, restore tests, incident response, escalation, notification decisions, tabletop exercises, and post-incident reviews.
- **Fraud and Funds-Transfer Controls** shows finance-partnered control readiness for sensitive payment and bank detail workflows.
- **AI Tooling Governance** treats AI-assisted tooling as part of the security operating model with data-boundary review and human approval for sensitive workflows.

## What the demo shows

- Synthetic readiness signals.
- Control ownership and reviewer routing.
- Evidence examples that demonstrate operating practice.
- Review queues for vendor risk, identity/access, resilience, and exceptions.
- Safe boundary language that requires human review.

## What the demo does not claim

- It does not determine compliance.
- It does not validate control effectiveness.
- It does not provide legal assurance.
- It does not provide financial audit assurance.
- It does not add real integrations, real company data, authentication, a database, external API calls, live evidence collection, model calls, or new backend services.

SOX coverage is limited to synthetic ITGC readiness workflows and does not represent SOX compliance, financial audit assurance, or control effectiveness validation.

## Validation commands

```bash
npm run lint
npm run test
npm run build
npm run typecheck
npm run claim-safety
```
