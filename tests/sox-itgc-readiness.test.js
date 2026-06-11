const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { SOX_BOUNDARY_NOTE, frameworks, frameworkNames } = require('../src/frameworks');
const { dashboardFrameworkCards, frameworkFilterOptions, frameworkReadinessMetrics, syntheticEvidenceInventory } = require('../src/dashboardData');
const { soxItgcControls } = require('../src/soxItgcControls');

const repoRoot = path.resolve(__dirname, '..');

test('framework list includes SOX ITGC as the sixth readiness framework', () => {
  assert.equal(frameworks.length, 6);
  assert.ok(frameworkNames.includes('SOX ITGC'));
  assert.ok(frameworks.some((framework) => framework.id === 'sox-itgc' && framework.displayName === 'SOX ITGC Readiness'));
});

test('synthetic SOX ITGC controls are deterministic and evidence-backed', () => {
  assert.equal(soxItgcControls.length, 10);
  assert.deepEqual(
    soxItgcControls.map((control) => control.id),
    [
      'SOX-ITGC-001',
      'SOX-ITGC-002',
      'SOX-ITGC-003',
      'SOX-ITGC-004',
      'SOX-ITGC-005',
      'SOX-ITGC-006',
      'SOX-ITGC-007',
      'SOX-ITGC-008',
      'SOX-ITGC-009',
      'SOX-ITGC-010'
    ]
  );

  for (const control of soxItgcControls) {
    assert.ok(control.domain);
    assert.ok(control.owner);
    assert.ok(control.reviewer);
    assert.ok(control.evidenceExamples.length >= 4);
  }
});

test('dashboard data renders SOX ITGC cards, filters, metrics, and evidence inventory', () => {
  assert.ok(dashboardFrameworkCards.some((card) => card.id === 'sox-itgc' && card.name === 'SOX ITGC'));
  assert.ok(frameworkFilterOptions.some((option) => option.value === 'sox-itgc' && option.label === 'SOX ITGC'));
  assert.deepEqual(
    frameworkReadinessMetrics.find((metric) => metric.frameworkId === 'sox-itgc'),
    { frameworkId: 'sox-itgc', totalControls: 10, readyControls: 7, needsReview: 2, gaps: 1, readinessPercent: 70, highPriorityFindings: 2 }
  );
  assert.equal(syntheticEvidenceInventory.filter((item) => item.frameworkId === 'sox-itgc').length, 10);
});

test('README and SOX doc include boundary language and SOX ITGC positioning', () => {
  const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
  const soxDoc = fs.readFileSync(path.join(repoRoot, 'docs/sox-itgc-readiness.md'), 'utf8');

  assert.match(readme, /SOX ITGC/);
  assert.match(readme, /The dashboard models 6 synthetic readiness frameworks/);
  assert.ok(readme.includes(SOX_BOUNDARY_NOTE));
  assert.ok(soxDoc.includes(SOX_BOUNDARY_NOTE));
  assert.match(soxDoc, /This project does not determine SOX compliance/);
});

test('unsafe SOX claims do not appear outside explicit non-claim language', () => {
  const files = ['README.md', 'docs/sox-itgc-readiness.md', 'src/frameworks.js'];
  const unsafePhrases = [
    ['SOX', 'compliant'],
    ['SOX', ['certi', 'fied'].join('')],
    ['SOX', ['audit', 'ready'].join('-')],
    ['SOX', 'controls validated'],
    ['SOX', 'effectiveness proven'],
    ['public-company', 'ready']
  ].map((parts) => parts.join(parts[0] === 'public-company' ? '-' : ' '));

  for (const file of files) {
    const content = fs.readFileSync(path.join(repoRoot, file), 'utf8');
    for (const phrase of unsafePhrases) {
      assert.equal(content.includes(phrase), false, `${file} contains ${phrase}`);
    }
  }
});

test('root scratch files are not tracked in the repository', () => {
  const trackedRootFiles = new Set(
    require('node:child_process')
      .execFileSync('git', ['ls-files'], { cwd: repoRoot, encoding: 'utf8' })
      .split('\n')
      .filter((file) => file && !file.includes('/'))
  );
  const forbiddenRootScratchFiles = [
    'PR gate (block merges if critical controls fail):',
    'control evaluation engine (concept)',
    'control-as-code example (YAML)',
    'evidence collector example (GitHub)',
    'nightly compliance & PR Gate',
    'python skeleton',
    'structure'
  ];

  for (const file of forbiddenRootScratchFiles) {
    assert.equal(trackedRootFiles.has(file), false, `${file} must not be tracked at the repository root`);
  }

  const allowedExtensionlessRootFiles = new Set(['LICENSE', 'Dockerfile', 'Makefile', 'Procfile']);
  const extensionlessRootScratchFiles = [...trackedRootFiles]
    .filter((file) => !file.startsWith('.'))
    .filter((file) => !file.includes('.'))
    .filter((file) => !allowedExtensionlessRootFiles.has(file));

  assert.deepEqual(extensionlessRootScratchFiles, []);
});

test('Windows path compatibility helper reports invalid characters and trailing segments', () => {
  const { getWindowsPathCompatibilityIssues } = require('../scripts/build-check');
  const invalidCharacterPaths = [
    'PR gate (block merges if critical controls fail):',
    'docs/invalid<less.md',
    'docs/invalid>greater.md',
    'docs/invalid"quote.md',
    'docs/invalid|pipe.md',
    'docs/invalid?question.md',
    'docs/invalid*star.md'
  ];
  const trailingSegmentPaths = ['docs/trailing-period.', 'docs/trailing-space '];
  const issues = getWindowsPathCompatibilityIssues([
    'docs/safe-note.md',
    ...invalidCharacterPaths,
    ...trailingSegmentPaths
  ]);

  assert.deepEqual(
    issues.map((issue) => issue.path),
    [...invalidCharacterPaths, ...trailingSegmentPaths]
  );

  for (const issue of issues.slice(0, invalidCharacterPaths.length)) {
    assert.match(issue.reasons.join(' '), /Windows-invalid character/);
  }

  assert.match(issues.at(-2).reasons.join(' '), /trailing period/);
  assert.match(issues.at(-1).reasons.join(' '), /trailing space/);
});
