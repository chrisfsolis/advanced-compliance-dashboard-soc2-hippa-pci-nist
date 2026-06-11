const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { frameworks } = require('../src/frameworks');
const { dashboardFrameworkCards, frameworkReadinessMetrics, syntheticEvidenceInventory } = require('../src/dashboardData');
const { soxItgcControls } = require('../src/soxItgcControls');
const securityProgramData = require('../src/securityProgramData');

const repoRoot = path.resolve(__dirname, '..');
const knownStrayRootFiles = [
  'PR gate (block merges if critical controls fail):',
  'control evaluation engine (concept)',
  'control-as-code example (YAML)',
  'evidence collector example (GitHub)',
  'nightly compliance & PR Gate',
  'python skeleton',
  'structure'
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: 'utf8',
    ...options
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed:\n${result.stdout}${result.stderr}`);
  }

  return result;
}

function collectFiles(directory, predicate) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkReadinessData() {
  assert(frameworks.length === 6, `Expected 6 frameworks, found ${frameworks.length}.`);
  assert(frameworks.some((framework) => framework.id === 'sox-itgc'), 'SOX ITGC framework is missing from the framework list.');
  assert(dashboardFrameworkCards.some((card) => card.id === 'sox-itgc'), 'SOX ITGC dashboard card data is missing.');
  assert(
    frameworkReadinessMetrics.some((metric) => metric.frameworkId === 'sox-itgc' && metric.totalControls === soxItgcControls.length),
    'SOX ITGC readiness metrics do not align with synthetic controls.'
  );
  assert(
    syntheticEvidenceInventory.filter((item) => item.frameworkId === 'sox-itgc').length === soxItgcControls.length,
    'SOX ITGC evidence inventory does not align with synthetic controls.'
  );
}

function checkSecurityProgramDemoData() {
  const allowedStatuses = new Set(['Ready', 'Needs Review', 'Gap', 'Owner Needed', 'In Progress']);
  const statusCollections = [
    securityProgramData.overviewCards,
    securityProgramData.frameworkReadiness.map((item) => ({ status: item.signal })),
    securityProgramData.programPillars,
    securityProgramData.vendorRiskQueue.map((item) => ({ status: item.reviewStatus })),
    securityProgramData.identityAccessControls,
    securityProgramData.operationalSecurityItems,
    securityProgramData.bcdrItems,
    securityProgramData.fraudControls,
    securityProgramData.aiToolingGovernanceItems,
    [securityProgramData.selectedControl]
  ];

  for (const collection of statusCollections) {
    for (const item of collection) {
      assert(allowedStatuses.has(item.status), `Unexpected demo status: ${item.status}`);
    }
  }

  assert(securityProgramData.overviewCards.length === 6, 'Expected 6 homepage overview cards.');
  assert(securityProgramData.frameworkReadiness.length === 6, 'Expected 6 framework readiness cards.');
  assert(securityProgramData.programPillars.length === 9, 'Expected 9 security program pillars.');
  assert(securityProgramData.vendorRiskQueue.length === 8, 'Expected 8 vendor risk queue items.');
  assert(securityProgramData.identityAccessControls.length === 8, 'Expected 8 identity and access controls.');
  assert(securityProgramData.operationalSecurityItems.length === 9, 'Expected 9 operational security loop items.');
  assert(securityProgramData.bcdrItems.length === 9, 'Expected 9 BCDR readiness items.');
  assert(securityProgramData.fraudControls.length === 6, 'Expected 6 fraud and funds-transfer controls.');
  assert(securityProgramData.aiToolingGovernanceItems.length === 7, 'Expected 7 AI tooling governance items.');
  assert(
    securityProgramData.soxBoundaryNote.includes('SOX coverage is limited to synthetic ITGC readiness workflows'),
    'Required SOX boundary note is missing from product demo data.'
  );
}

function checkRootStrayFiles() {
  const rootEntries = fs.readdirSync(repoRoot, { withFileTypes: true });
  const knownStraysPresent = knownStrayRootFiles.filter((file) => fs.existsSync(path.join(repoRoot, file)));
  assert(knownStraysPresent.length === 0, `Known stray root files remain: ${knownStraysPresent.join(', ')}`);

  const extensionlessNoteFiles = rootEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => !name.includes('.') && name !== 'LICENSE')
    .filter((name) => /\s|\(|\)|:|&/.test(name));

  assert(extensionlessNoteFiles.length === 0, `Extensionless note-like root files remain: ${extensionlessNoteFiles.join(', ')}`);
}

function checkYamlSyntax() {
  const workflowFiles = collectFiles(path.join(repoRoot, '.github', 'workflows'), (file) => file.endsWith('.yml'));
  const controlFiles = collectFiles(path.join(repoRoot, 'controls'), (file) => file.endsWith('.yaml'));
  const yamlFiles = [...workflowFiles, ...controlFiles].map((file) => path.relative(repoRoot, file));

  if (yamlFiles.length === 0) {
    return;
  }

  const rubyScript = 'require "yaml"; ARGV.each { |file| YAML.load_file(file) }';
  run('ruby', ['-e', rubyScript, ...yamlFiles]);
}

function checkPythonCompilation() {
  const pythonFiles = collectFiles(path.join(repoRoot, 'scripts'), (file) => file.endsWith('.py')).map((file) => path.relative(repoRoot, file));

  if (pythonFiles.length === 0) {
    return;
  }

  run('python3', ['-m', 'py_compile', ...pythonFiles]);
}

function checkReadmeLinks() {
  const readme = fs.readFileSync(path.join(repoRoot, 'README.md'), 'utf8');
  const markdownLinks = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  const missingLinks = markdownLinks
    .filter((link) => !link.startsWith('http://') && !link.startsWith('https://') && !link.startsWith('#'))
    .filter((link) => !fs.existsSync(path.join(repoRoot, link)));

  assert(missingLinks.length === 0, `README links point to missing files: ${missingLinks.join(', ')}`);
}

checkReadinessData();
checkSecurityProgramDemoData();
checkRootStrayFiles();
checkYamlSyntax();
checkPythonCompilation();
checkReadmeLinks();

console.log('Build data, migration, syntax, and README link checks passed.');
