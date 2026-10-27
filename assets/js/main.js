/*!
 * CampusConnect — shared logic  (assets/js/main.js)
 * Load in <head> RIGHT AFTER the Tailwind CDN script so the theme below is applied.
 */
(function () {
  'use strict';

  const isLoginPage = /(?:^|\/)login\.html$/.test(window.location.pathname);
  let isLoggedIn = false;
  try {
    isLoggedIn = window.localStorage.getItem('isLoggedIn') === 'true';
  } catch (error) {
    console.error('Unable to read the demo login state from local storage.', error);
  }

  if (isLoginPage ? isLoggedIn : !isLoggedIn) {
    window.location.replace(isLoginPage ? 'index.html' : 'login.html');
    return;
  }

  function startDemoSession() {
    try {
      window.localStorage.setItem('isLoggedIn', 'true');
      window.location.replace('index.html');
    } catch (error) {
      console.error('Unable to save the demo login state to local storage.', error);
      const message = document.getElementById('login-message');
      if (message) {
        message.textContent = 'Your browser could not save this demo session. Enable local storage and try again.';
        message.classList.remove('hidden');
      }
    }
  }

  /* =====================================================
     1. TAILWIND THEME  (warm neutrals + LPU-style orange)
  ===================================================== */
  if (window.tailwind) {
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { 50: '#FFF4EC', 100: '#FFE5D1', 200: '#FFC9A3', 300: '#FFA66B', 400: '#FF8238', 500: '#F26B1D', 600: '#D9540F', 700: '#B3410E', 800: '#8F3412', 900: '#752D12' },
            sand: { 50: '#FBF9F6', 100: '#F5F1EA', 200: '#EAE3D6', 300: '#D9CFBC', 400: '#B8AB92', 500: '#8F8370', 600: '#6E6455', 700: '#4F473C', 800: '#342F27', 900: '#1F1C17' }
          },
          fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            display: ['Fraunces', 'Georgia', 'serif']
          },
          boxShadow: {
            soft: '0 1px 2px rgba(31,28,23,.04), 0 10px 30px -12px rgba(31,28,23,.12)',
            lift: '0 2px 4px rgba(31,28,23,.05), 0 14px 28px -12px rgba(242,107,29,.55)'
          }
        }
      }
    };
  }

  /* =====================================================
     2. SHARED CSS (design system)
  ===================================================== */
  const css = `
  *{-webkit-tap-highlight-color:transparent}
  html{scroll-behavior:smooth}
  body{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#1F1C17;background-color:#FBF9F6;
    background-image:radial-gradient(900px 520px at 90% -8%,rgba(242,107,29,.13),transparent 60%),radial-gradient(700px 420px at -10% 8%,rgba(255,166,107,.16),transparent 60%);
    background-attachment:fixed;-webkit-font-smoothing:antialiased}
  .font-display{font-family:Fraunces,Georgia,serif;letter-spacing:-.02em}
  .tabular{font-variant-numeric:tabular-nums}
  .no-scrollbar{scrollbar-width:none}.no-scrollbar::-webkit-scrollbar{display:none}
  .glass{background:rgba(255,255,255,.72);-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%)}
  .glass-dark{background:rgba(31,28,23,.9);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);color:#fff}
  .card{background:#fff;border:1px solid #EAE3D6;border-radius:1.25rem;box-shadow:0 1px 2px rgba(31,28,23,.04),0 10px 30px -12px rgba(31,28,23,.12)}
  .card-hover{transition:transform .25s ease,box-shadow .25s ease,border-color .25s}
  .card-hover:hover{transform:translateY(-3px);border-color:#FFC9A3;box-shadow:0 2px 4px rgba(31,28,23,.05),0 22px 40px -18px rgba(242,107,29,.4)}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;font-weight:600;font-size:.875rem;line-height:1.1;padding:.8rem 1.15rem;border-radius:.9rem;transition:all .2s ease;cursor:pointer;border:1px solid transparent;text-align:center}
  .btn:active{transform:scale(.97)}.btn:disabled{opacity:.5;cursor:not-allowed}
  .btn-primary{background:#F26B1D;color:#fff;box-shadow:0 8px 20px -8px rgba(242,107,29,.7)}.btn-primary:hover{background:#D9540F}
  .btn-dark{background:#1F1C17;color:#fff}.btn-dark:hover{background:#342F27}
  .btn-ghost{background:#fff;color:#342F27;border-color:#EAE3D6}.btn-ghost:hover{background:#F5F1EA}
  .btn-wa{background:#25D366;color:#053d1c}.btn-wa:hover{background:#1fbd5a}
  .btn-danger{background:#E11D48;color:#fff}.btn-danger:hover{background:#BE123C}
  .input{width:100%;background:#fff;border:1px solid #D9CFBC;border-radius:.85rem;padding:.75rem .9rem;font-size:.9rem;color:#1F1C17;outline:none;transition:border-color .2s,box-shadow .2s}
  .input:focus{border-color:#F26B1D;box-shadow:0 0 0 4px rgba(242,107,29,.15)}
  .label{display:block;font-size:.75rem;font-weight:600;color:#6E6455;margin-bottom:.4rem;letter-spacing:.02em}
  .chip{display:inline-flex;align-items:center;gap:.4rem;padding:.5rem .9rem;border-radius:999px;font-size:.82rem;font-weight:600;color:#4F473C;background:#fff;border:1px solid #EAE3D6;cursor:pointer;transition:all .2s;white-space:nowrap}
  .chip:hover{border-color:#FFA66B}.chip.active{background:#1F1C17;color:#fff;border-color:#1F1C17}
  .chip.brand.active{background:#F26B1D;border-color:#F26B1D}
  .badge{display:inline-flex;align-items:center;gap:.4rem;padding:.25rem .6rem;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap}
  .dot{display:inline-block;width:.45rem;height:.45rem;border-radius:99px}
  .badge-low{background:#ECFDF5;color:#047857}.badge-low .dot{background:#10B981}
  .badge-moderate{background:#FFFBEB;color:#B45309}.badge-moderate .dot{background:#F59E0B}
  .badge-high{background:#FFF1F2;color:#BE123C}.badge-high .dot{background:#F43F5E;animation:ccpulse 1.3s infinite}
  .badge-closed{background:#F5F1EA;color:#6E6455}.badge-closed .dot{background:#B8AB92}
  .tabs{display:inline-flex;gap:.25rem;padding:.25rem;background:#F5F1EA;border-radius:1rem;border:1px solid #EAE3D6}
  .tab{padding:.6rem 1.1rem;border-radius:.8rem;font-size:.85rem;font-weight:600;color:#6E6455;transition:all .2s}
  .tab.active{background:#fff;color:#1F1C17;box-shadow:0 2px 8px rgba(31,28,23,.1)}
  .progress{height:.5rem;border-radius:99px;background:#F5F1EA;overflow:hidden}
  .progress>i{display:block;height:100%;border-radius:99px;transition:width .6s ease,background .3s}
  .step{width:1.75rem;height:1.75rem;border-radius:99px;display:grid;place-items:center;font-size:.72rem;font-weight:700;background:#F5F1EA;color:#B8AB92;border:2px solid #EAE3D6;transition:all .3s}
  .step.done{background:#F26B1D;border-color:#F26B1D;color:#fff}.step.current{box-shadow:0 0 0 5px rgba(242,107,29,.18)}
  .sline{flex:1;height:2px;margin:calc(.875rem - 1px) .1rem 0;background:#EAE3D6;border-radius:2px;transition:background .3s}.sline.done{background:#F26B1D}
  .modal{position:fixed;inset:0;z-index:70;display:none;align-items:flex-end;justify-content:center}
  .modal.open{display:flex}
  .modal-backdrop{position:absolute;inset:0;background:rgba(31,28,23,.5);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);animation:ccfade .25s}
  .modal-panel{position:relative;width:100%;max-width:30rem;max-height:92vh;overflow:auto;background:#fff;border-radius:1.5rem 1.5rem 0 0;padding:1.5rem;animation:ccsheet .32s cubic-bezier(.2,.9,.3,1);box-shadow:0 -20px 60px -20px rgba(0,0,0,.35)}
  @media(min-width:640px){.modal{align-items:center;padding:1rem}.modal-panel{border-radius:1.5rem}}
  .toast{pointer-events:auto;background:#1F1C17;color:#fff;padding:.7rem 1rem;border-radius:.9rem;font-size:.85rem;font-weight:500;display:flex;gap:.55rem;align-items:center;max-width:26rem;box-shadow:0 12px 30px -10px rgba(0,0,0,.45);animation:cctoast .35s cubic-bezier(.2,.9,.3,1.2);transition:opacity .3s,transform .3s}
  .toast.out{opacity:0;transform:translateY(-8px)}
  .reveal{opacity:0;transform:translateY(14px);transition:opacity .6s ease,transform .6s ease}.reveal.in{opacity:1;transform:none}
  #cc-sos{animation:ccsos 2s infinite}
  body[data-page=food] #cc-sos{bottom:8.6rem}
  @media(min-width:1024px){body[data-page=food] #cc-sos{bottom:1.5rem}}
  .safe-b{padding-bottom:env(safe-area-inset-bottom)}
  @keyframes ccpulse{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes ccfade{from{opacity:0}to{opacity:1}}
  @keyframes ccsheet{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
  @keyframes cctoast{from{transform:translateY(-14px) scale(.96);opacity:0}to{transform:none;opacity:1}}
  @keyframes ccsos{0%{box-shadow:0 0 0 0 rgba(225,29,72,.55)}100%{box-shadow:0 0 0 20px rgba(225,29,72,0)}}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.reveal{opacity:1;transform:none}}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* =====================================================
     3. HELPERS
  ===================================================== */
  const CC = (window.CC = {});
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  Object.assign(CC, { $, $$ });

  CC.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  CC.pad = n => String(n).padStart(2, '0');
  CC.clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  CC.uid = (p, n = 4) => p + Math.floor(Math.random() * Math.pow(10, n)).toString().padStart(n, '0');
  CC.onReady = fn => (document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn());
  CC.every = (fn, ms) => { fn(); return setInterval(fn, ms); };

  CC.store = {
    get(k, d) { try { const v = localStorage.getItem('cc_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('cc_' + k, JSON.stringify(v)); } catch (e) { /* storage full / private mode */ } }
  };

  /* Clock (supports a demo offset so presentations always look alive) */
  CC.time = {
    now() { return new Date(Date.now() + CC.store.get('offset', 0)); },
    isDemo() { return CC.store.get('offset', 0) !== 0; },
    setDemo(on) {
      if (on) { const t = new Date(); t.setHours(10, 7, 30, 0); CC.store.set('offset', t.getTime() - Date.now()); }
      else CC.store.set('offset', 0);
    }
  };
  CC.nowMin = d => { d = d || CC.time.now(); return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60; };
  CC.fmtClock = d => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
  CC.minToStr = m => { m = ((Math.round(m) % 1440) + 1440) % 1440; const h = Math.floor(m / 60); return `${h % 12 || 12}:${CC.pad(m % 60)} ${h >= 12 ? 'PM' : 'AM'}`; };
  CC.fmtCountdown = s => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60; return h > 0 ? `${h}h ${CC.pad(m)}m` : `${CC.pad(m)}:${CC.pad(x)}`; };
  CC.timeAgo = ts => { const s = (Date.now() - ts) / 1000; if (s < 60) return 'Just now'; if (s < 3600) return Math.floor(s / 60) + ' min ago'; if (s < 86400) return Math.floor(s / 3600) + ' h ago'; return Math.floor(s / 86400) + ' d ago'; };
  CC.wa = (num, text) => 'https://wa.me/' + (num || '') + '?text=' + encodeURIComponent(text);

  /* Rush levels */
  CC.rush = pct => (pct >= 80 ? 'high' : pct >= 50 ? 'moderate' : 'low');
  CC.rushLabel = { low: 'Low', moderate: 'Moderate', high: 'High' };
  CC.rushColor = { low: '#10B981', moderate: '#F59E0B', high: '#F43F5E' };
  CC.rushBadge = (lvl, suffix = '') => `<span class="badge badge-${lvl}"><i class="dot"></i>${CC.rushLabel[lvl]}${suffix}</span>`;

  /* Stepper (used by tickets, orders, outpass) */
  CC.stepper = (steps, idx) => `<div class="flex items-start">${steps.map((s, i) => {
    const last = i === steps.length - 1;
    return `<div class="flex flex-col items-center w-[4.5rem] shrink-0 text-center gap-1.5">
      <span class="step ${i <= idx ? 'done' : ''} ${i === idx && !last ? 'current' : ''}">${i < idx || (i === idx && last) ? '✓' : i + 1}</span>
      <span class="text-[10px] leading-tight font-semibold ${i <= idx ? 'text-sand-800' : 'text-sand-400'}">${s}</span></div>
      ${last ? '' : `<span class="sline ${i < idx ? 'done' : ''}"></span>`}`;
  }).join('')}</div>`;

  /* Toasts */
  CC.toast = (msg, type = 'success') => {
    const box = $('#cc-toasts'); if (!box) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span>${{ success: '✅', error: '⚠️', info: '💡' }[type] || '💡'}</span><span>${CC.esc(msg)}</span>`;
    box.appendChild(el);
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 3300);
  };

  /* Modals: <div class="modal" id="x"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">…</div></div> */
  CC.modal = {
    open(id) {
      const m = document.getElementById(id); if (!m) return;
      m.classList.add('open'); document.body.classList.add('overflow-hidden');
      m.dispatchEvent(new CustomEvent('modal:open'));
    },
    close(id) {
      const m = document.getElementById(id); if (!m || !m.classList.contains('open')) return;
      m.classList.remove('open');
      if (!$('.modal.open')) document.body.classList.remove('overflow-hidden');
      m.dispatchEvent(new CustomEvent('modal:close'));
    },
    closeAll() { $$('.modal.open').forEach(m => CC.modal.close(m.id)); }
  };

  /* Scroll reveal */
  CC.reveal = () => {
    const els = $$('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
    els.forEach(e => io.observe(e));
  };

  /* =====================================================
     4. SAMPLE DATA  (swap with API calls when you add a backend)
  ===================================================== */
  CC.config = {
    // TODO: replace with real numbers (country code, no '+')
    contacts: {
      security: { name: 'Security Control Room', role: '24×7 gate & campus security', emoji: '🛡️', wa: '919999900002', tel: '+919999900002' },
      warden: { name: 'Hostel Warden Office', role: 'Hostel emergencies & late-night help', emoji: '🏠', wa: '919999900001', tel: '+919999900001' },
      medical: { name: 'Campus Medical Centre', role: 'First aid & ambulance coordination', emoji: '🩺', wa: '919999900003', tel: '+919999900003' }
    }
  };

  const H = 3600e3;
  CC.data = {
    floors: [
      { id: 'g', prefix: 'G', name: 'Ground Floor', zone: 'Reading Hall', total: 60, occupied: 34 },
      { id: 'f', prefix: 'F', name: 'First Floor', zone: 'Silent Study Zone', total: 80, occupied: 71 },
      { id: 's', prefix: 'S', name: 'Second Floor', zone: 'Group Discussion', total: 48, occupied: 12 },
      { id: 'd', prefix: 'D', name: 'Digital Library', zone: 'Computer Lab', total: 40, occupied: 26 }
    ],
    shuttle: [
      { id: 'loop', name: 'Hostel Loop', color: '#F26B1D', start: '07:00', end: '21:00', every: 15,
        stops: [{ n: 'Boys Hostels', t: 0 }, { n: 'Central Library', t: 4 }, { n: 'Academic Block', t: 8 }, { n: 'Girls Hostels', t: 12 }, { n: 'Main Gate', t: 15 }] },
      { id: 'gate', name: 'Gate Express', color: '#0EA5E9', start: '07:30', end: '20:30', every: 20,
        stops: [{ n: 'Main Gate', t: 0 }, { n: 'Uni Mall', t: 5 }, { n: 'Block 34', t: 9 }, { n: 'Block 32', t: 13 }] },
      { id: 'city', name: 'City Link', color: '#10B981', start: '08:00', end: '19:00', every: 60,
        stops: [{ n: 'Main Gate', t: 0 }, { n: 'Phagwara Bus Stand', t: 22 }, { n: 'Phagwara Railway Stn', t: 32 }] }
    ],
    canteens: [
      { id: 'main', name: 'Main Canteen', emoji: '🍛', desc: 'North & South Indian meals', hours: '7 AM – 10 PM', open: 420, close: 1320, base: 62, phase: 0 },
      { id: 'cafe', name: 'Café Hub', emoji: '☕', desc: 'Coffee, burgers & desserts', hours: '9 AM – 11 PM', open: 540, close: 1380, base: 45, phase: 2 },
      { id: 'night', name: 'Night Canteen', emoji: '🌙', desc: 'Late-night snacks & chai', hours: '6 PM – 3 AM', open: 1080, close: 1620, base: 52, phase: 4 }
    ],
    notices: [
      { id: 1, tag: 'Urgent', pinned: true, ts: Date.now() - 1 * H, from: 'Hostel Warden Office', title: 'Water supply paused 2–4 PM today', body: 'Water supply in Boys Hostel Block 3 will be paused from 2 PM to 4 PM for tank cleaning. Please store water in advance. Maintenance team will update here once supply is restored.' },
      { id: 2, tag: 'Urgent', pinned: true, ts: Date.now() - 3 * H, from: 'Transport Cell', title: 'City Link shuttle delayed by 20 minutes', body: 'Due to road work near the main gate, the City Link shuttle will run approximately 20 minutes late today. Hostel Loop and Gate Express are unaffected.' },
      { id: 3, tag: 'Exam', pinned: false, ts: Date.now() - 6 * H, from: 'Examination Cell', title: 'Mid-term datesheet released', body: 'The mid-term examination datesheet for all programmes is now live on the student portal. Report any clash to your academic coordinator within 48 hours.' },
      { id: 4, tag: 'Exam', pinned: false, ts: Date.now() - 20 * H, from: 'Central Library', title: 'Library open till 11 PM during exams', body: 'The Silent Study Zone on the First Floor will stay open till 11 PM from next Monday. Seat booking is recommended — slots fill quickly after 6 PM.' },
      { id: 5, tag: 'Event', pinned: false, ts: Date.now() - 28 * H, from: 'School of Computer Application', title: 'WebSprint-2026 showcase — report 30 min early', body: 'All finalist teams must report 30 minutes before their slot with the prototype running on a laptop and a backup on a pen drive. Good luck, Team Ocean!' },
      { id: 6, tag: 'Event', pinned: false, ts: Date.now() - 50 * H, from: 'Student Affairs', title: 'Cultural fest volunteer registrations open', body: 'Want to be part of the cultural fest crew? Register at the Student Affairs desk or through the online form. Duty leave is available for selected volunteers.' },
      { id: 7, tag: 'Holiday', pinned: false, ts: Date.now() - 30 * H, from: 'Registrar Office', title: 'Campus closed on Friday', body: 'Classes and labs remain closed on Friday on account of a gazetted holiday. The library will stay open 9 AM – 5 PM. Mess services continue as usual.' },
      { id: 8, tag: 'Hostel', pinned: false, ts: Date.now() - 12 * H, from: 'Chief Warden', title: 'Hostel gate timing & late-entry rule', body: 'Hostel gates close at 10:00 PM. Late entry is allowed only with an approved outpass. Apply for your outpass at least 2 hours before departure to avoid delays.' }
    ]
  };

  /* Shuttle logic (shared by dashboard + shuttle page) */
  CC.shuttleInfo = (route, now) => {
    now = now || CC.time.now();
    const toM = s => { const p = s.split(':').map(Number); return p[0] * 60 + p[1]; };
    const deps = [];
    for (let m = toM(route.start); m <= toM(route.end); m += route.every) deps.push(m);
    const ride = route.stops[route.stops.length - 1].t;
    const nowM = CC.nowMin(now);
    let idx = deps.findIndex(d => d > nowM);
    const tomorrow = idx === -1;
    if (tomorrow) idx = 0;
    const nextM = deps[idx];
    const secsLeft = Math.max(0, Math.round(((tomorrow ? nextM + 1440 : nextM) - nowM) * 60));
    const prevM = tomorrow ? deps[deps.length - 1] : (idx > 0 ? deps[idx - 1] : null);
    const since = prevM === null ? null : nowM - prevM;
    const gap = prevM === null || tomorrow ? null : nextM - prevM;
    return {
      deps, idx, nextM, tomorrow, secsLeft, prevM, ride, nowM,
      progress: gap ? CC.clamp(since / gap, 0, 1) : 0,
      transit: since !== null && since >= 0 && since <= ride ? since / ride : null
    };
  };

  /* Library logic */
  CC.library = {
    occupied(f, now) {
      const idx = CC.data.floors.indexOf(f);
      const t = CC.nowMin(now || CC.time.now());
      return CC.clamp(Math.round(f.occupied + f.total * 0.05 * Math.sin(t / 4 + idx * 1.7)), 0, f.total);
    },
    booking() {
      const b = CC.store.get('seatBooking', null); if (!b) return null;
      const n = Date.now();
      if (b.end <= n || (!b.checkedIn && n > b.start + 15 * 60e3)) { CC.store.set('seatBooking', null); return null; }
      return b;
    },
    summary() {
      let total = 0, occ = 0;
      CC.data.floors.forEach(f => { total += f.total; occ += this.occupied(f); });
      if (this.booking()) occ += 1;
      return { total, free: total - occ, pct: Math.round((occ / total) * 100) };
    }
  };

  /* Food logic */
  CC.food = {
    isOpen(c) { const m = Math.floor(CC.nowMin()); return (m >= c.open && m < c.close) || (m + 1440 >= c.open && m + 1440 < c.close); },
    state(c) {
      const open = this.isOpen(c), t = CC.nowMin();
      const pct = open ? CC.clamp(Math.round(c.base + 28 * Math.sin(t / 6 + c.phase)), 6, 98) : 0;
      return { open, pct, level: CC.rush(pct), wait: Math.max(2, Math.round(2 + pct * 0.18)) };
    }
  };

  /* Maintenance tickets (seeded once) */
  CC.tickets = {
    all() {
      let t = CC.store.get('tickets', null);
      if (!t) {
        const n = Date.now();
        t = [
          { id: 'CC-1045', cat: 'AC', block: 'BH-2', room: '118', priority: 'Normal', desc: 'AC is not cooling since last night.', createdAt: n - 1 * H, status: 'Pending', stageAt: n - 1 * H, auto: false, history: [{ status: 'Pending', at: n - 1 * H, note: 'Ticket received by hostel maintenance' }] },
          { id: 'CC-1042', cat: 'Wi-Fi', block: 'BH-3', room: '214', priority: 'Urgent', desc: 'Wi-Fi keeps disconnecting every few minutes in the evening.', createdAt: n - 26 * H, status: 'In Progress', stageAt: n - 3 * H, auto: false, history: [{ status: 'Pending', at: n - 26 * H, note: 'Ticket received by hostel maintenance' }, { status: 'In Progress', at: n - 3 * H, note: 'Network technician assigned' }] },
          { id: 'CC-1038', cat: 'Water', block: 'GH-1', room: '305', priority: 'Normal', desc: 'No water supply in the washroom.', createdAt: n - 52 * H, status: 'Resolved', stageAt: n - 40 * H, auto: false, history: [{ status: 'Pending', at: n - 52 * H, note: 'Ticket received by hostel maintenance' }, { status: 'In Progress', at: n - 46 * H, note: 'Plumber assigned' }, { status: 'Resolved', at: n - 40 * H, note: 'Issue fixed & verified' }] }
        ];
        CC.store.set('tickets', t);
      }
      return t;
    },
    save(t) { CC.store.set('tickets', t); }
  };

  /* =====================================================
     5. LAYOUT (header, bottom-nav, footer, SOS button)
  ===================================================== */
  const NAV = [
    { id: 'home', href: 'index.html', label: 'Home', icon: '🏠' },
    { id: 'library', href: 'library.html', label: 'Library', icon: '📚' },
    { id: 'maintenance', href: 'maintenance.html', label: 'Maintenance', short: 'Fix It', icon: '🛠️' },
    { id: 'shuttle', href: 'shuttle.html', label: 'Shuttle', icon: '🚌' },
    { id: 'food', href: 'food.html', label: 'Food Court', short: 'Food', icon: '🍔' },
    { id: 'notices', href: 'notices.html', label: 'Notices', icon: '📢' },
    { id: 'emergency', href: 'emergency.html', label: 'Emergency', icon: '🚨' }
  ];

  function mountLayout() {
    const page = document.body.dataset.page;
    if (page === 'login') return;

    const header = $('#cc-header');
    if (header) header.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3 border-b border-sand-200/70">
        <a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="CampusConnect home">
          <span class="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lift font-display font-bold text-lg">C</span>
          <span class="font-display font-semibold text-lg tracking-tight">Campus<span class="text-brand-600">Connect</span></span>
        </a>
        <nav class="hidden lg:flex items-center gap-1" aria-label="Main">
          ${NAV.map(n => `<a href="${n.href}" class="px-3 py-2 rounded-xl text-sm font-semibold transition ${n.id === page ? 'bg-sand-900 text-white' : 'text-sand-600 hover:bg-sand-100'}">${n.label}</a>`).join('')}
        </nav>
        <div class="flex items-center gap-2">
          <span id="cc-demo-pill" class="hidden text-[10px] font-bold tracking-wider text-brand-700 bg-brand-100 rounded-full px-2 py-1">DEMO</span>
          <span id="cc-clock" class="text-xs font-semibold text-sand-600 bg-sand-100 rounded-full px-3 py-1.5 tabular">--:--</span>
        </div>
      </div>`;

    const bottom = $('#cc-bottom');
    if (bottom) {
      bottom.className = 'lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-sand-200 safe-b';
      bottom.innerHTML = `<div class="grid grid-cols-6 px-1 py-1.5">${NAV.filter(n => n.id !== 'emergency').map(n => `
        <a href="${n.href}" class="flex flex-col items-center gap-0.5 py-1.5 rounded-xl text-[10px] font-semibold ${n.id === page ? 'text-brand-700 bg-brand-50' : 'text-sand-500'}">
          <span class="text-lg leading-none">${n.icon}</span>${n.short || n.label}</a>`).join('')}</div>`;
    }

    const footer = $('#cc-footer');
    if (footer) footer.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 pt-10 pb-28 lg:pb-10">
        <div class="border-t border-sand-200 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p class="font-display text-lg font-semibold">Campus<span class="text-brand-600">Connect</span></p>
            <p class="text-sm text-sand-600 mt-1">Empathy se problem samjhi, technology se solution banaya.</p>
            <p class="text-xs text-sand-500 mt-2">Team Ocean · School of Computer Application, LPU · WebSprint-2026</p>
          </div>
          <label class="flex items-center gap-3 text-xs font-medium text-sand-600 cursor-pointer select-none">
            <span class="relative inline-block w-10 h-6">
              <input id="cc-demo" type="checkbox" class="peer sr-only"/>
              <span class="absolute inset-0 rounded-full bg-sand-300 peer-checked:bg-brand-500 transition"></span>
              <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition peer-checked:translate-x-4"></span>
            </span>
            Demo clock (10:07 AM) for presentations
          </label>
        </div>
      </div>`;

    if (page !== 'emergency') {
      const sos = document.createElement('a');
      sos.id = 'cc-sos'; sos.href = 'emergency.html'; sos.setAttribute('aria-label', 'Emergency SOS');
      sos.className = 'fixed right-4 bottom-20 lg:bottom-6 z-40 w-14 h-14 rounded-full bg-rose-600 text-white grid place-items-center text-2xl shadow-xl hover:bg-rose-700 transition';
      sos.textContent = '🚨';
      document.body.appendChild(sos);
    }

    const toasts = document.createElement('div');
    toasts.id = 'cc-toasts';
    toasts.className = 'fixed top-20 inset-x-0 z-[90] flex flex-col items-center gap-2 pointer-events-none px-4';
    document.body.appendChild(toasts);

    const demo = $('#cc-demo');
    if (demo) { demo.checked = CC.time.isDemo(); demo.addEventListener('change', () => { CC.time.setDemo(demo.checked); location.reload(); }); }
    const tickClock = () => {
      const c = $('#cc-clock'); if (c) c.textContent = CC.fmtClock(CC.time.now());
      const p = $('#cc-demo-pill'); if (p) p.classList.toggle('hidden', !CC.time.isDemo());
    };
    CC.every(tickClock, 1000);
  }

  function initTabs() {
    $$('[data-tabs]').forEach(root => {
      const group = root.dataset.tabs;
      const select = name => {
        $$('[data-tab]', root).forEach(b => { const on = b.dataset.tab === name; b.classList.toggle('active', on); b.setAttribute('aria-selected', on); });
        $$('[data-panel^="' + group + ':"]').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== group + ':' + name));
        root.dispatchEvent(new CustomEvent('tabchange', { detail: name }));
      };
      root._select = select;
      root.addEventListener('click', e => { const b = e.target.closest('[data-tab]'); if (b && root.contains(b)) select(b.dataset.tab); });
      const hash = location.hash.slice(1);
      const first = (hash && $('[data-tab="' + hash + '"]', root)) || $('[data-tab].active', root) || $('[data-tab]', root);
      if (first) select(first.dataset.tab);
    });
  }

  document.addEventListener('click', e => {
    const o = e.target.closest('[data-modal-open]'); if (o) { e.preventDefault(); CC.modal.open(o.dataset.modalOpen); return; }
    const c = e.target.closest('[data-modal-close]'); if (c) { const m = c.closest('.modal'); if (m) CC.modal.close(m.id); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') CC.modal.closeAll(); });

  CC.onReady(() => {
    const form = $('#demo-login-form');
    const guestButton = $('#demo-guest');
    const passwordToggle = $('#password-toggle');
    const password = $('#password');
    const forgotPassword = $('#forgot-password');
    const message = $('#login-message');

    if (form) form.addEventListener('submit', event => {
      event.preventDefault();
      startDemoSession();
    });

    if (guestButton) guestButton.addEventListener('click', startDemoSession);

    if (passwordToggle && password) passwordToggle.addEventListener('click', () => {
      const isVisible = password.type === 'text';
      password.type = isVisible ? 'password' : 'text';
      passwordToggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    });

    if (forgotPassword && message) forgotPassword.addEventListener('click', event => {
      event.preventDefault();
      message.textContent = 'Password recovery is not available in this frontend demo.';
      message.classList.remove('hidden');
    });
  });

  CC.onReady(() => { mountLayout(); initTabs(); CC.reveal(); });
})();
