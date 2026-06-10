const SOX_BOUNDARY_NOTE =
  'SOX coverage is limited to synthetic ITGC readiness workflows and does not represent SOX compliance, financial audit assurance, or control effectiveness validation.';

const frameworks = [
  {
    id: 'soc2',
    name: 'SOC 2',
    displayName: 'SOC 2 Readiness',
    category: 'Trust Services Criteria',
    description: 'Synthetic readiness workflow for trust services controls and evidence tracking.'
  },
  {
    id: 'sox-itgc',
    name: 'SOX ITGC',
    displayName: 'SOX ITGC Readiness',
    category: 'Financial Reporting IT Controls',
    description: 'Synthetic readiness workflow for IT general controls supporting financial reporting systems.',
    boundaryNote: SOX_BOUNDARY_NOTE
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    displayName: 'HIPAA Readiness',
    category: 'Healthcare Data Safeguards',
    description: 'Synthetic readiness workflow for healthcare privacy and security control evidence.'
  },
  {
    id: 'pci-dss',
    name: 'PCI DSS',
    displayName: 'PCI DSS Readiness',
    category: 'Payment Card Security',
    description: 'Synthetic readiness workflow for payment security control coverage and evidence.'
  },
  {
    id: 'nist-rmf',
    name: 'NIST RMF',
    displayName: 'NIST RMF Readiness',
    category: 'Risk Management Framework',
    description: 'Synthetic readiness workflow for risk management lifecycle visibility.'
  },
  {
    id: 'nist-800-53',
    name: 'NIST 800-53',
    displayName: 'NIST 800-53 Readiness',
    category: 'Security and Privacy Controls',
    description: 'Synthetic readiness workflow for control families and evidence completeness.'
  }
];

const frameworkNames = frameworks.map((framework) => framework.name);

module.exports = {
  SOX_BOUNDARY_NOTE,
  frameworks,
  frameworkNames
};
