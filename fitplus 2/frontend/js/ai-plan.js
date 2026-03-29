// ── Diet preference state ─────────────────────────────────────
let dietPref = 'veg';

function setDiet(type) {
  dietPref = type;
  document.getElementById('btnVeg').classList.toggle('active',    type === 'veg');
  document.getElementById('btnNonveg').classList.toggle('active', type === 'nonveg');
}

// ── Workout Plans (same for veg/nonveg) ──────────────────────
const WORKOUT_PLANS = {
  fat_loss: {
    days: [
      { day:'Mon', ex:'HIIT Cardio 30min + Core Circuit (Plank, Crunches, Mountain Climbers)' },
      { day:'Tue', ex:'Upper Body Strength + 20min Cardio (high reps 15–20)' },
      { day:'Wed', ex:'Active Recovery — Yoga / 30min brisk walk' },
      { day:'Thu', ex:'Lower Body Strength + HIIT 20min (Squats, Lunges, Jump Rope)' },
      { day:'Fri', ex:'Full Body Circuit Training — 3 rounds, 45sec on / 15sec off' },
      { day:'Sat', ex:'Cardio — Run / Cycling / Swimming 45min' },
      { day:'Sun', ex:'Rest & Stretch — foam roll, light stretching only' },
    ],
    icon:'🔥', label:'Fat Loss Plan',
    tip:'Use high reps (15–20) with short rest (30–45 sec). Keep heart rate at 65–75% max. Track calories strictly. Cardio is a tool — strength training protects muscle while you cut.',
  },
  muscle_gain: {
    days: [
      { day:'Mon', ex:'Chest + Triceps — Bench Press, Incline Press, Dips, Pushdown' },
      { day:'Tue', ex:'Back + Biceps — Deadlift, Rows, Pull-ups, Barbell Curls' },
      { day:'Wed', ex:'Rest / Light Cardio 20min + Stretching' },
      { day:'Thu', ex:'Legs — Squats, Romanian Deadlift, Leg Press, Calf Raises' },
      { day:'Fri', ex:'Shoulders + Abs — OHP, Lateral Raises, Face Pulls, Core' },
      { day:'Sat', ex:'Arms + Weak Points — Curls, Tricep Extensions, Forearms' },
      { day:'Sun', ex:'Full Rest — Protein + 8 hrs sleep is the real workout' },
    ],
    icon:'💪', label:'Muscle Gain Plan',
    tip:'Low reps (6–10), heavy weight, long rest (90–120 sec). Progressive overload — add 2.5kg every week when you hit the top of your rep range. Eat in a 300 cal surplus.',
  },
  endurance: {
    days: [
      { day:'Mon', ex:'Long Run 5–8km at easy conversational pace (Zone 2)' },
      { day:'Tue', ex:'Cycling 45min + Core work — Plank, Dead Bug, Bird Dog' },
      { day:'Wed', ex:'Interval Training — 10×400m sprints with 90sec rest' },
      { day:'Thu', ex:'Swimming / Rowing / Cross-training 30min easy' },
      { day:'Fri', ex:'Tempo Run 20–30min at comfortably hard pace' },
      { day:'Sat', ex:'Long Cardio Session 60–90min — target heart rate 60–70%' },
      { day:'Sun', ex:'Active Recovery — Yoga / Foam Roll / Stretching' },
    ],
    icon:'🏃', label:'Endurance Plan',
    tip:'Build mileage max 10% per week to avoid injury. Focus on Zone 2 cardio for aerobic base. Cross-training prevents overuse injuries. Hydration is critical — 3L water/day.',
  },
  maintenance: {
    days: [
      { day:'Mon', ex:'Strength Training — Upper Body, 3 sets × 12 reps' },
      { day:'Tue', ex:'Cardio 30min (run/cycle) + Full body stretching 15min' },
      { day:'Wed', ex:'Yoga / Pilates 45min — mobility and flexibility focus' },
      { day:'Thu', ex:'Strength Training — Lower Body, 3 sets × 12 reps' },
      { day:'Fri', ex:'Sports / Activity of choice (badminton, football, swimming)' },
      { day:'Sat', ex:'Cardio + Core Circuit — 30min + 15min abs' },
      { day:'Sun', ex:'Rest & Meal Prep — set up your week for success' },
    ],
    icon:'⚖️', label:'Maintenance Plan',
    tip:'Variety keeps motivation high. 150 min moderate cardio + 2 strength sessions per week is the WHO recommendation. Track sleep (7–8 hrs) as much as workouts.',
  },
};

// ── Diet Plans — VEG ─────────────────────────────────────────
const DIET_VEG = {
  fat_loss: {
    meals: [
      { time:'7:00 AM',  food:'Oats with banana + Green tea or Black coffee (no sugar)' },
      { time:'10:00 AM', food:'Apple / Pear + 10 soaked almonds + 1 glass buttermilk' },
      { time:'1:00 PM',  food:'Moong dal 1 katori + Brown rice 100g + Salad + Curd' },
      { time:'4:00 PM',  food:'Roasted chana 30g + 1 cup green tea' },
      { time:'7:30 PM',  food:'Paneer 100g (grilled) + 2 roti (wheat) + Sabzi + Dal' },
      { time:'9:30 PM',  food:'Low-fat milk 200ml (warm) — skip if cutting hard' },
    ],
    macros: { protein:'30%', carbs:'40%', fat:'30%' },
  },
  muscle_gain: {
    meals: [
      { time:'7:00 AM',  food:'Oats 80g + Banana + Peanut butter 2 tbsp + Milk 300ml' },
      { time:'10:00 AM', food:'Whey protein shake (veg) + Mixed nuts 30g' },
      { time:'1:00 PM',  food:'Rice 200g + Rajma / Chhole 200g + Sabzi + Curd' },
      { time:'4:00 PM',  food:'Peanut butter toast 2 slices + Banana + Whey shake' },
      { time:'7:30 PM',  food:'Paneer 200g (grilled/bhurji) + Sweet potato + Salad' },
      { time:'10:00 PM', food:'Cottage cheese (paneer) 100g or casein protein — slow digesting' },
    ],
    macros: { protein:'40%', carbs:'40%', fat:'20%' },
  },
  endurance: {
    meals: [
      { time:'6:30 AM',  food:'Banana + Peanut butter toast — easy carbs before training' },
      { time:'9:30 AM',  food:'Oats + Mixed fruits + Honey + Almonds + Flaxseeds' },
      { time:'1:00 PM',  food:'Rice / Pasta + Paneer / Tofu + Mixed Vegetables' },
      { time:'4:00 PM',  food:'Coconut water / Sports drink + Dates 3–4 pieces' },
      { time:'7:00 PM',  food:'Quinoa + Dal + Steamed broccoli, carrots & beans' },
      { time:'9:00 PM',  food:'Low-fat milk 200ml + Banana (glycogen recovery)' },
    ],
    macros: { protein:'25%', carbs:'55%', fat:'20%' },
  },
  maintenance: {
    meals: [
      { time:'7:30 AM',  food:'Poha / Upma / Idli 2–3 pcs + Chai (low sugar)' },
      { time:'11:00 AM', food:'Seasonal fruit + Small handful of nuts' },
      { time:'1:30 PM',  food:'Dal + 2 Roti / Rice + Sabzi + Salad + Curd' },
      { time:'4:30 PM',  food:'Chai + Murmura / Roasted chana / Light snack' },
      { time:'7:30 PM',  food:'Paneer / Dal + Roti + Sabzi + Soup' },
      { time:'9:30 PM',  food:'Warm milk 200ml or fruit if hungry' },
    ],
    macros: { protein:'30%', carbs:'45%', fat:'25%' },
  },
};

// ── Diet Plans — NON-VEG ──────────────────────────────────────
const DIET_NONVEG = {
  fat_loss: {
    meals: [
      { time:'7:00 AM',  food:'3 boiled egg whites + 1 whole egg + Black coffee (no sugar)' },
      { time:'10:00 AM', food:'Apple + 10 almonds + 1 boiled egg (whole)' },
      { time:'1:00 PM',  food:'Grilled chicken 150g + Brown rice 100g + Salad + Lemon' },
      { time:'4:00 PM',  food:'Greek yogurt 150g + Cucumber / Carrot sticks' },
      { time:'7:30 PM',  food:'Grilled fish 150g / Chicken 150g + Steamed vegetables + Dal' },
      { time:'9:30 PM',  food:'1 cup warm milk (low fat) — optional' },
    ],
    macros: { protein:'35%', carbs:'35%', fat:'30%' },
  },
  muscle_gain: {
    meals: [
      { time:'7:00 AM',  food:'4 whole eggs scrambled + 2 slices whole wheat toast + Banana' },
      { time:'10:00 AM', food:'Whey protein shake + Handful of mixed nuts' },
      { time:'1:00 PM',  food:'Rice 200g + Chicken breast 200g + Sabzi + Dal' },
      { time:'4:00 PM',  food:'Peanut butter toast + Whey protein shake (pre/post workout)' },
      { time:'7:30 PM',  food:'Grilled mutton 200g / Chicken thighs + Sweet potato + Salad' },
      { time:'10:00 PM', food:'Egg whites 3 nos or casein protein — slow overnight recovery' },
    ],
    macros: { protein:'40%', carbs:'40%', fat:'20%' },
  },
  endurance: {
    meals: [
      { time:'6:30 AM',  food:'Banana + Peanut butter toast — easy carbs before training' },
      { time:'9:30 AM',  food:'Oats + Boiled eggs 2 + Mixed fruits + Honey' },
      { time:'1:00 PM',  food:'Rice / Pasta + Grilled chicken 150g + Vegetables' },
      { time:'4:00 PM',  food:'Coconut water + Energy bar / Boiled egg 1' },
      { time:'7:00 PM',  food:'Salmon / Rohu fish 150g + Quinoa + Steamed vegetables' },
      { time:'9:00 PM',  food:'Low-fat milk 200ml + Banana (glycogen replenishment)' },
    ],
    macros: { protein:'30%', carbs:'50%', fat:'20%' },
  },
  maintenance: {
    meals: [
      { time:'7:30 AM',  food:'2 eggs (any style) + Poha / Toast + Chai' },
      { time:'11:00 AM', food:'Seasonal fruit + Small handful of nuts' },
      { time:'1:30 PM',  food:'Dal / Chicken curry + Rice / 2 Roti + Salad + Curd' },
      { time:'4:30 PM',  food:'Chai + Boiled egg 1 or light snack' },
      { time:'7:30 PM',  food:'Grilled chicken / Fish 150g + Roti + Sabzi + Soup' },
      { time:'9:30 PM',  food:'Warm milk 200ml or fruit if hungry' },
    ],
    macros: { protein:'35%', carbs:'40%', fat:'25%' },
  },
};

// ── Supplements data ──────────────────────────────────────────
// Each supplement has: veg-safe flag, goal relevance, brand (our collab partner)
const SUPPLEMENTS = [
  {
    id: 'whey',
    icon: '🥛',
    name: 'Whey Protein',
    brand: 'MuscleBlaze',
    partnerTag: 'FitPlus Partner',
    vegSafe: false,  // non-veg (derived from milk whey — technically veg for many, but listed separately)
    vegVersion: true, // has veg variant
    vegVariantNote: 'Choose Whey Isolate (vegetarian-friendly)',
    desc: 'Fast-digesting protein that kickstarts muscle repair post-workout. 24g protein per scoop.',
    why: {
      fat_loss:    'Keeps you full longer and prevents muscle loss while in a calorie deficit.',
      muscle_gain: 'Essential for hitting your daily protein target (1.8–2.2g per kg bodyweight).',
      endurance:   'Speeds up muscle recovery between long training sessions.',
      maintenance: 'Easy way to top up protein if your meals fall short.',
    },
    dose: '1 scoop (30g) post-workout in water or milk',
    price: '₹1,799',
    per: '/ 1kg (33 servings)',
    recommended: ['muscle_gain', 'fat_loss'],
  },
  {
    id: 'creatine',
    icon: '⚡',
    name: 'Creatine Monohydrate',
    brand: 'Optimum Nutrition',
    partnerTag: 'FitPlus Partner',
    vegSafe: true,
    vegVersion: false,
    vegVariantNote: '',
    desc: '100% vegan. Most researched sports supplement ever. Increases strength & power output by 10–15%.',
    why: {
      fat_loss:    'Helps maintain strength during calorie deficit so you lose fat, not muscle.',
      muscle_gain: 'Boosts ATP (energy) in muscles — directly increases lifting capacity and size.',
      endurance:   'Improves high-intensity sprint intervals within longer sessions.',
      maintenance: 'Supports consistent performance without loading or cycling needed.',
    },
    dose: '3–5g daily with water. No loading needed.',
    price: '₹899',
    per: '/ 250g (50 servings)',
    recommended: ['muscle_gain', 'endurance'],
  },
  {
    id: 'oats',
    icon: '🌾',
    name: 'Rolled Oats',
    brand: 'Saffola FITTIFY',
    partnerTag: 'FitPlus Partner',
    vegSafe: true,
    vegVersion: false,
    vegVariantNote: '',
    desc: '100% whole grain. Slow-release carbs that fuel your workout for 2–3 hours. High in beta-glucan fibre.',
    why: {
      fat_loss:    'Low GI keeps blood sugar stable, reduces cravings, and keeps you full till lunch.',
      muscle_gain: 'Perfect pre-workout carb source — fuels your lifts without spiking insulin.',
      endurance:   'Ideal morning fuel for long cardio sessions. High carb, easy to digest.',
      maintenance: 'A daily nutritional staple. Cheap, clean, and incredibly versatile.',
    },
    dose: '80–100g (dry weight) for breakfast or pre-workout',
    price: '₹299',
    per: '/ 1kg (10 servings)',
    recommended: ['endurance', 'fat_loss', 'maintenance'],
  },
  {
    id: 'peanutbutter',
    icon: '🥜',
    name: 'Peanut Butter',
    brand: 'MyFitness',
    partnerTag: 'FitPlus Partner',
    vegSafe: true,
    vegVersion: false,
    vegVariantNote: '',
    desc: 'Natural, no added sugar. 25g protein per 100g. Healthy fats for hormone production and joint health.',
    why: {
      fat_loss:    'Healthy fats keep you satiated. 1–2 tbsp controls hunger between meals.',
      muscle_gain: 'Calorie-dense superfood. Easy to add 200+ kcal to hit your bulk surplus.',
      endurance:   'Great pre-run fuel — slow energy release. Mix into oats or smoothies.',
      maintenance: 'Nutritious everyday snack. On toast, with fruit, or in protein shakes.',
    },
    dose: '2 tablespoons (32g) per serving — morning or pre-workout',
    price: '₹349',
    per: '/ 500g (15 servings)',
    recommended: ['muscle_gain', 'endurance'],
  },
  {
    id: 'multivitamin',
    icon: '💊',
    name: 'Multivitamin',
    brand: 'HealthKart HK Vitals',
    partnerTag: 'FitPlus Partner',
    vegSafe: true,
    vegVersion: false,
    vegVariantNote: '',
    desc: '100% vegan. Fills micronutrient gaps in your diet — Vitamin D3, B12, Zinc, Magnesium and more.',
    why: {
      fat_loss:    'Micronutrient deficiencies slow metabolism. This plugs the gaps when eating less.',
      muscle_gain: 'Supports testosterone, recovery, and immune function during heavy training.',
      endurance:   'Iron, B12, and magnesium are especially critical for endurance athletes.',
      maintenance: 'Daily insurance for a healthy, functioning body year-round.',
    },
    dose: '1 tablet daily after breakfast',
    price: '₹449',
    per: '/ 60 tablets (2 months)',
    recommended: ['maintenance', 'endurance'],
  },
  {
    id: 'omega3',
    icon: '🐟',
    name: 'Omega-3 Fish Oil',
    brand: 'WOW Life Science',
    partnerTag: 'FitPlus Partner',
    vegSafe: false,
    vegVersion: true,
    vegVariantNote: 'Veg option: Algae-based Omega-3 (same EPA/DHA, 100% plant)',
    desc: '1000mg EPA + DHA per capsule. Reduces inflammation, protects joints, and improves heart health.',
    why: {
      fat_loss:    'Reduces cortisol (stress hormone) which causes belly fat storage. Improves insulin sensitivity.',
      muscle_gain: 'Reduces DOMS (muscle soreness) so you recover faster between sessions.',
      endurance:   'Anti-inflammatory — critical for high-volume cardio athletes to protect joints.',
      maintenance: 'One of the most evidence-backed supplements for long-term heart and brain health.',
    },
    dose: '1–2 capsules (1000mg each) with meals',
    price: '₹599',
    per: '/ 60 capsules (1–2 months)',
    recommended: ['fat_loss', 'endurance'],
  },
];

// ── Calorie Calculator ────────────────────────────────────────
function calcCalories(weight, height, age, gender, activity, goal) {
  let bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;
  const mult = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725 };
  let tdee = bmr * (mult[activity] || 1.55);
  if (goal === 'fat_loss')    tdee -= 400;
  if (goal === 'muscle_gain') tdee += 300;
  return Math.round(tdee);
}

// ── Main generator ────────────────────────────────────────────
function generatePlan() {
  const w    = parseFloat(document.getElementById('aiWeight').value);
  const h    = parseFloat(document.getElementById('aiHeight').value);
  const a    = parseFloat(document.getElementById('aiAge').value);
  const g    = document.getElementById('aiGender').value;
  const act  = document.getElementById('aiActivity').value;
  const goal = document.getElementById('aiGoal').value;

  if (!w || !h || !a) { alert('Please enter your weight, height and age first.'); return; }

  const cal  = calcCalories(w, h, a, g, act, goal);
  const bmi  = (w / ((h / 100) ** 2)).toFixed(1);
  const wp   = WORKOUT_PLANS[goal];
  const dp   = (dietPref === 'veg' ? DIET_VEG : DIET_NONVEG)[goal];

  let bmiCat, bmiColor;
  if      (bmi < 18.5) { bmiCat = 'Underweight'; bmiColor = '#3b82f6'; }
  else if (bmi < 25)   { bmiCat = 'Normal';       bmiColor = '#22c55e'; }
  else if (bmi < 30)   { bmiCat = 'Overweight';   bmiColor = '#f59e0b'; }
  else                 { bmiCat = 'Obese';         bmiColor = '#ef4444'; }

  const dietLabel = dietPref === 'veg' ? '🥦 Vegetarian' : '🍗 Non-Vegetarian';

  // Summary
  document.getElementById('planSummary').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;">
      <div>
        <div style="font-size:.72rem;color:var(--orange);text-transform:uppercase;letter-spacing:.1em;margin-bottom:5px">Your personalised plan</div>
        <div style="font-family:var(--font-display);font-size:1.6rem;letter-spacing:1px;">${wp.icon} ${wp.label}</div>
        <div style="font-size:.84rem;color:var(--gray);margin-top:5px">
          BMI: <strong style="color:${bmiColor}">${bmi} (${bmiCat})</strong> &nbsp;·&nbsp;
          Target: <strong style="color:var(--orange)">${cal} kcal/day</strong>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <span style="background:rgba(255,107,43,.12);color:var(--orange);padding:3px 10px;border-radius:99px;font-size:.65rem;font-weight:700;text-transform:uppercase;">Goal: ${goal.replace('_',' ')}</span>
        <span style="background:rgba(59,130,246,.12);color:#3b82f6;padding:3px 10px;border-radius:99px;font-size:.65rem;font-weight:700;">${cal} kcal</span>
        <span style="background:${dietPref==='veg'?'rgba(34,197,94,.12)':'rgba(239,68,68,.12)'};color:${dietPref==='veg'?'#22c55e':'#ef4444'};padding:3px 10px;border-radius:99px;font-size:.65rem;font-weight:700;">${dietLabel}</span>
      </div>
    </div>
  `;

  // Workout box
  document.getElementById('workoutBox').innerHTML = `
    <h4>🏋️ WEEKLY WORKOUT</h4>
    ${wp.days.map(d => `
      <div class="day-row">
        <span class="day-label">${d.day}</span>
        <span class="day-ex">${d.ex}</span>
      </div>`).join('')}
  `;

  // Diet box
  document.getElementById('dietBox').innerHTML = `
    <h4>
      ${dietPref === 'veg' ? '🥦' : '🍗'} 
      ${dietPref === 'veg' ? 'VEG' : 'NON-VEG'} MEAL PLAN
    </h4>
    ${dp.meals.map(m => `
      <div class="meal-row">
        <span class="meal-time">${m.time}</span>
        <span class="meal-food">${m.food}</span>
      </div>`).join('')}
    <div class="macros-row">
      <div class="macro-chip"><div class="macro-val" style="color:#3b82f6">${dp.macros.protein}</div><div class="macro-lbl">Protein</div></div>
      <div class="macro-chip"><div class="macro-val" style="color:#f59e0b">${dp.macros.carbs}</div><div class="macro-lbl">Carbs</div></div>
      <div class="macro-chip"><div class="macro-val" style="color:#22c55e">${dp.macros.fat}</div><div class="macro-lbl">Fats</div></div>
    </div>
  `;

  document.getElementById('aiTip').innerHTML = `<strong>💡 Trainer Tip:</strong> ${wp.tip}`;

  // Supplements
  renderSupplements(goal);

  document.getElementById('planResult').style.display = 'block';
  document.getElementById('planResult').scrollIntoView({ behavior:'smooth', block:'nearest' });
}

// ── Render supplement cards ───────────────────────────────────
function renderSupplements(goal) {
  const isVeg = dietPref === 'veg';

  // Filter: show all but mark veg-unsafe ones differently
  const cards = SUPPLEMENTS.map(s => {
    const isRecommended = s.recommended.includes(goal);
    const whyText = s.why[goal];

    // For veg users: if supplement is non-veg and has veg version, show the veg version note
    // If no veg version exists, still show but label clearly
    let vegBadge = '';
    if (s.vegSafe) {
      vegBadge = `<span class="supp-veg-badge badge-veg">🥦 Vegetarian Safe</span>`;
    } else if (s.vegVersion) {
      vegBadge = `<span class="supp-veg-badge badge-both">${isVeg ? '🥦 Veg Version Available' : '🍗 Non-Veg / Veg option available'}</span>`;
    } else {
      vegBadge = `<span class="supp-veg-badge badge-nonveg">🍗 Non-Vegetarian</span>`;
    }

    // Hide purely non-veg supplements for veg users with no alternative
    if (isVeg && !s.vegSafe && !s.vegVersion) {
      return ''; // skip completely
    }

    const vegNote = isVeg && !s.vegSafe && s.vegVersion
      ? `<div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:7px;padding:7px 10px;font-size:.75rem;color:#22c55e;margin-bottom:10px;">🌿 ${s.vegVariantNote}</div>`
      : '';

    return `
      <div class="supp-card ${isRecommended ? 'recommended' : ''}">
        ${isRecommended ? '<div class="supp-rec-tag">Recommended</div>' : ''}
        <div class="supp-icon">${s.icon}</div>
        <div class="supp-name">${s.name}</div>
        <div class="supp-brand">
          <span class="partner-dot"></span>
          ${s.brand} &nbsp;·&nbsp;
          <span class="collab-tag" style="padding:1px 8px;font-size:.6rem;">${s.partnerTag}</span>
        </div>
        ${vegBadge}
        <div class="supp-desc">${s.desc}</div>
        ${vegNote}
        <div class="supp-why"><strong>Why for your goal:</strong> ${whyText}</div>
        <div class="supp-dose">📋 Dosage: ${s.dose}</div>
        <div class="supp-price">${s.price} <span>${s.per}</span></div>
      </div>
    `;
  }).join('');

  document.getElementById('suppSection').innerHTML = `
    <div class="supp-heading">
      💊 RECOMMENDED SUPPLEMENTS
      <span class="collab-tag">FitPlus Collaborations</span>
    </div>
    <p class="supp-sub">
      These products are selected by our trainers and available through our partner brands at member-exclusive prices.
      ${isVeg ? '🥦 Showing <strong>vegetarian-friendly</strong> options for your preference.' : '🍗 Showing <strong>all supplements</strong> for non-vegetarian diet.'}
    </p>
    <div class="supp-grid">${cards}</div>
    <div class="note-box">
      <strong>⚕️ Disclaimer:</strong> Supplements are optional additions to a complete diet — they are not replacements for real food. 
      Consult your doctor before starting any supplement, especially if you have a medical condition. 
      Results vary per individual. FitPlus earns a small commission from our partner brands which helps keep member fees low.
    </div>
  `;
}
