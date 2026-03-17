// ── Load workout log from localStorage ──────────────────────
let workoutLog = JSON.parse(localStorage.getItem('fp_injury_log') || '[]');

const INTENSITY_SCORE = { light: 1, moderate: 2, heavy: 3, extreme: 4 };
const INTENSITY_COLOR = { light: '#22c55e', moderate: '#f59e0b', heavy: '#ef4444', extreme: '#a855f7' };

// ── Log a new workout ────────────────────────────────────────
function logWorkout() {
  const type      = document.getElementById('wType').value;
  const intensity = document.getElementById('wIntensity').value;
  const duration  = parseInt(document.getElementById('wDuration').value) || 60;

  workoutLog.push({
    type, intensity, duration,
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  });
  localStorage.setItem('fp_injury_log', JSON.stringify(workoutLog));
  render();
}

// ── Clear all logs ───────────────────────────────────────────
function clearLog() {
  if (!confirm('Clear all workout logs?')) return;
  workoutLog = [];
  localStorage.setItem('fp_injury_log', JSON.stringify(workoutLog));
  render();
}

// ── Delete one entry ─────────────────────────────────────────
function deleteEntry(index) {
  workoutLog.splice(index, 1);
  localStorage.setItem('fp_injury_log', JSON.stringify(workoutLog));
  render();
}

// ── Main render ──────────────────────────────────────────────
function render() {
  const log = workoutLog;

  // Calculate load score
  const totalScore    = log.reduce((s, w) => s + INTENSITY_SCORE[w.intensity] * (w.duration / 60), 0);
  const heavyCount    = log.filter(w => w.intensity === 'heavy' || w.intensity === 'extreme').length;
  const extremeCount  = log.filter(w => w.intensity === 'extreme').length;
  const totalDuration = log.reduce((s, w) => s + w.duration, 0);
  const hasRest       = log.some(w => w.type.includes('Yoga') || w.type.includes('Stretch'));

  // Load meter (max safe score ~6)
  const loadPct   = Math.min(Math.round((totalScore / 8) * 100), 100);
  const loadColor = loadPct < 40 ? '#22c55e' : loadPct < 70 ? '#f59e0b' : '#ef4444';
  const loadFill  = document.getElementById('loadFill');
  if (loadFill) {
    loadFill.style.width    = loadPct + '%';
    loadFill.style.background = loadColor;
  }
  const loadText = document.getElementById('loadText');
  if (loadText) {
    if (log.length === 0) {
      loadText.textContent = 'No workouts logged yet.';
    } else {
      loadText.textContent = `Load score: ${totalScore.toFixed(1)} / 8.0 · Total today: ${totalDuration} min · ${log.length} session${log.length !== 1 ? 's' : ''}`;
      loadText.style.color = loadColor;
    }
  }

  // ── Alert logic ───────────────────────────────────────────
  let alertHTML = '';

  if (log.length === 0) {
    alertHTML = `
      <div class="alert-box alert-info">
        <span class="alert-icon">ℹ️</span>
        <div>
          <div class="alert-title" style="color:#3b82f6">READY TO TRACK</div>
          Log your workout sessions above. The system will automatically analyse your training load and warn you if you are at risk of overtraining or injury.
        </div>
      </div>`;
  } else if (extremeCount >= 1 && heavyCount >= 2) {
    alertHTML = `
      <div class="alert-box alert-warn">
        <span class="alert-icon">🚨</span>
        <div>
          <div class="alert-title" style="color:#ef4444">OVERTRAINING WARNING — STOP NOW</div>
          You have logged ${log.length} sessions including ${extremeCount} extreme intensity workout${extremeCount > 1 ? 's' : ''} today.
          This <strong>significantly increases your risk</strong> of muscle tears, joint injuries, and burnout.
          <strong style="color:#f2f0eb;">Take a full rest day tomorrow. No exceptions.</strong>
        </div>
      </div>`;
  } else if (heavyCount >= 3) {
    alertHTML = `
      <div class="alert-box alert-warn">
        <span class="alert-icon">⚠️</span>
        <div>
          <div class="alert-title" style="color:#ef4444">YOU MAY BE OVERTRAINING TODAY</div>
          ${heavyCount} heavy sessions in one day is too much for most people. Stop now, eat a high-protein meal, and
          <strong style="color:#f2f0eb;">sleep 8+ hours tonight.</strong> Muscles need rest to grow and recover.
        </div>
      </div>`;
  } else if (heavyCount >= 2) {
    alertHTML = `
      <div class="alert-box alert-caution">
        <span class="alert-icon">⚠️</span>
        <div>
          <div class="alert-title" style="color:#f59e0b">HIGH INTENSITY CAUTION</div>
          You've done ${heavyCount} heavy sessions today. Make sure to eat enough protein (${Math.round(70 * 1.8)}g+),
          drink 3L of water, and sleep 8 hours. Consider adding a 10-minute cool-down stretch.
        </div>
      </div>`;
  } else if (totalDuration > 120) {
    alertHTML = `
      <div class="alert-box alert-caution">
        <span class="alert-icon">⏱️</span>
        <div>
          <div class="alert-title" style="color:#f59e0b">LONG SESSION ALERT</div>
          Total workout time today: <strong style="color:#f2f0eb">${totalDuration} minutes</strong>.
          Sessions over 90 minutes elevate cortisol levels which breaks down muscle tissue.
          Prioritise sleep and protein-rich foods tonight.
        </div>
      </div>`;
  } else {
    alertHTML = `
      <div class="alert-box alert-ok">
        <span class="alert-icon">✅</span>
        <div>
          <div class="alert-title" style="color:#22c55e">TRAINING LOAD IS SAFE</div>
          Your training intensity today is within a healthy range.
          ${hasRest ? '🧘 Great job including a flexibility/recovery session! ' : '💡 Tip: Consider adding a 10-min cool-down stretch after your session. '}
          Keep up the consistency and remember to eat enough protein!
        </div>
      </div>`;
  }
  document.getElementById('alertArea').innerHTML = alertHTML;

  // ── Render log list ───────────────────────────────────────
  document.getElementById('logCount').textContent = log.length + ' session' + (log.length !== 1 ? 's' : '') + ' today';
  document.getElementById('workoutLog').innerHTML = log.length === 0
    ? '<div style="text-align:center;color:var(--gray2);padding:28px;font-size:.875rem">No workouts logged yet. Add your first session above.</div>'
    : [...log].reverse().map((w, i) => {
        const realIndex = log.length - 1 - i;
        const badgeClass = { light:'badge-green', moderate:'badge-amber', heavy:'badge-red', extreme:'badge-purple' };
        return `
          <div class="log-item">
            <div class="int-dot" style="background:${INTENSITY_COLOR[w.intensity]}"></div>
            <span class="log-name">${w.type}</span>
            <span class="log-meta">${w.duration} min</span>
            <span class="badge ${badgeClass[w.intensity] || ''}" style="margin-left:4px">${w.intensity}</span>
            <span class="log-meta" style="margin-left:auto">${w.time}</span>
            <button class="del-btn" onclick="deleteEntry(${realIndex})">✕</button>
          </div>
        `;
      }).join('');
}

// Init on page load
render();
