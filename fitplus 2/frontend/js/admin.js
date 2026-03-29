// ── Default data ────────────────────────────────────────
const DEFAULT_MEMBERS = [
  { id: 1, name: 'Ashutosh Kamboya',  phone: '9810000001', plan: 'Standard', trainer: 'Rahul Shah',  status: 'Active',  joined: '2024-10-01' },
  { id: 2, name: 'Meet Katudiya',  phone: '9810000002', plan: 'Premium',  trainer: 'Priya Patel', status: 'Active',  joined: '2024-11-15' },
  { id: 3, name: 'Darsh Patel', phone: '9810000003', plan: 'Basic',    trainer: 'Rahul Shah',  status: 'Expired', joined: '2024-08-20' },
  { id: 4, name: 'Taksh Patel', phone: '9810000004', plan: 'Premium',  trainer: 'Priya Patel', status: 'Active',  joined: '2024-09-05' },
  { id: 5, name: 'Mahavir Chauhan',  phone: '9810000005', plan: 'Standard', trainer: 'Arjun Mehta', status: 'Active',  joined: '2025-01-10' },
];
const DEFAULT_TRAINERS = [
  { id: 1, name: 'Rahul Shah',  spec: 'Strength & Powerlifting', phone: '9800000002', members: 3 },
  { id: 2, name: 'Priya Patel', spec: 'Yoga & Pilates',          phone: '9800000003', members: 2 },
  { id: 3, name: 'Arjun Mehta', spec: 'Cardio & HIIT',           phone: '9800000004', members: 1 },
];
const DEFAULT_CLASSES = [
  { id: 1, name: 'Morning Yoga',   trainer: 'Priya Patel', time: 'Mon/Wed/Fri 6:30AM', cap: 15 },
  { id: 2, name: 'HIIT Cardio',    trainer: 'Arjun Mehta', time: 'Tue/Thu/Sat 8:00AM', cap: 20 },
  { id: 3, name: 'Power Lifting',  trainer: 'Rahul Shah',  time: 'Mon/Wed/Fri 10:00AM', cap: 10 },
  { id: 4, name: 'Zumba Dance',    trainer: 'Priya Patel', time: 'Tue/Sat 5:00PM', cap: 25 },
];

// ── Storage helpers ─────────────────────────────────────
function getData(key, def) {
  try { return JSON.parse(localStorage.getItem(key)) || def; }
  catch { return def; }
}
function saveData(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// Initialise defaults on first visit
if (!localStorage.getItem('fp_members'))  saveData('fp_members',  DEFAULT_MEMBERS);
if (!localStorage.getItem('fp_trainers')) saveData('fp_trainers', DEFAULT_TRAINERS);
if (!localStorage.getItem('fp_classes'))  saveData('fp_classes',  DEFAULT_CLASSES);
if (!localStorage.getItem('fp_messages')) saveData('fp_messages', []);

// ── Login / Logout ───────────────────────────────────────
function doLogin() {
  const u = document.getElementById('adminUser').value.trim();
  const p = document.getElementById('adminPass').value;
  if (u === 'admin' && p === 'fitplus123') {
    localStorage.setItem('fp_loggedin', '1');
    showDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

function doLogout() {
  localStorage.removeItem('fp_loggedin');
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminLogin').style.display    = 'flex';
}

function showDashboard() {
  document.getElementById('adminLogin').style.display    = 'none';
  document.getElementById('adminDashboard').style.display = 'block';
  renderAll();
}

// Auto-login if already logged in
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('fp_loggedin') === '1') showDashboard();
});

// ── Tabs ─────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    const tabs = ['members','trainers','classes','messages'];
    b.classList.toggle('active', tabs[i] === name);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'tab-' + name);
  });
}

// ── Render all ───────────────────────────────────────────
function renderAll() {
  renderStats();
  renderMembers();
  renderTrainers();
  renderClasses();
  renderMessages();
}

// ── Stats ────────────────────────────────────────────────
function renderStats() {
  const members  = getData('fp_members', []);
  const trainers = getData('fp_trainers', []);
  const classes  = getData('fp_classes', []);
  const messages = getData('fp_messages', []);
  const active   = members.filter(m => m.status === 'Active').length;

  const data = [
    { label: 'Total Members',   value: members.length,  sub: `${active} active`,     accent: true },
    { label: 'Active Members',  value: active,           sub: 'Currently enrolled' },
    { label: 'Trainers',        value: trainers.length,  sub: 'On staff' },
    { label: 'Classes',         value: classes.length,   sub: 'Weekly sessions' },
    { label: 'New Messages',    value: messages.length,  sub: 'From contact form' },
  ];

  document.getElementById('statsRow').innerHTML = data.map(d => `
    <div class="admin-stat-card ${d.accent ? 'accent' : ''}">
      <div class="asc-label">${d.label}</div>
      <div class="asc-value">${d.value}</div>
      <div class="asc-sub">${d.sub}</div>
    </div>
  `).join('');
}

// ── Members ──────────────────────────────────────────────
function renderMembers() {
  const members = getData('fp_members', []);
  document.getElementById('memberCount').textContent = members.length + ' total';
  document.getElementById('membersTable').innerHTML = members.map((m, i) => `
    <tr>
      <td style="color:var(--gray2)">${i + 1}</td>
      <td style="font-weight:500">${m.name}</td>
      <td style="color:var(--gray)">${m.phone}</td>
      <td><span class="badge badge-blue">${m.plan}</span></td>
      <td style="color:var(--gray)">${m.trainer}</td>
      <td><span class="badge ${m.status === 'Active' ? 'badge-green' : 'badge-red'}">${m.status}</span></td>
      <td style="color:var(--gray);font-size:0.8rem">${m.joined}</td>
      <td><button class="delete-btn" onclick="deleteMember(${m.id})">Remove</button></td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;color:var(--gray2);padding:32px">No members yet</td></tr>';
}

function addMember() {
  const name    = document.getElementById('mName').value.trim();
  const phone   = document.getElementById('mPhone').value.trim();
  const plan    = document.getElementById('mPlan').value;
  const trainer = document.getElementById('mTrainer').value;
  if (!name || !phone) { alert('Please enter name and phone'); return; }
  const members = getData('fp_members', []);
  const newM = {
    id: Date.now(), name, phone, plan, trainer,
    status: 'Active',
    joined: new Date().toISOString().split('T')[0],
  };
  members.push(newM);
  saveData('fp_members', members);
  document.getElementById('mName').value  = '';
  document.getElementById('mPhone').value = '';
  renderAll();
}

function deleteMember(id) {
  if (!confirm('Remove this member?')) return;
  const members = getData('fp_members', []).filter(m => m.id !== id);
  saveData('fp_members', members);
  renderAll();
}

// ── Trainers ─────────────────────────────────────────────
function renderTrainers() {
  const trainers = getData('fp_trainers', []);
  document.getElementById('trainersTable').innerHTML = trainers.map((t, i) => `
    <tr>
      <td style="color:var(--gray2)">${i + 1}</td>
      <td style="font-weight:500">${t.name}</td>
      <td style="color:var(--gray)">${t.spec}</td>
      <td style="color:var(--gray)">${t.phone}</td>
      <td><span class="badge badge-orange">${t.members}</span></td>
      <td><button class="delete-btn" onclick="deleteTrainer(${t.id})">Remove</button></td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--gray2);padding:32px">No trainers yet</td></tr>';
}

function addTrainer() {
  const name  = document.getElementById('tName').value.trim();
  const spec  = document.getElementById('tSpec').value.trim();
  const phone = document.getElementById('tPhone').value.trim();
  if (!name) { alert('Enter trainer name'); return; }
  const trainers = getData('fp_trainers', []);
  trainers.push({ id: Date.now(), name, spec: spec || 'General Fitness', phone: phone || '—', members: 0 });
  saveData('fp_trainers', trainers);
  document.getElementById('tName').value  = '';
  document.getElementById('tSpec').value  = '';
  document.getElementById('tPhone').value = '';
  renderAll();
}

function deleteTrainer(id) {
  if (!confirm('Remove this trainer?')) return;
  saveData('fp_trainers', getData('fp_trainers', []).filter(t => t.id !== id));
  renderAll();
}

// ── Classes ──────────────────────────────────────────────
function renderClasses() {
  const classes = getData('fp_classes', []);
  document.getElementById('classesTable').innerHTML = classes.map((c, i) => `
    <tr>
      <td style="color:var(--gray2)">${i + 1}</td>
      <td style="font-weight:500">${c.name}</td>
      <td style="color:var(--gray)">${c.trainer}</td>
      <td style="color:var(--gray);font-size:0.8rem">${c.time}</td>
      <td><span class="badge badge-blue">${c.cap}</span></td>
      <td><button class="delete-btn" onclick="deleteClass(${c.id})">Remove</button></td>
    </tr>
  `).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--gray2);padding:32px">No classes yet</td></tr>';
}

function addClass() {
  const name    = document.getElementById('cName').value.trim();
  const trainer = document.getElementById('cTrainer').value;
  const time    = document.getElementById('cTime').value.trim();
  const cap     = document.getElementById('cCap').value || 20;
  if (!name) { alert('Enter class name'); return; }
  const classes = getData('fp_classes', []);
  classes.push({ id: Date.now(), name, trainer, time: time || 'TBD', cap: Number(cap) });
  saveData('fp_classes', classes);
  document.getElementById('cName').value = '';
  document.getElementById('cTime').value = '';
  document.getElementById('cCap').value  = '';
  renderAll();
}

function deleteClass(id) {
  if (!confirm('Remove this class?')) return;
  saveData('fp_classes', getData('fp_classes', []).filter(c => c.id !== id));
  renderAll();
}

// ── Messages (from contact form via backend or localStorage) ──
function renderMessages() {
  // Try to fetch from Python backend; fallback to localStorage
  fetch('http://localhost:5001/api/messages')
    .then(r => r.json())
    .then(data => { displayMessages(data.messages || []); })
    .catch(() => {
      displayMessages(getData('fp_messages', []));
    });
}

function displayMessages(messages) {
  document.getElementById('messagesTable').innerHTML = messages.length
    ? messages.map((m, i) => `
      <tr>
        <td style="color:var(--gray2)">${i + 1}</td>
        <td style="font-weight:500">${m.name || '—'}</td>
        <td style="color:var(--gray)">${m.phone || '—'}</td>
        <td><span class="badge badge-orange">${m.interest || 'General'}</span></td>
        <td style="color:var(--gray);font-size:0.8rem;max-width:200px">${(m.message || '').slice(0, 60)}…</td>
        <td style="color:var(--gray2);font-size:0.75rem">${m.time || m.created_at || '—'}</td>
      </tr>
    `).join('')
    : '<tr><td colspan="6" style="text-align:center;color:var(--gray2);padding:32px">No messages yet</td></tr>';
}
