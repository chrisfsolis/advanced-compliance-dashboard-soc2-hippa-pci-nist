const data = window.interviewDemoData;

function badgeClass(status) {
  return `badge badge-${status.toLowerCase().replace(/\s+/g, '-').replace('/', '')}`;
}

function htmlList(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function renderSummaryCards() {
  return data.demoSummaryCards.map((card) => `
    <article class="card summary-card">
      <div class="card-topline">
        <span class="eyebrow">${card.priority} priority</span>
        <span class="${badgeClass(card.status)}">${card.status}</span>
      </div>
      <h3>${card.title}</h3>
      <p>${card.reason}</p>
      <p class="meta"><strong>Owner:</strong> ${card.owner}</p>
    </article>
  `).join('');
}

function renderRoadmap() {
  return data.firstSixMonthsRoadmap.map((phase) => `
    <article class="timeline-card">
      <span class="phase">${phase.phase}</span>
      <h3>${phase.theme}</h3>
      <ul>${htmlList(phase.actions)}</ul>
    </article>
  `).join('');
}

function renderPillars() {
  return data.securityProgramPillars.map((pillar) => `
    <article class="card pillar-card">
      <div class="card-topline">
        <span class="${badgeClass(pillar.status)}">${pillar.status}</span>
        <span class="eyebrow">${pillar.priority} priority</span>
      </div>
      <h3>${pillar.name}</h3>
      <p>${pillar.maturitySignal}</p>
      <p class="meta"><strong>Owner:</strong> ${pillar.owner}</p>
      <p class="meta"><strong>Next action:</strong> ${pillar.nextAction}</p>
      <div class="evidence-stack"><strong>Evidence examples</strong><ul>${htmlList(pillar.evidenceExamples)}</ul></div>
    </article>
  `).join('');
}

function renderVendorQueue() {
  return data.vendorRiskItems.map((vendor) => `
    <article class="queue-row">
      <div>
        <span class="eyebrow">${vendor.criticality} · ${vendor.dataSensitivity}</span>
        <h3>${vendor.vendorCategory}</h3>
        <p>${vendor.gapSummary}</p>
      </div>
      <dl>
        <div><dt>SOC 2 report</dt><dd>${vendor.soc2ReportStatus}</dd></div>
        <div><dt>Contract safeguards</dt><dd>${vendor.contractSafeguardStatus}</dd></div>
        <div><dt>Reviewer</dt><dd>${vendor.recommendedReviewer}</dd></div>
        <div><dt>Next action</dt><dd>${vendor.nextAction}</dd></div>
      </dl>
    </article>
  `).join('');
}

function renderIdentityControls() {
  return data.identityControls.map((control) => `
    <article class="mini-card">
      <div class="card-topline"><h3>${control.name}</h3><span class="${badgeClass(control.status)}">${control.status}</span></div>
      <p><strong>Friction:</strong> ${control.frictionLevel}</p>
      <p><strong>Automation:</strong> ${control.automationOpportunity}</p>
      <p><strong>Owner:</strong> ${control.owner}</p>
      <p><strong>Evidence:</strong> ${control.evidenceExample}</p>
    </article>
  `).join('');
}

function renderEvidenceColumns() {
  const useful = data.evidenceItems.filter((item) => item.category === 'useful');
  const busywork = data.evidenceItems.filter((item) => item.category === 'busywork');
  const renderItems = (items) => items.map((item) => `<li><strong>${item.label}</strong><span>${item.whyItMatters}</span></li>`).join('');
  return `
    <div class="evidence-column useful"><h3>Useful Evidence</h3><ul>${renderItems(useful)}</ul></div>
    <div class="evidence-column busywork"><h3>Busywork / Low Value</h3><ul>${renderItems(busywork)}</ul></div>
  `;
}

function renderReadinessGrid(items, partnerLabel = 'Owner') {
  return items.map((item) => `
    <article class="mini-card compact">
      <div class="card-topline"><h3>${item.name}</h3><span class="${badgeClass(item.status)}">${item.status}</span></div>
      <p><strong>${partnerLabel}:</strong> ${item.owner || item.financePartner}</p>
      <p><strong>Evidence:</strong> ${item.evidence}</p>
      <p><strong>Next:</strong> ${item.nextAction}</p>
    </article>
  `).join('');
}

function renderDemoPath() {
  return data.fiveMinuteDemoPath.map((step, index) => `<li><span>${index + 1}</span>${step}</li>`).join('');
}

function renderApp() {
  document.getElementById('summaryCards').innerHTML = renderSummaryCards();
  document.getElementById('roadmap').innerHTML = renderRoadmap();
  document.getElementById('pillars').innerHTML = renderPillars();
  document.getElementById('vendorQueue').innerHTML = renderVendorQueue();
  document.getElementById('identityControls').innerHTML = renderIdentityControls();
  document.getElementById('evidenceColumns').innerHTML = renderEvidenceColumns();
  document.getElementById('bcdrItems').innerHTML = renderReadinessGrid(data.bcdrItems);
  document.getElementById('fraudControls').innerHTML = renderReadinessGrid(data.fraudControls, 'Finance partner');
  document.getElementById('aiThreatModel').innerHTML = renderReadinessGrid(data.aiThreatModelItems);
  document.getElementById('demoPath').innerHTML = renderDemoPath();
  document.getElementById('frameworkNote').textContent = data.supportedFrameworkNote;
  document.getElementById('safetyDisclaimer').textContent = data.demoSafetyDisclaimer;
}

renderApp();
