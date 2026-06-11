const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const interviewDemoData = require('../src/interviewDemoData');

const repoRoot = path.resolve(__dirname, '..');

const requiredLabels = [
  'Security Program Scaffolding Demo',
  'First Six Months: Build the Scaffolding',
  'Vendor Risk Review Queue',
  'Identity &amp; Access Automation',
  'Evidence Worth Collecting',
  'BCDR and Incident Response Readiness',
  'Fraud and Funds-Transfer Controls',
  'AI Tooling and Production AI Threat Model',
  '5-Minute Demo Path'
];

const unsafeClaims = [
  ['guaranteed', 'compliance'].join(' '),
  ['control', 'effectiveness', 'proven'].join(' '),
  'legal assurance',
  ['financial', 'audit', 'assurance'].join(' '),
  ['HIPAA', 'compliant'].join(' '),
  ['GDPR', 'compliant'].join(' '),
  ['CCPA', 'compliant'].join(' '),
  ['SOC 2', ['certi', 'fied'].join('')].join(' '),
  ['SOX', 'compliant'].join(' ')
];

test('homepage exposes the guided interview demo from the default route', () => {
  const indexHtml = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');

  for (const label of requiredLabels) {
    assert.match(indexHtml, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('interview demo data includes required synthetic security program areas', () => {
  assert.equal(interviewDemoData.demoSummaryCards.length, 6);
  assert.equal(interviewDemoData.firstSixMonthsRoadmap.length, 3);
  assert.equal(interviewDemoData.securityProgramPillars.length, 9);
  assert.equal(interviewDemoData.vendorRiskItems.length, 8);
  assert.equal(interviewDemoData.identityControls.length, 8);
  assert.equal(interviewDemoData.bcdrItems.length, 9);
  assert.equal(interviewDemoData.fraudControls.length, 6);
  assert.equal(interviewDemoData.aiThreatModelItems.length, 7);
});

test('vendor risk queue covers critical small-company vendor categories', () => {
  const categories = interviewDemoData.vendorRiskItems.map((item) => item.vendorCategory);

  assert.deepEqual(categories, [
    'Identity provider',
    'MDM provider',
    'Cloud infrastructure',
    'Customer support platform',
    'Payment / finance tool',
    'AI tooling provider',
    'Collaboration suite',
    'Endpoint security provider'
  ]);

  for (const vendor of interviewDemoData.vendorRiskItems) {
    assert.ok(vendor.criticality);
    assert.ok(vendor.dataSensitivity);
    assert.ok(vendor.soc2ReportStatus);
    assert.ok(vendor.contractSafeguardStatus);
    assert.ok(vendor.gapSummary);
    assert.ok(vendor.recommendedReviewer);
  }
});

test('identity, evidence, BCDR, fraud, and AI data contain actionable review fields', () => {
  for (const control of interviewDemoData.identityControls) {
    assert.ok(control.automationOpportunity);
    assert.ok(control.frictionLevel);
    assert.ok(control.evidenceExample);
  }

  assert.ok(interviewDemoData.evidenceItems.some((item) => item.category === 'useful' && item.label === 'tested backup restore result'));
  assert.ok(interviewDemoData.evidenceItems.some((item) => item.category === 'busywork' && item.label === 'BCDR plan never tested'));

  for (const item of [...interviewDemoData.bcdrItems, ...interviewDemoData.fraudControls, ...interviewDemoData.aiThreatModelItems]) {
    assert.ok(item.status);
    assert.ok(item.evidence);
    assert.ok(item.nextAction);
  }
});

test('interview demo does not introduce unsafe positive compliance claims', () => {
  const files = ['index.html', 'app.js', 'src/interviewDemoData.js', 'docs/interview-demo-guide.md'];

  for (const file of files) {
    const fullPath = path.join(repoRoot, file);
    if (!fs.existsSync(fullPath)) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    for (const unsafeClaim of unsafeClaims) {
      assert.equal(content.includes(unsafeClaim), false, `${file} contains ${unsafeClaim}`);
    }
  }
});
