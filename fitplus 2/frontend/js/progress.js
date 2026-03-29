// ── Chart.js default options ─────────────────────────────────
const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1f1f1f',
      borderColor: 'rgba(255,255,255,.08)',
      borderWidth: 1,
      titleColor: '#f2f0eb',
      bodyColor: '#888880',
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#555550', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,.04)' }, ticks: { color: '#555550', font: { size: 11 } } },
  },
};

// ── Weight chart ─────────────────────────────────────────────
new Chart(document.getElementById('weightChart'), {
  type: 'line',
  data: {
    labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'],
    datasets: [{
      label: 'Weight (kg)',
      data: [75.2, 74.8, 74.5, 74.1, 73.8, 73.2, 72.6, 72.0],
      borderColor: '#ff6b2b',
      backgroundColor: 'rgba(255,107,43,.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#ff6b2b',
      pointRadius: 5,
      borderWidth: 2,
    }],
  },
  options: { ...CHART_OPTS, plugins: { ...CHART_OPTS.plugins, legend: { display: true, labels: { color: '#888880', font: { size: 11 } } } } },
});

// ── Calories burned chart ────────────────────────────────────
new Chart(document.getElementById('calChart'), {
  type: 'bar',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calories Burned',
      data: [420, 380, 0, 510, 460, 620, 0],
      backgroundColor: [
        'rgba(255,107,43,.75)', 'rgba(255,107,43,.75)',
        'rgba(255,255,255,.05)',
        'rgba(255,107,43,.75)', 'rgba(255,107,43,.75)',
        'rgba(255,107,43,.75)',
        'rgba(255,255,255,.05)',
      ],
      borderRadius: 6,
      borderSkipped: false,
    }],
  },
  options: CHART_OPTS,
});

// ── Consistency doughnut ─────────────────────────────────────
new Chart(document.getElementById('consChart'), {
  type: 'doughnut',
  data: {
    labels: ['Completed (17)', 'Missed (3)'],
    datasets: [{
      data: [17, 3],
      backgroundColor: ['#ff6b2b', 'rgba(255,255,255,.07)'],
      borderWidth: 0,
      borderRadius: 4,
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: { color: '#888880', font: { size: 11 }, padding: 14 },
      },
      tooltip: {
        backgroundColor: '#1f1f1f',
        borderColor: 'rgba(255,255,255,.08)',
        borderWidth: 1,
        titleColor: '#f2f0eb',
        bodyColor: '#888880',
        cornerRadius: 8,
      },
    },
    cutout: '65%',
  },
});

// ── Streak calendar ──────────────────────────────────────────
function renderStreak() {
  const today = new Date().getDate();
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  // Demo: attended on specific days
  const attended = [1,2,4,5,7,8,9,11,12,14,15,16,18,19,21,22,23,25,26];
  const html = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const done = attended.includes(day);
    const isToday = day === today;
    return `<div class="streak-day ${done ? 'streak-done' : 'streak-miss'} ${isToday ? 'streak-today' : ''}" title="${day} ${done ? '✓' : '✗'}">${day}</div>`;
  }).join('');
  document.getElementById('streakRow').innerHTML = html;
}
renderStreak();
