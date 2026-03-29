// ── Demo accounts loaded on first visit ─────────────────────
const DEMO_USERS = [
  { name:'Arjun Mehta',  email:'arjun@email.com',   pass:'pass123', role:'member',  phone:'9810000001', plan:'Standard', bmi:22.4, att:24, days:47,  joined:'1 Oct 2024' },
  { name:'Sneha Gupta',  email:'sneha@email.com',   pass:'pass123', role:'member',  phone:'9810000002', plan:'Premium',  bmi:21.1, att:38, days:120, joined:'15 Nov 2024' },
  { name:'Rahul Shah',   email:'rahul@trainer.com', pass:'pass123', role:'trainer', phone:'9800000002', spec:'Strength & Powerlifting', exp:'8 years' },
  { name:'Priya Patel',  email:'priya@trainer.com', pass:'pass123', role:'trainer', phone:'9800000003', spec:'Yoga & Pilates',          exp:'6 years' },
];

function getUsers() {
  try { return JSON.parse(localStorage.getItem('fp_users')) || DEMO_USERS; }
  catch { return DEMO_USERS; }
}

function saveUsers(users) {
  localStorage.setItem('fp_users', JSON.stringify(users));
}

function saveSession(user) {
  localStorage.setItem('fp_session', JSON.stringify(user));
}

function getSession() {
  try { return JSON.parse(localStorage.getItem('fp_session')); }
  catch { return null; }
}

function clearSession() {
  localStorage.removeItem('fp_session');
}

// Initialise demo users if none exist
if (!localStorage.getItem('fp_users')) {
  saveUsers(DEMO_USERS);
}

// Redirect if not logged in (call on dashboard pages)
function requireAuth(role) {
  const u = getSession();
  if (!u) { window.location.href = 'login.html'; return null; }
  if (role && u.role !== role) { window.location.href = 'login.html'; return null; }
  return u;
}
