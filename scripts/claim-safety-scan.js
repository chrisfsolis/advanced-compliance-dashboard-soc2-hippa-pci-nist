const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const ignoredDirectories = new Set(['.git', 'node_modules']);
const scannedExtensions = new Set(['.md', '.js', '.json', '.yaml', '.yml', '.py']);

const unsafePhrases = [
  'SOX compliant',
  'SOC 2 compliant',
  'HIPAA compliant',
  'PCI compliant',
  'audit-ready',
  'certified',
  'attestation',
  'financial audit assurance',
  'control effectiveness proven',
  'guarantees compliance',
  'guaranteed compliance',
  'production compliance platform',
  'SOX controls validated',
  'SOX effectiveness proven',
  'PCAOB-ready',
  'auditor approved',
  'public-company-ready'
];

const nonClaimMarkers = [
  'does not',
  'do not',
  'not ',
  'non-claim',
  'non-claims',
  'limited to synthetic',
  'avoid:',
  'unsafe language',
  'unsafephrases',
  'unsafe phrases',
  'flag or avoid phrases',
  'confirmation that no'
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
const normalizedUnsafePhrases = unsafePhrases.map((phrase) => phrase.toLowerCase());

for (const file of collectFiles(repoRoot)) {
  const relativePath = path.relative(repoRoot, file);
  if (relativePath === 'scripts/claim-safety-scan.js') {
    continue;
  }
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  lines.forEach((line, index) => {
    const normalizedLine = line.toLowerCase();
    for (let i = 0; i < normalizedUnsafePhrases.length; i += 1) {
      if (normalizedLine.includes(normalizedUnsafePhrases[i]) && !isNonClaim(line)) {
        violations.push(`${relativePath}:${index + 1} contains unsafe claim phrase "${unsafePhrases[i]}"`);
      }
    }
  });
}

if (violations.length > 0) {
  console.error('Unsafe claim language detected:');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Claim-safety scan passed.');
