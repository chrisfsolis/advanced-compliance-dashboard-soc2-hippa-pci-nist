const soxItgcRoles = [
  'Finance Application Owner',
  'Internal Controls Reviewer',
  'IT Operations Owner',
  'Security Reviewer',
  'Change Manager',
  'Audit Liaison',
  'System Owner'
];

const soxItgcControls = [
  {
    id: 'SOX-ITGC-001',
    domain: 'Access Management',
    title: 'Financial System User Access Review',
    purpose: 'Review access to systems supporting financial reporting.',
    evidenceExamples: ['access review export', 'reviewer sign-off', 'exception list', 'remediation notes'],
    owner: 'IT / System Owner',
    reviewer: 'Finance Application Owner / Internal Controls Reviewer'
  },
  {
    id: 'SOX-ITGC-002',
    domain: 'Privileged Access',
    title: 'Privileged Access Review',
    purpose: 'Review elevated/admin access to financial systems.',
    evidenceExamples: ['privileged user list', 'access justification', 'approval record', 'removal evidence'],
    owner: 'IT / Security',
    reviewer: 'Internal Controls / Finance Systems Owner'
  },
  {
    id: 'SOX-ITGC-003',
    domain: 'Joiner / Mover / Leaver',
    title: 'Joiner / Mover / Leaver Access Evidence',
    purpose: 'Show access changes are reviewed when employees join, move roles, or leave.',
    evidenceExamples: ['HR event sample', 'access change ticket', 'approval evidence', 'termination removal evidence'],
    owner: 'IT Operations',
    reviewer: 'Internal Controls'
  },
  {
    id: 'SOX-ITGC-004',
    domain: 'Change Management',
    title: 'Change Management Approval',
    purpose: 'Review application/infrastructure changes affecting financial systems.',
    evidenceExamples: ['change ticket', 'approval record', 'test evidence', 'deployment record', 'rollback plan'],
    owner: 'Engineering / IT Operations',
    reviewer: 'Change Advisory / Internal Controls'
  },
  {
    id: 'SOX-ITGC-005',
    domain: 'Deployment Approval',
    title: 'Production Deployment Approval',
    purpose: 'Show production deployments to financial systems have approval and traceability.',
    evidenceExamples: ['deployment log', 'pull request approval', 'release note', 'change ticket mapping'],
    owner: 'Engineering / DevOps',
    reviewer: 'System Owner / Change Manager'
  },
  {
    id: 'SOX-ITGC-006',
    domain: 'Segregation of Duties',
    title: 'Segregation of Duties Review',
    purpose: 'Identify conflicting roles or permissions in financial systems.',
    evidenceExamples: ['role matrix', 'conflict review', 'exception approval', 'remediation notes'],
    owner: 'Finance Systems Owner',
    reviewer: 'Internal Controls / Audit Liaison'
  },
  {
    id: 'SOX-ITGC-007',
    domain: 'Audit Logging',
    title: 'Audit Logging for Financial Systems',
    purpose: 'Confirm logging exists for sensitive/admin activity in financial systems.',
    evidenceExamples: ['logging configuration screenshot placeholder', 'sample log export', 'retention setting', 'monitoring owner evidence'],
    owner: 'Security / IT Operations',
    reviewer: 'Internal Controls'
  },
  {
    id: 'SOX-ITGC-008',
    domain: 'Backup and Recovery',
    title: 'Backup and Recovery Readiness',
    purpose: 'Document backup/recovery evidence for systems supporting financial reporting.',
    evidenceExamples: ['backup policy', 'restore test summary', 'recovery owner sign-off', 'exception notes'],
    owner: 'IT Operations',
    reviewer: 'Finance Systems Owner'
  },
  {
    id: 'SOX-ITGC-009',
    domain: 'Incident and Change Evidence Retention',
    title: 'Incident and Change Evidence Retention',
    purpose: 'Confirm evidence retention expectations are documented for financial system changes/incidents.',
    evidenceExamples: ['retention policy', 'ticket retention note', 'sample evidence register', 'owner sign-off'],
    owner: 'IT / Compliance',
    reviewer: 'Internal Controls'
  },
  {
    id: 'SOX-ITGC-010',
    domain: 'Financial Application Owner Review',
    title: 'Financial Application Owner Sign-Off',
    purpose: 'Show business owner review of relevant financial application controls.',
    evidenceExamples: ['owner sign-off placeholder', 'review checklist', 'exceptions list', 'follow-up action plan'],
    owner: 'Finance Application Owner',
    reviewer: 'Internal Controls / Audit Liaison'
  }
];

module.exports = {
  soxItgcControls,
  soxItgcRoles
};
