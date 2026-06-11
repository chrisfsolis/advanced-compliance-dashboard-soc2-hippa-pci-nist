const demoSafetyDisclaimer = 'This demo uses synthetic data to illustrate security-program readiness, control ownership, evidence workflows, and review prioritization. It does not determine compliance, audit readiness, legal adequacy, or control operating effectiveness.';

const demoSummaryCards = [
  {
    id: 'program-scaffolding',
    title: 'Program Scaffolding',
    status: 'Ready',
    owner: 'Security Lead',
    priority: 'High',
    reason: 'Policy stack, evidence cadence, and ownership model are defined; privacy counsel review cadence needs confirmation.'
  },
  {
    id: 'identity-access',
    title: 'Identity & Access',
    status: 'Needs Review',
    owner: 'Security / IT',
    priority: 'High',
    reason: 'SSO/MFA baseline is ready; privileged access and joiner/leaver automation need review.'
  },
  {
    id: 'vendor-risk',
    title: 'Vendor Risk',
    status: 'Needs Review',
    owner: 'Security / Legal',
    priority: 'High',
    reason: 'Critical vendors are inventoried; several SOC 2 reports require deeper review.'
  },
  {
    id: 'operational-security',
    title: 'Operational Security',
    status: 'Owner Needed',
    owner: 'Security / IT Ops',
    priority: 'Medium',
    reason: 'Endpoint and backup workflows are defined; office network and AV ownership need review.'
  },
  {
    id: 'evidence-readiness',
    title: 'Evidence Readiness',
    status: 'Ready',
    owner: 'Security Program',
    priority: 'Medium',
    reason: 'Evidence collection focuses on useful operating proof, not busywork.'
  },
  {
    id: 'bcdr-fraud-controls',
    title: 'BCDR / Fraud Controls',
    status: 'Needs Review',
    owner: 'Security / Finance',
    priority: 'High',
    reason: 'BCDR plan exists in synthetic form; test cadence and funds-transfer controls need owner sign-off.'
  }
];

const firstSixMonthsRoadmap = [
  {
    id: 'month-0-1',
    phase: 'Month 0–1',
    theme: 'Confirm scope and minimum useful evidence',
    actions: [
      'Confirm scope and owners',
      'Inventory systems, vendors, assets, and data flows',
      'Identify HIPAA-grade, GDPR, CCPA, and customer compliance drivers',
      'Define minimum useful evidence'
    ]
  },
  {
    id: 'month-2-3',
    phase: 'Month 2–3',
    theme: 'Formalize the operating loop',
    actions: [
      'Formalize policy stack',
      'Implement identity/access review loop',
      'Vendor risk review for critical vendors',
      'Endpoint/MDM and asset lifecycle baseline'
    ]
  },
  {
    id: 'month-4-6',
    phase: 'Month 4–6',
    theme: 'Test recovery and package evidence',
    actions: [
      'BCDR test',
      'DLP/data leakage review',
      'Privileged access cleanup',
      'Fraud/funds-transfer control review',
      'Evidence packet for customer/compliance asks'
    ]
  }
];

const securityProgramPillars = [
  {
    id: 'pillar-policy-privacy',
    name: 'Policy & Privacy Stack',
    status: 'Ready',
    priority: 'High',
    owner: 'Security Lead / Privacy Counsel',
    maturitySignal: 'Policy map covers employee security, privacy operations, acceptable use, incident response, and data handling.',
    evidenceExamples: ['policy index', 'privacy review cadence', 'employee acknowledgement sample', 'exception register'],
    nextAction: 'Confirm counsel review cadence for EU and California privacy obligations.',
    frictionLevel: 'Low',
    automationOpportunity: 'Policy acknowledgement reminders and exception routing'
  },
  {
    id: 'pillar-compliance-evidence',
    name: 'Compliance Evidence',
    status: 'Ready',
    priority: 'Medium',
    owner: 'Security Program',
    maturitySignal: 'Evidence requests are mapped to operating proof and human review checkpoints.',
    evidenceExamples: ['evidence request register', 'access review sign-off', 'vendor review notes', 'restore test result'],
    nextAction: 'Create reusable evidence packets for customer compliance pressure without overstating conclusions.',
    frictionLevel: 'Low',
    automationOpportunity: 'Automated evidence reminders with reviewer notes'
  },
  {
    id: 'pillar-vendor-risk',
    name: 'Vendor Risk',
    status: 'Needs Review',
    priority: 'High',
    owner: 'Security / Legal',
    maturitySignal: 'Critical vendor categories are inventoried with SOC 2 report and contract review status.',
    evidenceExamples: ['critical vendor inventory', 'SOC 2 report review notes', 'DPA status', 'subservice organization notes'],
    nextAction: 'Review scope, carve-outs, exceptions, and incident notification terms for critical providers.',
    frictionLevel: 'Medium',
    automationOpportunity: 'Renewal-triggered SOC 2 and contract review tasks'
  },
  {
    id: 'pillar-identity-access',
    name: 'Identity & Access',
    status: 'Needs Review',
    priority: 'High',
    owner: 'Security / IT',
    maturitySignal: 'SSO and MFA baselines exist; privileged access and joiner/leaver evidence need automation.',
    evidenceExamples: ['SSO app inventory', 'MFA coverage export', 'privileged access list', 'joiner/leaver workflow sample', 'SCIM configuration evidence'],
    nextAction: 'Review privileged access and automate joiner/leaver evidence collection.',
    frictionLevel: 'Medium',
    automationOpportunity: 'SCIM lifecycle workflows and stale account detection'
  },
  {
    id: 'pillar-endpoint-assets',
    name: 'Endpoint & Asset Lifecycle',
    status: 'Needs Review',
    priority: 'Medium',
    owner: 'IT Operations',
    maturitySignal: 'Apple MDM, endpoint security, hardware lifecycle, and conferencing/AV ownership are defined in draft.',
    evidenceExamples: ['MDM compliance export', 'asset inventory', 'endpoint agent coverage', 'device return checklist'],
    nextAction: 'Assign office network, conferencing, and AV ownership for the global engineering team.',
    frictionLevel: 'Medium',
    automationOpportunity: 'MDM posture exports and lifecycle reminders'
  },
  {
    id: 'pillar-operational-security',
    name: 'Operational Security',
    status: 'Owner Needed',
    priority: 'High',
    owner: 'Security Operations',
    maturitySignal: 'DLP/data leakage, backups, access controls, and risk assessments are tracked as an operating loop.',
    evidenceExamples: ['risk register', 'DLP review notes', 'backup policy', 'control exception queue'],
    nextAction: 'Name owners for DLP tuning and recurring risk assessment review.',
    frictionLevel: 'Medium',
    automationOpportunity: 'Recurring review tasks and exception follow-up'
  },
  {
    id: 'pillar-bcdr-tested-recovery',
    name: 'BCDR & Tested Recovery',
    status: 'Gap',
    priority: 'High',
    owner: 'Security / Engineering',
    maturitySignal: 'Plan exists in synthetic form; recovery is not counted as ready until a test or owner sign-off exists.',
    evidenceExamples: ['BCDR plan owner', 'restore test result', 'tabletop notes', 'post-test action log'],
    nextAction: 'Schedule the first restore test and tabletop exercise.',
    frictionLevel: 'Low',
    automationOpportunity: 'Calendar-driven test evidence and action tracking'
  },
  {
    id: 'pillar-fraud-funds-transfer',
    name: 'Fraud & Funds Transfer Controls',
    status: 'Needs Review',
    priority: 'High',
    owner: 'Finance / Security',
    maturitySignal: 'Finance-partnered control readiness covers approvals, callbacks, escalation, and audit trail retention.',
    evidenceExamples: ['dual approval record', 'bank detail change callback log', 'finance privileged access review', 'escalation path'],
    nextAction: 'Confirm owner sign-off for funds-transfer and vendor-payment-change controls.',
    frictionLevel: 'Low',
    automationOpportunity: 'Approval workflow evidence and exception alerts'
  },
  {
    id: 'pillar-ai-production-threat-model',
    name: 'AI Production Threat Model',
    status: 'Needs Review',
    priority: 'Medium',
    owner: 'Security / AI Engineering',
    maturitySignal: 'AI tooling is treated as part of the security operating model with human review for sensitive workflows.',
    evidenceExamples: ['AI tool inventory', 'data-boundary review', 'provider retention notes', 'production AI incident path'],
    nextAction: 'Review prompt/data leakage risks and human approval gates for sensitive outputs.',
    frictionLevel: 'Medium',
    automationOpportunity: 'AI vendor review reminders and approved-tool catalog'
  }
];

const vendorRiskItems = [
  {
    id: 'vendor-identity-provider',
    vendorCategory: 'Identity provider',
    criticality: 'Critical',
    dataSensitivity: 'Employee identity and privileged access',
    soc2ReportStatus: 'Available - scope review needed',
    contractSafeguardStatus: 'DPA drafted',
    gapSummary: 'Report covers core identity service, but subservice organization carve-outs and incident notification terms need review.',
    recommendedReviewer: 'Security / Legal',
    nextAction: 'Review CUECs, subservice organizations, exceptions, and notification language.'
  },
  {
    id: 'vendor-mdm-provider',
    vendorCategory: 'MDM provider',
    criticality: 'High',
    dataSensitivity: 'Device posture and inventory metadata',
    soc2ReportStatus: 'Requested',
    contractSafeguardStatus: 'Security addendum pending',
    gapSummary: 'Need report and contract language for endpoint telemetry handling.',
    recommendedReviewer: 'IT Operations',
    nextAction: 'Request SOC 2 report and endpoint data processing summary.'
  },
  {
    id: 'vendor-cloud-infrastructure',
    vendorCategory: 'Cloud infrastructure',
    criticality: 'Critical',
    dataSensitivity: 'Production workloads and customer metadata',
    soc2ReportStatus: 'Available - accepted with notes',
    contractSafeguardStatus: 'Complete',
    gapSummary: 'Critical vendor has broad report coverage; verify the services actually used are in scope.',
    recommendedReviewer: 'Security / Engineering',
    nextAction: 'Map active services to report scope and customer responsibility notes.'
  },
  {
    id: 'vendor-customer-support',
    vendorCategory: 'Customer support platform',
    criticality: 'High',
    dataSensitivity: 'Customer communications and support attachments',
    soc2ReportStatus: 'Available - exceptions noted',
    contractSafeguardStatus: 'DPA complete',
    gapSummary: 'Exceptions do not block use in the demo model, but attachment retention and export permissions need review.',
    recommendedReviewer: 'Security / Support Ops',
    nextAction: 'Review retention settings, role permissions, and exception remediation notes.'
  },
  {
    id: 'vendor-payment-finance',
    vendorCategory: 'Payment / finance tool',
    criticality: 'Critical',
    dataSensitivity: 'Vendor payment and bank detail workflow',
    soc2ReportStatus: 'Available - finance review needed',
    contractSafeguardStatus: 'Complete',
    gapSummary: 'SOC 2 report is available, but funds-transfer approval evidence and admin access ownership need finance review.',
    recommendedReviewer: 'Finance / Security',
    nextAction: 'Confirm dual approval, callback verification, and admin access review evidence.'
  },
  {
    id: 'vendor-ai-tooling',
    vendorCategory: 'AI tooling provider',
    criticality: 'High',
    dataSensitivity: 'Prompts, generated outputs, and optional file uploads',
    soc2ReportStatus: 'Requested',
    contractSafeguardStatus: 'Data retention terms under review',
    gapSummary: 'Need confirmation on retention, training use, incident path, and human review expectations for sensitive workflows.',
    recommendedReviewer: 'Security / AI Engineering',
    nextAction: 'Review data-boundary terms and usage policy alignment.'
  },
  {
    id: 'vendor-collaboration-suite',
    vendorCategory: 'Collaboration suite',
    criticality: 'High',
    dataSensitivity: 'Internal documents, calendar, conferencing, and chat metadata',
    soc2ReportStatus: 'Available - accepted with notes',
    contractSafeguardStatus: 'Complete',
    gapSummary: 'Ownership for conferencing and AV settings needs review with IT operations.',
    recommendedReviewer: 'IT Operations',
    nextAction: 'Review sharing defaults, meeting controls, retention, and admin role assignments.'
  },
  {
    id: 'vendor-endpoint-security',
    vendorCategory: 'Endpoint security provider',
    criticality: 'High',
    dataSensitivity: 'Endpoint telemetry and alert metadata',
    soc2ReportStatus: 'Available - scope review needed',
    contractSafeguardStatus: 'Security addendum complete',
    gapSummary: 'Report is available, but telemetry scope and support access procedures need review.',
    recommendedReviewer: 'Security Operations',
    nextAction: 'Validate endpoint coverage evidence and support access safeguards.'
  }
];

const identityControls = [
  { id: 'identity-sso-coverage', name: 'SSO coverage', status: 'Ready', frictionLevel: 'Low', automationOpportunity: 'Monthly app inventory diff', owner: 'Security / IT', evidenceExample: 'SSO application inventory export' },
  { id: 'identity-mfa-coverage', name: 'MFA coverage', status: 'Ready', frictionLevel: 'Low', automationOpportunity: 'Automated MFA exception reminders', owner: 'Security / IT', evidenceExample: 'MFA coverage export with exceptions' },
  { id: 'identity-privileged-review', name: 'Privileged access review', status: 'Needs Review', frictionLevel: 'Medium', automationOpportunity: 'Quarterly owner confirmation workflow', owner: 'Security / Engineering', evidenceExample: 'Privileged access list with reviewer sign-off' },
  { id: 'identity-jml-workflow', name: 'Joiner/mover/leaver workflow', status: 'Needs Review', frictionLevel: 'Medium', automationOpportunity: 'HRIS-to-IdP task trigger and evidence capture', owner: 'People Ops / IT', evidenceExample: 'Sample joiner/leaver ticket with completed access checklist' },
  { id: 'identity-scim-provisioning', name: 'SCIM provisioning', status: 'Gap', frictionLevel: 'Medium', automationOpportunity: 'Prioritize critical apps for lifecycle automation', owner: 'Security / IT', evidenceExample: 'SCIM configuration screenshot plus owner review note' },
  { id: 'identity-access-exceptions', name: 'Access exception review', status: 'Needs Review', frictionLevel: 'Low', automationOpportunity: 'Exception aging and renewal reminders', owner: 'Security Program', evidenceExample: 'Exception register with expiration dates' },
  { id: 'identity-stale-account', name: 'Stale account detection', status: 'Gap', frictionLevel: 'Low', automationOpportunity: 'Monthly inactive user report', owner: 'IT Operations', evidenceExample: 'Inactive account export and closure notes' },
  { id: 'identity-service-accounts', name: 'Service account ownership', status: 'Owner Needed', frictionLevel: 'Medium', automationOpportunity: 'Require owner and rotation metadata for service accounts', owner: 'Engineering', evidenceExample: 'Service account inventory with owner and last review date' }
];

const evidenceItems = [
  { id: 'evidence-mfa-export', label: 'actual MFA coverage export', category: 'useful', valueType: 'Operating proof', whyItMatters: 'Shows coverage and exceptions instead of relying on policy text.' },
  { id: 'evidence-access-review', label: 'access review sign-off with exceptions', category: 'useful', valueType: 'Owner review', whyItMatters: 'Captures decisions and follow-up actions.' },
  { id: 'evidence-restore-test', label: 'tested backup restore result', category: 'useful', valueType: 'Test result', whyItMatters: 'Demonstrates that recovery was actually exercised.' },
  { id: 'evidence-vendor-review', label: 'vendor SOC 2 report review notes', category: 'useful', valueType: 'Reviewer notes', whyItMatters: 'Documents scope, CUECs, exceptions, and subservice organization review.' },
  { id: 'evidence-mdm-export', label: 'MDM compliance export', category: 'useful', valueType: 'System export', whyItMatters: 'Shows managed endpoint posture and gaps.' },
  { id: 'evidence-tabletop', label: 'incident tabletop notes', category: 'useful', valueType: 'Exercise record', whyItMatters: 'Shows escalation and decision-path practice.' },
  { id: 'evidence-bcdr-outcome', label: 'BCDR test outcome', category: 'useful', valueType: 'Test outcome', whyItMatters: 'Turns a plan into measured readiness.' },
  { id: 'evidence-change-deploy', label: 'change approval linked to deployment', category: 'useful', valueType: 'Workflow link', whyItMatters: 'Connects approval to the shipped change.' },
  { id: 'evidence-funds-transfer', label: 'funds-transfer approval log', category: 'useful', valueType: 'Approval trail', whyItMatters: 'Supports finance-partnered review of sensitive payment workflows.' },
  { id: 'busywork-screenshot', label: 'screenshot-only evidence with no owner', category: 'busywork', valueType: 'Low context', whyItMatters: 'Hard to trust or maintain without ownership.' },
  { id: 'busywork-policy-only', label: 'policy document with no operating proof', category: 'busywork', valueType: 'Static document', whyItMatters: 'Does not show the control is being followed.' },
  { id: 'busywork-vendor-sheet', label: 'stale vendor spreadsheet', category: 'busywork', valueType: 'Stale inventory', whyItMatters: 'Misses renewal, report, and contract review triggers.' },
  { id: 'busywork-access-no-followup', label: 'access review without exception follow-up', category: 'busywork', valueType: 'Incomplete review', whyItMatters: 'Does not close the loop on risk decisions.' },
  { id: 'busywork-bcdr-never-tested', label: 'BCDR plan never tested', category: 'busywork', valueType: 'Untested plan', whyItMatters: 'Planning without test evidence leaves recovery assumptions unknown.' },
  { id: 'busywork-template-text', label: 'generic control text copied from templates', category: 'busywork', valueType: 'Generic text', whyItMatters: 'Does not explain how the small AI company actually operates.' }
];

const bcdrItems = [
  { id: 'bcdr-plan-owner', name: 'BCDR plan owner', status: 'Ready', owner: 'Security Lead', evidence: 'Named owner and review cadence', nextAction: 'Confirm backup owner and dependency map.' },
  { id: 'bcdr-backup-policy', name: 'Backup policy', status: 'Ready', owner: 'Engineering', evidence: 'Backup scope and retention summary', nextAction: 'Link policy to restore test schedule.' },
  { id: 'bcdr-restore-test', name: 'Restore test', status: 'Gap', owner: 'Engineering', evidence: 'No test result yet in synthetic data', nextAction: 'Run first restore test and capture result.' },
  { id: 'bcdr-ir-playbook', name: 'Incident response playbook', status: 'Ready', owner: 'Security Operations', evidence: 'Playbook index and severity matrix', nextAction: 'Validate with tabletop exercise.' },
  { id: 'bcdr-escalation-path', name: 'Escalation path', status: 'Needs Review', owner: 'Security / Legal / Support', evidence: 'Draft escalation matrix', nextAction: 'Confirm customer notification decision path.' },
  { id: 'bcdr-data-leakage-response', name: 'Data leakage response', status: 'Needs Review', owner: 'Security / Privacy', evidence: 'Draft data leakage triage checklist', nextAction: 'Add AI tool prompt/data leakage scenario.' },
  { id: 'bcdr-customer-notification', name: 'Customer notification decision path', status: 'Owner Needed', owner: 'Legal / Customer Success', evidence: 'Decision tree placeholder', nextAction: 'Assign owner and review thresholds.' },
  { id: 'bcdr-tabletop-exercise', name: 'Tabletop exercise', status: 'Gap', owner: 'Security Program', evidence: 'No tabletop notes yet in synthetic data', nextAction: 'Schedule first tabletop with engineering and support.' },
  { id: 'bcdr-post-incident-review', name: 'Post-incident review', status: 'Needs Review', owner: 'Security Operations', evidence: 'Draft review template', nextAction: 'Add action-owner and due-date fields.' }
];

const fraudControls = [
  { id: 'fraud-dual-approval', name: 'dual approval for funds transfer', status: 'Ready', financePartner: 'Controller', evidence: 'Approval workflow sample', nextAction: 'Confirm approval thresholds.' },
  { id: 'fraud-callback-verification', name: 'callback verification for bank detail changes', status: 'Needs Review', financePartner: 'Finance Ops', evidence: 'Callback checklist draft', nextAction: 'Define approved callback source and evidence note.' },
  { id: 'fraud-finance-privileged-review', name: 'finance system privileged access review', status: 'Needs Review', financePartner: 'Controller', evidence: 'Admin access export placeholder', nextAction: 'Run owner review for finance admin roles.' },
  { id: 'fraud-vendor-payment-change', name: 'vendor payment change approval', status: 'Owner Needed', financePartner: 'Accounts Payable', evidence: 'Payment-change ticket template', nextAction: 'Assign owner for approval and exception review.' },
  { id: 'fraud-suspicious-escalation', name: 'suspicious request escalation path', status: 'Ready', financePartner: 'Finance Ops / Security', evidence: 'Escalation channel and severity guide', nextAction: 'Test with phishing and invoice-change scenario.' },
  { id: 'fraud-audit-trail-retention', name: 'audit trail retention', status: 'Needs Review', financePartner: 'Finance Systems Owner', evidence: 'Retention setting screenshot plus owner note', nextAction: 'Confirm retention period and export procedure.' }
];

const aiThreatModelItems = [
  { id: 'ai-tool-usage-policy', name: 'AI tool usage policy', status: 'Ready', owner: 'Security / Legal', evidence: 'Approved-tool policy and sensitive data rules', nextAction: 'Add annual review cadence.' },
  { id: 'ai-vendor-review', name: 'AI vendor review', status: 'Needs Review', owner: 'Security / AI Engineering', evidence: 'AI vendor questionnaire and retention notes', nextAction: 'Review training-use, retention, and incident terms.' },
  { id: 'ai-prompt-data-leakage', name: 'prompt/data leakage risk', status: 'Needs Review', owner: 'Security Operations', evidence: 'Prompt/data boundary scenarios', nextAction: 'Add data leakage tabletop scenario.' },
  { id: 'ai-model-retention', name: 'model/provider retention review', status: 'Needs Review', owner: 'Security / Legal', evidence: 'Provider retention comparison', nextAction: 'Confirm default retention and opt-out settings.' },
  { id: 'ai-production-incident-path', name: 'production AI incident path', status: 'Gap', owner: 'AI Engineering', evidence: 'Draft incident routing path', nextAction: 'Define severity triggers and customer impact triage.' },
  { id: 'ai-human-review', name: 'human review for sensitive AI outputs', status: 'Ready', owner: 'Product / Security', evidence: 'Human approval checklist', nextAction: 'Map sensitive workflows to reviewers.' },
  { id: 'ai-assisted-guardrails', name: 'AI-assisted security tooling guardrails', status: 'Needs Review', owner: 'Security Program', evidence: 'Tool guardrail notes', nextAction: 'Document approved use cases and human approval gates.' }
];

const fiveMinuteDemoPath = [
  'Start with the program scaffolding overview.',
  'Show the first-six-month roadmap.',
  'Open Identity & Access Automation.',
  'Open Vendor Risk Review Queue and explain SOC 2 report review.',
  'Open Evidence Worth Collecting and explain avoiding busywork.',
  'Show BCDR / Incident Response readiness.',
  'Close with AI tooling and safe boundary notes.'
];

const supportedFrameworkNote = 'Supported readiness views include SOC 2, HIPAA, PCI DSS, NIST RMF, NIST 800-53, and SOX ITGC as one supporting framework. The interview UI centers small-company security program scaffolding.';

const interviewDemoData = {
  demoSafetyDisclaimer,
  demoSummaryCards,
  firstSixMonthsRoadmap,
  securityProgramPillars,
  vendorRiskItems,
  identityControls,
  evidenceItems,
  bcdrItems,
  fraudControls,
  aiThreatModelItems,
  fiveMinuteDemoPath,
  supportedFrameworkNote
};

if (typeof module !== 'undefined') {
  module.exports = interviewDemoData;
}

if (typeof window !== 'undefined') {
  window.interviewDemoData = interviewDemoData;
}
