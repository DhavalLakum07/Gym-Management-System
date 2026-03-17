// ── Crowd level by hour (0–23) ───────────────────────────────
// Based on typical gym patterns: peaks 7-9am and 5-8pm
const HOURLY_BASE = [
  8, 5, 5, 5, 8, 18,   // 12am–5am
  38, 65, 82, 70, 48, 40, // 6am–11am
  36, 40, 48, 55, 62, 72, // 12pm–5pm
  85, 82, 65, 45, 28, 14  // 6pm–11pm
];

function getCrowdNow() {
  const hour = new Date().getHours();
  let pct = HOURLY_BASE[hour] || 10;
  // Add realistic noise ±10%
  pct += (Math.random() * 20) - 10;
  pct = Math.max(5, Math.min(98, Math.round(pct)));

  let level, color, emoji, advice;
  if (pct < 30) {
    level = 'LOW';    color = '#22c55e'; emoji = '😊';
    advice = '✅ Great time to work out! Minimal wait for any equipment.';
  } else if (pct < 65) {
    level = 'MEDIUM'; color = '#f59e0b'; emoji = '😐';
    advice = '⚡ Moderate crowd. Most equipment available with short wait.';
  } else {
    level = 'HIGH';   color = '#ef4444'; emoji = '😰';
    advice = '⚠️ Very busy right now. Come back in 1–2 hours or book equipment.';
  }
  return { pct, level, color, emoji, advice };
}

function renderCrowd() {
  const { pct, level, color, emoji, advice } = getCrowdNow();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });

  document.getElementById('crowdDisplay').innerHTML = `
    <div style="font-size:.75rem;color:var(--gray);margin-bottom:10px;letter-spacing:.08em;text-transform:uppercase;">
      Live · Updated at ${timeStr}
    </div>
    <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);padding:4px 14px;border-radius:99px;font-size:.75rem;font-weight:600;color:#22c55e;letter-spacing:.04em;margin-bottom:14px;">
      <span style="width:7px;height:7px;border-radius:50%;background:#22c55e;animation:pulsedot 1.5s ease infinite;display:inline-block;"></span>
      LIVE
    </div>
    <div style="font-family:var(--font-display);font-size:clamp(2.5rem,8vw,5rem);letter-spacing:2px;line-height:1;margin-bottom:8px;color:${color}">
      ${emoji} ${level}
    </div>
    <div style="font-family:var(--font-display);font-size:2.5rem;margin-bottom:4px;color:${color}">${pct}%</div>
    <div style="font-size:.875rem;color:var(--gray);margin-bottom:16px">capacity currently in use</div>
    <div style="max-width:320px;margin:0 auto;">
      <div style="height:14px;background:var(--bg3);border-radius:99px;overflow:hidden;margin-bottom:6px;">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:99px;transition:width .8s ease;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.68rem;color:var(--gray2);">
        <span>Empty</span><span>Half</span><span>Full</span>
      </div>
    </div>
    <div style="margin-top:14px;font-size:.875rem;color:var(--gray);max-width:360px;margin-left:auto;margin-right:auto;line-height:1.6">
      ${advice}
    </div>
  `;

  renderHourlyBars();
}

function renderHourlyBars() {
  const labels = ['5A','6A','7A','8A','9A','10A','11A','12P','1P','2P','3P','4P','5P','6P','7P','8P','9P','10P'];
  const vals   = [18, 38, 65, 82, 70, 48, 40, 36, 40, 48, 55, 62, 72, 85, 82, 65, 45, 28];
  const currentHour = new Date().getHours();

  document.getElementById('hourlyGrid').innerHTML = labels.map((lbl, i) => {
    const v = vals[i];
    const c = v < 30 ? '#22c55e' : v < 65 ? '#f59e0b' : '#ef4444';
    const hour = i + 5; // starts at 5am
    const isCurrent = hour === currentHour;
    return `
      <div class="h-bar-wrap">
        <div class="h-bar-outer" style="border:${isCurrent ? '1px solid ' + c : '1px solid transparent'};border-radius:5px;">
          <div class="h-bar-inner" style="height:${v}%;background:${c};opacity:${isCurrent ? 1 : 0.55}"></div>
        </div>
        <div class="h-label" style="color:${isCurrent ? c : 'var(--gray2)'}; font-weight:${isCurrent ? 600 : 400}">${lbl}</div>
      </div>
    `;
  }).join('');
}

// Init and refresh every 30 seconds
renderCrowd();
setInterval(renderCrowd, 30000);
