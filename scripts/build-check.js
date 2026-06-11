const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { frameworks } = require('../src/frameworks');
const { dashboardFrameworkCards, frameworkReadinessMetrics, syntheticEvidenceInventory } = require('../src/dashboardData');
const { soxItgcControls } = require('../src/soxItgcControls');

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
checkRootStrayFiles();
checkYamlSyntax();
checkPythonCompilation();
checkReadmeLinks();

console.log('Build data, migration, syntax, and README link checks passed.');
