const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const ignoredDirectories = new Set(['.git', 'node_modules']);
const scannedExtensions = new Set(['.md', '.js', '.json']);

const unsafePhrases = [
  ['SOX', 'compliant'],
  ['SOX', 'compliance guaranteed'],
  ['SOX', 'certified'],
  ['SOX', 'audit-ready'],
  ['SOX', 'controls validated'],
  ['SOX', 'effectiveness proven'],
  ['financial audit', 'assurance'],
  ['SOX', 'attestation'],
  ['PCAOB', 'ready'],
  ['auditor', 'approved'],
  ['public-company', 'ready']
].map((parts) => parts.join(parts[0] === 'PCAOB' || parts[0] === 'public-company' ? '-' : ' '));

const nonClaimMarkers = [
  'does not',
  'do not',
  'not ',
  'non-claim',
  'non-claims',
  'limited to synthetic',
  'avoid:',
  'unsafePhrases'
];

function isNonClaim(line) {
  const normalized = line.toLowerCase();
  return nonClaimMarkers.some((marker) => normalized.includes(marker.toLowerCase()));
}

function collectFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath));
    } else if (scannedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const violations = [];

for (const file of collectFiles(repoRoot)) {
  const relativePath = path.relative(repoRoot, file);
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const phrase of unsafePhrases) {
      if (line.includes(phrase) && !isNonClaim(line)) {
        violations.push(`${relativePath}:${index + 1} contains unsafe claim phrase "${phrase}"`);
      }
    }
  });
}

if (violations.length > 0) {
  console.error('Unsafe SOX claim language detected:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('SOX claim-safety scan passed.');
