(function renderSecurityProgramDashboard() {
  const data = window.SecurityProgramData;
  const app = document.getElementById('app');

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function statusClass(status) {
    return `status status-${String(status).toLowerCase().replace(/\s+/g, '-')}`;
  }

  function badge(status) {
    return `<span class="${statusClass(status)}">${escapeHtml(status)}</span>`;
  }

  function list(items) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function sectionHeader(eyebrow, title, copy) {
    return `
      <div class="section-header">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(copy)}</p>
      </div>
    `;
  }

  function metric(label, value) {
    return `<div class="metric"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`;
  }

  function renderHero() {
    return `
      <header class="hero">
        <nav class="topbar" aria-label="Demo sections">
          <a href="#overview">Overview</a>
          <a href="#frameworks">Frameworks</a>
          <a href="#vendors">Vendor Risk</a>
          <a href="#identity">Identity</a>
          <a href="#resilience">Resilience</a>
          <a href="#boundaries">Boundaries</a>
        </nav>
        <div class="hero-grid" id="overview">
          <div class="hero-copy">
            <p class="eyebrow">Synthetic product demo UI</p>
            <h1>Security Program Operations Dashboard</h1>
            <p class="hero-subtitle">Synthetic compliance and security operations dashboard for tracking control readiness, evidence workflows, vendor risk, identity/access maturity, operational resilience, and framework coverage.</p>
            <p class="value-statement">This demo shows how a security program can organize controls, owners, evidence, gaps, and review actions without claiming compliance or replacing human judgment.</p>
            <div class="hero-actions">
              <a class="button" href="#frameworks">View readiness</a>
              <a class="button button-secondary" href="#demo-path">Follow demo path</a>
            </div>
          </div>
          <div class="hero-panel" aria-label="Readiness summary">
            ${metric('Supported frameworks', data.frameworkReadiness.length)}
            ${metric('Program pillars', data.programPillars.length)}
            ${metric('Vendor categories', data.vendorRiskQueue.length)}
            ${metric('Synthetic data only', 'Local demo')}
          </div>
        </div>
      </header>
      <section class="section summary-cards">
        ${data.overviewCards.map((card) => `
          <article class="card summary-card">
            <div class="card-top"><h3>${escapeHtml(card.title)}</h3>${badge(card.status)}</div>
            <dl>
              <div><dt>Priority</dt><dd>${escapeHtml(card.priority)}</dd></div>
              <div><dt>Owner</dt><dd>${escapeHtml(card.owner)}</dd></div>
            </dl>
            <p>${escapeHtml(card.reason)}</p>
          </article>
        `).join('')}
      </section>
    `;
  }

  function renderFrameworks() {
    return `
      <section class="section" id="frameworks">
        ${sectionHeader('Framework readiness', 'Readiness Across Supported Frameworks', 'Readiness signals show synthetic control coverage, owner routing, review needs, and open gaps without making compliance claims.')}
        <div class="framework-grid">
          ${data.frameworkReadiness.map((framework) => `
            <article class="card framework-card">
              <div class="card-top"><h3>${escapeHtml(framework.name)}</h3>${badge(framework.signal)}</div>
              <div class="readiness-meter" aria-label="${escapeHtml(framework.name)} readiness ${framework.readinessPercent}%">
                <span style="width: ${framework.readinessPercent}%"></span>
              </div>
              <div class="percent">${framework.readinessPercent}% readiness signal</div>
              <div class="mini-metrics">
                ${metric('Total controls', framework.totalControls)}
                ${metric('Ready', framework.readyControls)}
                ${metric('Needs review', framework.needsReview)}
                ${metric('Gaps', framework.gaps)}
              </div>
              <p><strong>Owner:</strong> ${escapeHtml(framework.owner)}</p>
              <p><strong>Next review action:</strong> ${escapeHtml(framework.nextAction)}</p>
              ${framework.boundaryNote ? `<p class="boundary-inline">${escapeHtml(framework.boundaryNote)}</p>` : ''}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderPillars() {
    return `
      <section class="section">
        ${sectionHeader('Program model', 'Security Program Pillars', 'Pillars organize owners, evidence examples, next actions, friction, and automation opportunities across the operating model.')}
        <div class="pillar-grid">
          ${data.programPillars.map((pillar) => `
            <article class="card pillar-card">
              <div class="card-top"><h3>${escapeHtml(pillar.name)}</h3>${badge(pillar.status)}</div>
              <p class="muted">${escapeHtml(pillar.maturitySignal)}</p>
              <dl>
                <div><dt>Owner</dt><dd>${escapeHtml(pillar.owner)}</dd></div>
                <div><dt>Priority</dt><dd>${escapeHtml(pillar.priority)}</dd></div>
                <div><dt>Friction</dt><dd>${escapeHtml(pillar.frictionLevel)}</dd></div>
              </dl>
              <h4>Evidence examples</h4>
              ${list(pillar.evidenceExamples)}
              <p><strong>Next action:</strong> ${escapeHtml(pillar.nextAction)}</p>
              <p><strong>Automation opportunity:</strong> ${escapeHtml(pillar.automationOpportunity)}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderVendorRisk() {
    return `
      <section class="section" id="vendors">
        ${sectionHeader('Third-party review', 'Vendor Risk Review Queue', 'Synthetic queue for reviewing criticality, data sensitivity, report scope, contractual safeguards, gaps, and recommended reviewers.')}
        <p class="education-note">Vendor review focuses on scope, report period, subservice organizations, complementary user entity controls, exceptions, and whether the report covers the service actually in use.</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Vendor category</th><th>Criticality</th><th>Data sensitivity</th><th>SOC 2 report</th><th>Safeguards</th><th>Status</th><th>Gap and action</th><th>Reviewer</th></tr></thead>
            <tbody>
              ${data.vendorRiskQueue.map((vendor) => `
                <tr>
                  <td><strong>${escapeHtml(vendor.vendorCategory)}</strong></td>
                  <td>${escapeHtml(vendor.criticality)}</td>
                  <td>${escapeHtml(vendor.dataSensitivity)}</td>
                  <td>${escapeHtml(vendor.soc2ReportStatus)}</td>
                  <td>${escapeHtml(vendor.contractSafeguardStatus)}</td>
                  <td>${badge(vendor.reviewStatus)}</td>
                  <td>${escapeHtml(vendor.gapSummary)}<br><span class="muted">Next: ${escapeHtml(vendor.nextAction)}</span></td>
                  <td>${escapeHtml(vendor.recommendedReviewer)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function renderIdentity() {
    return `
      <section class="section" id="identity">
        ${sectionHeader('Low-friction controls', 'Identity & Access Operations', 'Controls should be easier to follow than to work around.')}
        <div class="compact-grid">
          ${data.identityAccessControls.map((control) => `
            <article class="card compact-card">
              <div class="card-top"><h3>${escapeHtml(control.name)}</h3>${badge(control.status)}</div>
              <p><strong>Friction:</strong> ${escapeHtml(control.frictionLevel)}</p>
              <p><strong>Owner:</strong> ${escapeHtml(control.owner)}</p>
              <p><strong>Evidence:</strong> ${escapeHtml(control.evidenceExample)}</p>
              <p><strong>Automation:</strong> ${escapeHtml(control.automationOpportunity)}</p>
              <p><strong>Next:</strong> ${escapeHtml(control.nextAction)}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderEvidence() {
    const useful = data.evidenceItems.filter((item) => item.category === 'Useful Evidence');
    const lowValue = data.evidenceItems.filter((item) => item.category === 'Low-Value Evidence');
    const evidenceColumn = (title, items) => `
      <article class="card evidence-column">
        <h3>${escapeHtml(title)}</h3>
        ${items.map((item) => `<div class="evidence-item"><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.valueType)} · ${escapeHtml(item.whyItMatters)}</span></div>`).join('')}
      </article>
    `;

    return `
      <section class="section">
        ${sectionHeader('Evidence readiness', 'Evidence Worth Collecting', 'The platform distinguishes useful evidence from low-value documentation so review effort is focused on operating practice.')}
        <div class="two-column">
          ${evidenceColumn('Useful Evidence', useful)}
          ${evidenceColumn('Low-Value Evidence', lowValue)}
        </div>
        <p class="education-note">The dashboard prioritizes evidence that demonstrates operating practice, not documentation for its own sake.</p>
      </section>
    `;
  }

  function renderOperationalSecurity() {
    return `
      <section class="section" id="resilience">
        ${sectionHeader('Operating loop', 'Operational Security Loop', 'A practical operating loop makes review queues, exceptions, evidence, and owner follow-up visible.')}
        <div class="compact-grid">
          ${data.operationalSecurityItems.map((item) => `
            <article class="card compact-card">
              <div class="card-top"><h3>${escapeHtml(item.name)}</h3>${badge(item.status)}</div>
              <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
              <p><strong>Evidence:</strong> ${escapeHtml(item.evidence)}</p>
              <p><strong>Next:</strong> ${escapeHtml(item.nextAction)}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderBcdr() {
    return `
      <section class="section">
        ${sectionHeader('Operational resilience', 'Business Continuity & Disaster Recovery', 'Plans are only counted as ready when there is test evidence or owner sign-off.')}
        <div class="compact-grid">
          ${data.bcdrItems.map((item) => `
            <article class="card compact-card">
              <div class="card-top"><h3>${escapeHtml(item.name)}</h3>${badge(item.status)}</div>
              <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
              <p><strong>Evidence:</strong> ${escapeHtml(item.evidence)}</p>
              <p><strong>Next:</strong> ${escapeHtml(item.nextAction)}</p>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderFraudAndAi() {
    return `
      <section class="section split-section">
        <div>
          ${sectionHeader('Finance-partnered control readiness', 'Fraud and Funds-Transfer Controls', 'Concise readiness view for review workflow, ownership, and evidence examples around sensitive finance operations.')}
          <div class="stack">
            ${data.fraudControls.map((item) => `
              <article class="card row-card">
                <div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.financePartner)} · ${escapeHtml(item.evidence)}</p><p><strong>Next:</strong> ${escapeHtml(item.nextAction)}</p></div>
                ${badge(item.status)}
              </article>
            `).join('')}
          </div>
        </div>
        <div>
          ${sectionHeader('Governance workflow', 'AI Tooling Governance', 'AI-assisted tooling is treated as part of the security operating model, with data-boundary review and human approval for sensitive workflows.')}
          <div class="stack">
            ${data.aiToolingGovernanceItems.map((item) => `
              <article class="card row-card">
                <div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.owner)} · ${escapeHtml(item.evidence)}</p><p><strong>Next:</strong> ${escapeHtml(item.nextAction)}</p></div>
                ${badge(item.status)}
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderControlDetail() {
    const control = data.selectedControl;
    return `
      <section class="section">
        ${sectionHeader('Selected control view', 'Control Detail Panel', 'Reusable detail card for owner, reviewer, evidence examples, gap summary, next action, and safe boundary language.')}
        <article class="card detail-panel">
          <div class="card-top"><h3>${escapeHtml(control.id)} — ${escapeHtml(control.title)}</h3>${badge(control.status)}</div>
          <div class="detail-grid">
            ${metric('Framework', control.framework)}
            ${metric('Domain', control.domain)}
            ${metric('Owner', control.owner)}
            ${metric('Reviewer', control.reviewer)}
          </div>
          <h4>Evidence examples</h4>
          ${list(control.evidenceExamples)}
          <p><strong>Gap:</strong> ${escapeHtml(control.gapSummary)}</p>
          <p><strong>Recommended next action:</strong> ${escapeHtml(control.recommendedNextAction)}</p>
          <p class="boundary-inline"><strong>Boundary note:</strong> ${escapeHtml(control.boundaryNote)}</p>
        </article>
      </section>
    `;
  }

  function renderDemoPath() {
    return `
      <section class="section" id="demo-path">
        ${sectionHeader('Walkthrough', 'Product Demo Path', 'This demo uses synthetic data to show how program ownership, evidence readiness, review queues, and operational security gaps can be made visible in one place.')}
        <ol class="demo-path">
          ${data.productDemoPath.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}
        </ol>
      </section>
      <section class="section boundary-section" id="boundaries">
        ${sectionHeader('Safe boundaries', 'Synthetic Demo Boundaries', data.safeBoundaryNote)}
        <p>${escapeHtml(data.soxBoundaryNote)}</p>
        <p>No real integrations, company data, authentication, database, external API calls, live evidence collection, model calls, or new backend services are included.</p>
      </section>
    `;
  }

  app.innerHTML = [
    renderHero(),
    renderFrameworks(),
    renderPillars(),
    renderVendorRisk(),
    renderIdentity(),
    renderEvidence(),
    renderOperationalSecurity(),
    renderBcdr(),
    renderFraudAndAi(),
    renderControlDetail(),
    renderDemoPath()
  ].join('');
})();
