(function attachSecurityProgramData(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SecurityProgramData = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildSecurityProgramData() {
  const safeBoundaryNote =
    'All data is synthetic. Readiness signals support human review and do not determine compliance or validate control effectiveness.';

  const soxBoundaryNote =
    'SOX coverage is limited to synthetic ITGC readiness workflows and does not represent SOX compliance, financial audit assurance, or control effectiveness validation.';

  const overviewCards = [
    {
      id: 'overview-program-readiness',
      title: 'Program Readiness',
      status: 'In Progress',
      priority: 'High',
      owner: 'Security Program Lead',
      reason: 'Core domains are mapped, with review queues still open for resilience and vendor scope.'
    },
    {
      id: 'overview-control-ownership',
      title: 'Control Ownership',
      status: 'Needs Review',
      priority: 'High',
      owner: 'Security / IT Operations',
      reason: 'Most controls have owners, but exception follow-up needs clearer routing.'
    },
    {
      id: 'overview-evidence-readiness',
      title: 'Evidence Readiness',
      status: 'In Progress',
      priority: 'Medium',
      owner: 'Compliance Operations',
      reason: 'Evidence examples emphasize operating practice instead of screenshot-only packets.'
    },
    {
      id: 'overview-vendor-risk',
      title: 'Vendor Risk',
      status: 'Needs Review',
      priority: 'High',
      owner: 'Security / Legal',
      reason: 'Critical categories require report scope, subservice, and safeguard review.'
    },
    {
      id: 'overview-identity-access',
      title: 'Identity & Access',
      status: 'In Progress',
      priority: 'High',
      owner: 'IT / Security Engineering',
      reason: 'SSO and MFA are strong signals while stale access and service accounts need follow-up.'
    },
    {
      id: 'overview-operational-resilience',
      title: 'Operational Resilience',
      status: 'Needs Review',
      priority: 'Medium',
      owner: 'IT Operations',
      reason: 'Plan ownership exists, but restore testing and tabletop outcomes need stronger evidence.'
    }
  ];

  const frameworkReadiness = [
    {
      id: 'fw-soc2',
      name: 'SOC 2',
      readinessPercent: 78,
      signal: 'In Progress',
      totalControls: 18,
      readyControls: 14,
      needsReview: 3,
      gaps: 1,
      owner: 'Security / Compliance',
      nextAction: 'Confirm exception follow-up and reviewer sign-off for access evidence.'
    },
    {
      id: 'fw-sox-itgc',
      name: 'SOX ITGC',
      readinessPercent: 70,
      signal: 'Needs Review',
      totalControls: 10,
      readyControls: 7,
      needsReview: 2,
      gaps: 1,
      owner: 'IT Operations / Finance Systems',
      nextAction: 'Review financial system owner sign-off and change evidence completeness.',
      boundaryNote: soxBoundaryNote
    },
    {
      id: 'fw-hipaa',
      name: 'HIPAA',
      readinessPercent: 75,
      signal: 'In Progress',
      totalControls: 16,
      readyControls: 12,
      needsReview: 3,
      gaps: 1,
      owner: 'Security / Privacy',
      nextAction: 'Review privacy workflow evidence and access exception routing.'
    },
    {
      id: 'fw-pci-dss',
      name: 'PCI DSS',
      readinessPercent: 73,
      signal: 'Needs Review',
      totalControls: 15,
      readyControls: 11,
      needsReview: 3,
      gaps: 1,
      owner: 'Security / Finance Operations',
      nextAction: 'Check payment workflow scope, privileged access, and retention evidence.'
    },
    {
      id: 'fw-nist-rmf',
      name: 'NIST RMF',
      readinessPercent: 71,
      signal: 'Needs Review',
      totalControls: 14,
      readyControls: 10,
      needsReview: 3,
      gaps: 1,
      owner: 'Risk Program Owner',
      nextAction: 'Refresh risk assessment cadence and exception review workflow.'
    },
    {
      id: 'fw-nist-800-53',
      name: 'NIST 800-53',
      readinessPercent: 75,
      signal: 'In Progress',
      totalControls: 20,
      readyControls: 15,
      needsReview: 4,
      gaps: 1,
      owner: 'Security Architecture',
      nextAction: 'Map evidence examples to access, incident, continuity, and supplier families.'
    }
  ];

  const programPillars = [
    {
      id: 'pillar-policy-privacy',
      name: 'Policy & Privacy Program',
      status: 'In Progress',
      priority: 'High',
      maturitySignal: 'Defined owners, review cadence pending confirmation',
      owner: 'Security / Privacy',
      evidenceExamples: ['policy inventory', 'review cadence', 'counsel review note', 'exception register'],
      nextAction: 'Confirm policy owners and review cadence.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Route policy exceptions to owners with renewal dates.'
    },
    {
      id: 'pillar-compliance-evidence',
      name: 'Compliance Evidence',
      status: 'In Progress',
      priority: 'High',
      maturitySignal: 'Evidence types are cataloged by operating practice',
      owner: 'Compliance Operations',
      evidenceExamples: ['evidence register', 'owner review note', 'exception tracker', 'retention schedule'],
      nextAction: 'Prioritize evidence that shows owner review and follow-up.',
      frictionLevel: 'Low',
      automationOpportunity: 'Standardize evidence packet fields and review reminders.'
    },
    {
      id: 'pillar-vendor-risk',
      name: 'Vendor Risk Management',
      status: 'Needs Review',
      priority: 'High',
      maturitySignal: 'Critical vendor categories are queued for scope review',
      owner: 'Security / Legal',
      evidenceExamples: ['vendor tiering', 'SOC 2 review note', 'contract safeguard checklist', 'risk acceptance record'],
      nextAction: 'Review critical vendor scope, report period, and contractual safeguards.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Trigger renewal review tasks before vendor review dates.'
    },
    {
      id: 'pillar-identity-access',
      name: 'Identity & Access',
      status: 'In Progress',
      priority: 'High',
      maturitySignal: 'SSO and MFA signals are strong; service account ownership needs review',
      owner: 'IT / Security Engineering',
      evidenceExamples: ['MFA coverage export', 'access review sign-off', 'service account register', 'exception remediation notes'],
      nextAction: 'Assign accountable owners for service accounts and stale access cleanup.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Use scheduled access review queues and stale account alerts.'
    },
    {
      id: 'pillar-endpoint-asset',
      name: 'Endpoint & Asset Lifecycle',
      status: 'Needs Review',
      priority: 'Medium',
      maturitySignal: 'Asset inventory exists; lifecycle disposition evidence needs follow-up',
      owner: 'IT Operations',
      evidenceExamples: ['asset inventory export', 'MDM compliance export', 'device exception list', 'offboarding checklist'],
      nextAction: 'Connect device exceptions to owners and remediation dates.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Generate exception tickets from MDM compliance exports.'
    },
    {
      id: 'pillar-operational-security',
      name: 'Operational Security',
      status: 'In Progress',
      priority: 'High',
      maturitySignal: 'Intake and review loops are defined for operational gaps',
      owner: 'Security Operations',
      evidenceExamples: ['incident intake log', 'risk register', 'exception follow-up', 'evidence retention note'],
      nextAction: 'Review unresolved exceptions and incident follow-up actions.',
      frictionLevel: 'Low',
      automationOpportunity: 'Summarize open exceptions by owner and age.'
    },
    {
      id: 'pillar-bcdr',
      name: 'Business Continuity & Disaster Recovery',
      status: 'Needs Review',
      priority: 'High',
      maturitySignal: 'Plan exists; readiness depends on test evidence and owner sign-off',
      owner: 'IT Operations / Business Owners',
      evidenceExamples: ['BCDR plan', 'restore test result', 'tabletop notes', 'post-incident review'],
      nextAction: 'Schedule restore test review and document owner sign-off.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Track test evidence age and unresolved BCDR actions.'
    },
    {
      id: 'pillar-fraud-funds',
      name: 'Fraud & Funds-Transfer Controls',
      status: 'In Progress',
      priority: 'High',
      maturitySignal: 'Finance-partnered control readiness is mapped to review workflow',
      owner: 'Finance Operations / Security',
      evidenceExamples: ['dual approval log', 'callback verification record', 'payment change approval', 'audit trail retention note'],
      nextAction: 'Review bank detail change workflow evidence with finance partners.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Flag high-risk payment changes for secondary review.'
    },
    {
      id: 'pillar-ai-governance',
      name: 'AI Tooling Governance',
      status: 'Owner Needed',
      priority: 'Medium',
      maturitySignal: 'Usage policy and data-boundary review need ownership',
      owner: 'Security / Data Governance',
      evidenceExamples: ['AI tool usage policy', 'AI vendor review', 'data-boundary checklist', 'human review workflow'],
      nextAction: 'Assign governance owner for AI tool intake and sensitive workflow review.',
      frictionLevel: 'Medium',
      automationOpportunity: 'Use intake forms for AI tool risk tiering and retention review.'
    }
  ];

  const vendorRiskQueue = [
    {
      id: 'vendor-identity-provider',
      vendorCategory: 'Identity provider',
      criticality: 'Critical',
      dataSensitivity: 'High',
      soc2ReportStatus: 'Available - scope review needed',
      contractSafeguardStatus: 'Needs Review',
      reviewStatus: 'Needs Review',
      gapSummary: 'Critical vendor has a SOC 2 report available, but subservice organization scope and incident notification terms require review.',
      recommendedReviewer: 'Security / Legal',
      nextAction: 'Review report period, CUECs, subservice scope, and incident terms.'
    },
    {
      id: 'vendor-mdm-provider',
      vendorCategory: 'MDM provider',
      criticality: 'High',
      dataSensitivity: 'Device and user metadata',
      soc2ReportStatus: 'Requested',
      contractSafeguardStatus: 'In Progress',
      reviewStatus: 'In Progress',
      gapSummary: 'Device management scope and support access language need owner review.',
      recommendedReviewer: 'IT Operations',
      nextAction: 'Collect current report or bridge letter and confirm admin access safeguards.'
    },
    {
      id: 'vendor-cloud-infrastructure',
      vendorCategory: 'Cloud infrastructure',
      criticality: 'Critical',
      dataSensitivity: 'High',
      soc2ReportStatus: 'Available - report period check needed',
      contractSafeguardStatus: 'Ready',
      reviewStatus: 'Needs Review',
      gapSummary: 'Report exists, but service scope and complementary user entity controls need confirmation.',
      recommendedReviewer: 'Security Architecture',
      nextAction: 'Confirm the report covers the services represented in the synthetic environment.'
    },
    {
      id: 'vendor-customer-support',
      vendorCategory: 'Customer support platform',
      criticality: 'High',
      dataSensitivity: 'Customer communications',
      soc2ReportStatus: 'Available',
      contractSafeguardStatus: 'Needs Review',
      reviewStatus: 'Needs Review',
      gapSummary: 'Customer data handling terms and retention settings need review.',
      recommendedReviewer: 'Privacy / Support Operations',
      nextAction: 'Review retention settings and customer data export workflow.'
    },
    {
      id: 'vendor-payment-finance',
      vendorCategory: 'Payment / finance tool',
      criticality: 'Critical',
      dataSensitivity: 'Financial workflow metadata',
      soc2ReportStatus: 'Available - exceptions noted',
      contractSafeguardStatus: 'In Progress',
      reviewStatus: 'Needs Review',
      gapSummary: 'Payment workflow owner needs to review report exceptions and approval audit trail retention.',
      recommendedReviewer: 'Finance Operations / Security',
      nextAction: 'Review exceptions, payment change controls, and retention safeguards.'
    },
    {
      id: 'vendor-ai-tooling',
      vendorCategory: 'AI tooling provider',
      criticality: 'Medium',
      dataSensitivity: 'Potential prompt and document content',
      soc2ReportStatus: 'Not yet collected',
      contractSafeguardStatus: 'Owner Needed',
      reviewStatus: 'Gap',
      gapSummary: 'Data retention, training use, and sensitive workflow boundaries need review before broad use.',
      recommendedReviewer: 'Security / Data Governance',
      nextAction: 'Route provider through AI tool intake and data-boundary review.'
    },
    {
      id: 'vendor-collaboration-suite',
      vendorCategory: 'Collaboration suite',
      criticality: 'High',
      dataSensitivity: 'Internal documents and communications',
      soc2ReportStatus: 'Available',
      contractSafeguardStatus: 'Ready',
      reviewStatus: 'In Progress',
      gapSummary: 'Admin access review evidence and data sharing configuration need periodic review.',
      recommendedReviewer: 'IT / Security',
      nextAction: 'Confirm admin owner list and sharing exception follow-up.'
    },
    {
      id: 'vendor-endpoint-security',
      vendorCategory: 'Endpoint security provider',
      criticality: 'High',
      dataSensitivity: 'Device telemetry',
      soc2ReportStatus: 'Requested',
      contractSafeguardStatus: 'Needs Review',
      reviewStatus: 'Needs Review',
      gapSummary: 'Telemetry handling and support access safeguards require contract review.',
      recommendedReviewer: 'Security Operations / Legal',
      nextAction: 'Review telemetry handling, retention settings, and support access safeguards.'
    }
  ];

  const identityAccessControls = [
    {
      id: 'iam-sso-coverage',
      name: 'SSO coverage',
      status: 'Ready',
      frictionLevel: 'Low',
      automationOpportunity: 'Route non-SSO apps to exception review.',
      owner: 'IT / Security Engineering',
      evidenceExample: 'SSO application coverage export',
      nextAction: 'Review remaining non-SSO exceptions with system owners.'
    },
    {
      id: 'iam-mfa-coverage',
      name: 'MFA coverage',
      status: 'Ready',
      frictionLevel: 'Low',
      automationOpportunity: 'Schedule coverage exports and exception reminders.',
      owner: 'IT / Security Engineering',
      evidenceExample: 'MFA coverage export with exception list',
      nextAction: 'Confirm exception expiration dates.'
    },
    {
      id: 'iam-privileged-review',
      name: 'Privileged access review',
      status: 'Needs Review',
      frictionLevel: 'Medium',
      automationOpportunity: 'Group privileged accounts by owner and stale access age.',
      owner: 'Security / System Owners',
      evidenceExample: 'privileged user review sign-off',
      nextAction: 'Route exceptions to system owners for disposition.'
    },
    {
      id: 'iam-jml-workflow',
      name: 'Joiner / mover / leaver workflow',
      status: 'In Progress',
      frictionLevel: 'Medium',
      automationOpportunity: 'Match HR events to access change tickets.',
      owner: 'IT Operations / People Operations',
      evidenceExample: 'HR event sample linked to access change ticket',
      nextAction: 'Review mover events for role-based access updates.'
    },
    {
      id: 'iam-scim-provisioning',
      name: 'SCIM provisioning',
      status: 'In Progress',
      frictionLevel: 'Low',
      automationOpportunity: 'Expand provisioning coverage for high-risk applications.',
      owner: 'IT Engineering',
      evidenceExample: 'SCIM-connected app inventory',
      nextAction: 'Prioritize critical apps without automated provisioning.'
    },
    {
      id: 'iam-stale-account-detection',
      name: 'Stale account detection',
      status: 'Needs Review',
      frictionLevel: 'Medium',
      automationOpportunity: 'Create stale account queue with owner and age fields.',
      owner: 'Security Operations',
      evidenceExample: 'stale account export with remediation notes',
      nextAction: 'Review accounts inactive beyond policy threshold.'
    },
    {
      id: 'iam-service-account-ownership',
      name: 'Service account ownership',
      status: 'Owner Needed',
      frictionLevel: 'High',
      automationOpportunity: 'Require owner, purpose, and rotation cadence fields.',
      owner: 'System Owners',
      evidenceExample: 'service account register',
      nextAction: 'Assign accountable owners for unowned service accounts.'
    },
    {
      id: 'iam-access-exception-review',
      name: 'Access exception review',
      status: 'Needs Review',
      frictionLevel: 'Medium',
      automationOpportunity: 'Auto-remind owners before exception expiration.',
      owner: 'Security / IT',
      evidenceExample: 'exception register with follow-up notes',
      nextAction: 'Close or renew exceptions with documented owner approval.'
    }
  ];

  const evidenceItems = [
    { id: 'evidence-useful-mfa', label: 'MFA coverage export', category: 'Useful Evidence', valueType: 'Operating practice', whyItMatters: 'Shows coverage and exceptions.' },
    { id: 'evidence-useful-access-review', label: 'access review sign-off with exceptions', category: 'Useful Evidence', valueType: 'Reviewer action', whyItMatters: 'Links review decisions to follow-up.' },
    { id: 'evidence-useful-backup', label: 'tested backup restore result', category: 'Useful Evidence', valueType: 'Test outcome', whyItMatters: 'Shows recovery practice was exercised.' },
    { id: 'evidence-useful-vendor', label: 'vendor SOC 2 review notes', category: 'Useful Evidence', valueType: 'Third-party review', whyItMatters: 'Captures scope, exceptions, and CUECs.' },
    { id: 'evidence-useful-mdm', label: 'MDM compliance export', category: 'Useful Evidence', valueType: 'Device posture', whyItMatters: 'Shows endpoint status and exceptions.' },
    { id: 'evidence-useful-tabletop', label: 'incident tabletop notes', category: 'Useful Evidence', valueType: 'Exercise outcome', whyItMatters: 'Shows decisions and follow-up actions.' },
    { id: 'evidence-useful-bcdr', label: 'BCDR test outcome', category: 'Useful Evidence', valueType: 'Resilience test', whyItMatters: 'Shows continuity plan operation.' },
    { id: 'evidence-useful-change', label: 'change approval linked to deployment', category: 'Useful Evidence', valueType: 'Change traceability', whyItMatters: 'Connects approval to implementation.' },
    { id: 'evidence-useful-funds', label: 'funds-transfer approval log', category: 'Useful Evidence', valueType: 'Finance-partnered workflow', whyItMatters: 'Shows approvals and escalation path.' },
    { id: 'evidence-low-screenshot', label: 'screenshot-only evidence with no owner', category: 'Low-Value Evidence', valueType: 'Weak context', whyItMatters: 'Hard to connect to ownership or operating practice.' },
    { id: 'evidence-low-policy', label: 'policy document with no operating proof', category: 'Low-Value Evidence', valueType: 'Documentation only', whyItMatters: 'Does not show whether the workflow happened.' },
    { id: 'evidence-low-vendor-sheet', label: 'stale vendor spreadsheet', category: 'Low-Value Evidence', valueType: 'Outdated inventory', whyItMatters: 'May not reflect current service scope or risk.' },
    { id: 'evidence-low-access-review', label: 'access review without exception follow-up', category: 'Low-Value Evidence', valueType: 'Incomplete review', whyItMatters: 'Leaves remediation unclear.' },
    { id: 'evidence-low-bcdr-plan', label: 'BCDR plan never tested', category: 'Low-Value Evidence', valueType: 'Untested plan', whyItMatters: 'Plan readiness is unclear without exercise evidence.' },
    { id: 'evidence-low-template', label: 'generic control text copied from templates', category: 'Low-Value Evidence', valueType: 'Low specificity', whyItMatters: 'Does not map to a real owner or workflow.' }
  ];

  const operationalSecurityItems = [
    { id: 'opsec-dlp-review', name: 'data leakage / DLP review', status: 'Needs Review', owner: 'Security Operations', evidence: 'DLP event review queue', nextAction: 'Triage open data leakage events and document disposition.' },
    { id: 'opsec-access-review', name: 'access control review', status: 'In Progress', owner: 'IT / System Owners', evidence: 'access review export', nextAction: 'Close exception follow-up with system owners.' },
    { id: 'opsec-backup-monitoring', name: 'backup monitoring', status: 'Ready', owner: 'IT Operations', evidence: 'backup job status summary', nextAction: 'Review failed jobs and document remediation.' },
    { id: 'opsec-endpoint-compliance', name: 'endpoint compliance', status: 'Needs Review', owner: 'IT Operations', evidence: 'MDM compliance export', nextAction: 'Assign owners to noncompliant device exceptions.' },
    { id: 'opsec-asset-lifecycle', name: 'asset lifecycle tracking', status: 'In Progress', owner: 'IT Asset Owner', evidence: 'asset inventory with lifecycle state', nextAction: 'Review unassigned and retired assets.' },
    { id: 'opsec-risk-assessment', name: 'risk assessment', status: 'In Progress', owner: 'Risk Program Owner', evidence: 'risk register update', nextAction: 'Refresh high-priority risks and owner dates.' },
    { id: 'opsec-incident-intake', name: 'incident intake', status: 'Ready', owner: 'Security Operations', evidence: 'incident intake log', nextAction: 'Review unresolved intake items weekly.' },
    { id: 'opsec-exception-followup', name: 'exception follow-up', status: 'Needs Review', owner: 'Compliance Operations', evidence: 'exception register', nextAction: 'Prioritize overdue exceptions by owner.' },
    { id: 'opsec-evidence-retention', name: 'evidence retention', status: 'In Progress', owner: 'Compliance Operations', evidence: 'retention schedule', nextAction: 'Confirm retention expectations for high-priority evidence.' }
  ];

  const bcdrItems = [
    { id: 'bcdr-plan-owner', name: 'BCDR plan owner', status: 'Ready', owner: 'IT Operations', evidence: 'named owner and review cadence', nextAction: 'Confirm annual review schedule.' },
    { id: 'bcdr-backup-policy', name: 'backup policy', status: 'Ready', owner: 'IT Operations', evidence: 'backup policy and job summary', nextAction: 'Review exception handling for failed jobs.' },
    { id: 'bcdr-restore-test', name: 'restore test', status: 'Needs Review', owner: 'IT Operations', evidence: 'restore test result pending review', nextAction: 'Document test outcome and remediation actions.' },
    { id: 'bcdr-ir-playbook', name: 'incident response playbook', status: 'In Progress', owner: 'Security Operations', evidence: 'playbook draft and escalation map', nextAction: 'Review roles and decision points.' },
    { id: 'bcdr-escalation-path', name: 'escalation path', status: 'Ready', owner: 'Security / Business Owners', evidence: 'contact tree and severity guide', nextAction: 'Confirm backup contacts.' },
    { id: 'bcdr-data-leakage-response', name: 'data leakage response', status: 'Needs Review', owner: 'Security / Privacy', evidence: 'response checklist', nextAction: 'Define owner handoff for privacy review.' },
    { id: 'bcdr-customer-notification', name: 'customer notification decision path', status: 'Owner Needed', owner: 'Legal / Customer Operations', evidence: 'decision tree placeholder', nextAction: 'Assign owner and approval path.' },
    { id: 'bcdr-tabletop', name: 'tabletop exercise', status: 'Needs Review', owner: 'Security Operations', evidence: 'tabletop notes', nextAction: 'Track open exercise actions to closure.' },
    { id: 'bcdr-post-incident-review', name: 'post-incident review', status: 'In Progress', owner: 'Security Operations', evidence: 'post-incident review template', nextAction: 'Link review actions to owners and target dates.' }
  ];

  const fraudControls = [
    { id: 'fraud-dual-approval', name: 'dual approval for funds transfers', status: 'In Progress', financePartner: 'Finance Operations', evidence: 'dual approval log', nextAction: 'Review exception path and secondary approver coverage.' },
    { id: 'fraud-callback', name: 'callback verification for bank detail changes', status: 'Needs Review', financePartner: 'Accounts Payable Owner', evidence: 'callback verification record', nextAction: 'Document approved callback source and escalation path.' },
    { id: 'fraud-finance-access', name: 'finance system privileged access review', status: 'Needs Review', financePartner: 'Finance Systems Owner', evidence: 'privileged access review export', nextAction: 'Route exception follow-up to finance system owner.' },
    { id: 'fraud-vendor-payment-change', name: 'vendor payment change approval', status: 'In Progress', financePartner: 'Accounts Payable Owner', evidence: 'payment change approval ticket', nextAction: 'Confirm reviewer sign-off and retention expectations.' },
    { id: 'fraud-suspicious-request', name: 'suspicious request escalation path', status: 'Ready', financePartner: 'Finance Operations / Security', evidence: 'escalation path and intake log', nextAction: 'Review path during next tabletop exercise.' },
    { id: 'fraud-audit-trail-retention', name: 'audit trail retention', status: 'In Progress', financePartner: 'Finance Systems Owner', evidence: 'audit trail retention note', nextAction: 'Confirm owner and retention period for finance workflow logs.' }
  ];

  const aiToolingGovernanceItems = [
    { id: 'ai-usage-policy', name: 'AI tool usage policy', status: 'In Progress', owner: 'Security / Data Governance', evidence: 'usage policy draft', nextAction: 'Confirm permitted data types and owner review cadence.' },
    { id: 'ai-vendor-review', name: 'AI vendor review', status: 'Needs Review', owner: 'Security / Legal', evidence: 'AI vendor intake checklist', nextAction: 'Review retention, training use, and subprocessor scope.' },
    { id: 'ai-data-leakage-risk', name: 'prompt/data leakage risk', status: 'Needs Review', owner: 'Security Operations', evidence: 'data-boundary checklist', nextAction: 'Define escalation path for sensitive prompt handling.' },
    { id: 'ai-retention-review', name: 'model/provider retention review', status: 'Owner Needed', owner: 'Data Governance', evidence: 'retention review placeholder', nextAction: 'Assign owner for provider retention and training-use review.' },
    { id: 'ai-incident-path', name: 'sensitive AI workflow incident path', status: 'In Progress', owner: 'Security Operations', evidence: 'incident intake route', nextAction: 'Document handoff from AI tool intake to incident review.' },
    { id: 'ai-human-review', name: 'human review for sensitive AI outputs', status: 'In Progress', owner: 'Business Process Owner', evidence: 'human approval workflow', nextAction: 'Confirm sensitive workflow owner and approval criteria.' },
    { id: 'ai-security-tooling', name: 'AI-assisted security tooling guardrails', status: 'Needs Review', owner: 'Security Engineering', evidence: 'tooling guardrail checklist', nextAction: 'Review data boundaries before enabling sensitive workflows.' }
  ];

  const selectedControl = {
    id: 'SOC2-ACCESS-001',
    title: 'Access Review',
    framework: 'SOC 2',
    domain: 'Identity & Access',
    owner: 'Security / IT',
    reviewer: 'System Owner',
    status: 'Needs Review',
    evidenceExamples: ['access review export', 'reviewer sign-off', 'exception list', 'remediation notes'],
    gapSummary: 'Exception follow-up is missing from the synthetic evidence packet.',
    recommendedNextAction: 'Route to system owner for review and document exception disposition.',
    boundaryNote: safeBoundaryNote
  };

  const productDemoPath = [
    'Review the security program overview.',
    'Open framework readiness.',
    'Review vendor risk queue.',
    'Inspect identity and access operations.',
    'Review evidence worth collecting.',
    'Check operational resilience and BCDR readiness.',
    'Review AI tooling governance.',
    'Close with the boundary note.'
  ];

  return {
    safeBoundaryNote,
    soxBoundaryNote,
    overviewCards,
    frameworkReadiness,
    programPillars,
    vendorRiskQueue,
    identityAccessControls,
    evidenceItems,
    operationalSecurityItems,
    bcdrItems,
    fraudControls,
    aiToolingGovernanceItems,
    selectedControl,
    productDemoPath
  };
});
