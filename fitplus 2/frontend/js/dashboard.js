// ── Tab switching ────────────────────────────────────────────
function showTab(name) {
  // sidebar links
  document.querySelectorAll('.dash-link').forEach(l => {
    l.classList.toggle('active', l.dataset.tab === name);
  });
  // content panels
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.id === 'tab-' + name);
  });
}

// ── Attendance bar chart ──────────────────────────────────────
function renderAttBars(containerId) {
  const days = ['M','T','W','T','F','S','S'];
  const vals = [1, 1, 0, 1, 1, 1, 0];        // 1 = attended, 0 = missed
  const el   = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = days.map((d, i) => `
    <div class="att-bar-wrap">
      <div class="att-bar" style="
        height: ${vals[i] ? '60px' : '16px'};
        background: ${vals[i] ? 'var(--orange)' : 'var(--bg3)'};
      "></div>
      <span class="att-day">${d}</span>
    </div>
  `).join('');
}
