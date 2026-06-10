const { frameworks } = require('../src/frameworks');
const { dashboardFrameworkCards, frameworkReadinessMetrics, syntheticEvidenceInventory } = require('../src/dashboardData');
const { soxItgcControls } = require('../src/soxItgcControls');

if (frameworks.length !== 6) {
  throw new Error(`Expected 6 frameworks, found ${frameworks.length}.`);
}

if (!frameworks.some((framework) => framework.id === 'sox-itgc')) {
  throw new Error('SOX ITGC framework is missing from the framework list.');
}

if (!dashboardFrameworkCards.some((card) => card.id === 'sox-itgc')) {
  throw new Error('SOX ITGC dashboard card data is missing.');
}

if (!frameworkReadinessMetrics.some((metric) => metric.frameworkId === 'sox-itgc' && metric.totalControls === soxItgcControls.length)) {
  throw new Error('SOX ITGC readiness metrics do not align with synthetic controls.');
}

if (syntheticEvidenceInventory.filter((item) => item.frameworkId === 'sox-itgc').length !== soxItgcControls.length) {
  throw new Error('SOX ITGC evidence inventory does not align with synthetic controls.');
}

console.log('Build data check passed.');
