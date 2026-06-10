const { frameworks } = require('./frameworks');
const { soxItgcControls } = require('./soxItgcControls');

const frameworkReadinessMetrics = [
  { frameworkId: 'soc2', totalControls: 18, readyControls: 14, needsReview: 3, gaps: 1, readinessPercent: 78, highPriorityFindings: 2 },
  { frameworkId: 'sox-itgc', totalControls: 10, readyControls: 7, needsReview: 2, gaps: 1, readinessPercent: 70, highPriorityFindings: 2 },
  { frameworkId: 'hipaa', totalControls: 16, readyControls: 12, needsReview: 3, gaps: 1, readinessPercent: 75, highPriorityFindings: 2 },
  { frameworkId: 'pci-dss', totalControls: 15, readyControls: 11, needsReview: 3, gaps: 1, readinessPercent: 73, highPriorityFindings: 2 },
  { frameworkId: 'nist-rmf', totalControls: 14, readyControls: 10, needsReview: 3, gaps: 1, readinessPercent: 71, highPriorityFindings: 2 },
  { frameworkId: 'nist-800-53', totalControls: 20, readyControls: 15, needsReview: 4, gaps: 1, readinessPercent: 75, highPriorityFindings: 3 }
];

const soxItgcSyntheticFindings = [
  'Privileged access review missing reviewer sign-off.',
  'Change management evidence missing rollback note.',
  'Segregation of duties exception requires business owner review.',
  'Backup restore test evidence is stale.',
  'Financial system owner sign-off pending.'
];

const dashboardFrameworkCards = frameworks.map((framework) => {
  const metrics = frameworkReadinessMetrics.find((item) => item.frameworkId === framework.id);
  return {
    ...framework,
    ...metrics,
    scoreLabel: 'Demo readiness signal',
    evidenceLabel: 'Evidence completeness'
  };
});

const frameworkFilterOptions = frameworks.map((framework) => ({
  value: framework.id,
  label: framework.name
}));

const syntheticEvidenceInventory = [
  ...soxItgcControls.map((control) => ({
    frameworkId: 'sox-itgc',
    controlId: control.id,
    domain: control.domain,
    title: control.title,
    evidenceExamples: control.evidenceExamples,
    owner: control.owner,
    reviewer: control.reviewer
  }))
];

module.exports = {
  dashboardFrameworkCards,
  frameworkFilterOptions,
  frameworkReadinessMetrics,
  soxItgcSyntheticFindings,
  syntheticEvidenceInventory
};
