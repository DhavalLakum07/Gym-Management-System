# FitPlus Website

Admin: Lakum Dhaval | Phone: 9904755999

## Pages
- Home       → frontend/index.html
- About      → frontend/pages/about.html
- BMI        → frontend/pages/bmi.html
- Contact    → frontend/pages/contact.html
- Admin      → frontend/pages/admin.html

## How to Run

### Step 1 — Open the Website (Frontend only)
Just double-click `frontend/index.html` in VS Code or your browser.
The website works without the backend too!

### Step 2 — Run Python Backend (for contact form saving)

Open terminal in VS Code, go to backend folder:
```
cd backend
```

Install Python packages (only once):
```
pip3 install flask flask-cors
```

Start the backend:
```
python3 app.py
```

You will see:
```
FitPlus Backend Running!
Admin: Lakum Dhaval
URL:   http://localhost:5001
```

### Step 3 — Admin Login
Go to admin.html and login with:
- Username: admin
- Password: fitplus123

## File Structure
```
fitplus/
├── frontend/
│   ├── index.html        ← Home page
│   ├── css/style.css     ← All styles
│   ├── js/main.js        ← Navigation, clock
│   ├── js/admin.js       ← Admin dashboard logic
│   └── pages/
│       ├── about.html
│       ├── bmi.html
│       ├── contact.html
│       └── admin.html
└── backend/
    ├── app.py            ← Python Flask server
    └── requirements.txt
```
