(function initCountdown() {
  // Start from 00:12:45:08 and count down
  let totalMs = (0 * 3600 + 12 * 60 + 45) * 1000 + 80;

  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');
  const elMs    = document.getElementById('cd-ms');

  function pad(n, digits = 2) {
    return String(n).padStart(digits, '0');
  }

  function tick() {
    if (totalMs <= 0) {
      totalMs = 0;
      elHours.textContent = '00';
      elMins.textContent  = '00';
      elSecs.textContent  = '00';
      elMs.textContent    = '00';
      return;
    }

    totalMs -= 50;

    const h  = Math.floor(totalMs / 3_600_000);
    const m  = Math.floor((totalMs % 3_600_000) / 60_000);
    const s  = Math.floor((totalMs % 60_000) / 1_000);
    const ms = Math.floor((totalMs % 1_000) / 10);

    elHours.textContent = pad(h);
    elMins.textContent  = pad(m);
    elSecs.textContent  = pad(s);
    elMs.textContent    = pad(ms);
  }

  setInterval(tick, 50);
})();

(function initDescent() {
  let secondsLeft = 140;
  let altitude    = 42.8;
  const elTimer   = document.getElementById('descent-timer');
  const elAlt     = document.getElementById('altitude-display');
  const heatBar   = document.getElementById('heat-bar');
  const heatTemp  = document.getElementById('heat-temp');

  if (!elTimer) return;

  const interval = setInterval(() => {
    if (secondsLeft <= 0) {
      elTimer.textContent = 'TOUCHDOWN — SYSTEMS NOMINAL';
      clearInterval(interval);
      return;
    }

    secondsLeft--;
    altitude = Math.max(0, altitude - 0.306).toFixed(1);

    elTimer.textContent = `Atmospheric Entry: ${secondsLeft} Seconds to Impact`;

    elAlt.innerHTML = `${altitude}<span class="text-lg text-primary ml-1 uppercase">km</span>`;


    const progress = 1 - secondsLeft / 140;
    const barWidth = Math.min(100, 85 + progress * 15);
    heatBar.style.width = `${barWidth.toFixed(0)}%`;

    const peakTemp  = 1950;
    const startTemp = 1650;
    let temp;
    if (progress < 0.6) {
      temp = startTemp + (peakTemp - startTemp) * (progress / 0.6);
    } else {
      temp = peakTemp - (peakTemp - startTemp) * ((progress - 0.6) / 0.4);
    }
    heatTemp.textContent = `${Math.round(temp).toLocaleString()}°C`;
  }, 1_000);
})();

(function initScrollSpy() {
  const sections  = document.querySelectorAll('main section[id]');
  const topLinks  = document.querySelectorAll('nav .nav-link');
  const sideLinks = document.querySelectorAll('aside .side-nav-link');

  const allLinks = [...topLinks, ...sideLinks];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        allLinks.forEach((link) => {
          const href = link.getAttribute('href');
          const isActive = href === `#${id}`;

          // Top nav
          if (link.classList.contains('nav-link')) {
            link.classList.toggle('nav-link--active', isActive);
          }
          // Side nav
          if (link.classList.contains('side-nav-link')) {
            link.classList.toggle('side-nav-link--active', isActive);
          }
        });
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
})();

(function initVolume() {
  const btn = document.getElementById('volume-btn');
  if (!btn) return;

  let muted = false;

  btn.addEventListener('click', () => {
    muted = !muted;
    btn.textContent = muted ? 'volume_off' : 'volume_up';
    btn.style.color  = muted ? '#71717a' : '';
  });
})();

(function initAbort() {
  const btn = document.getElementById('abort-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.textContent = 'ABORT INITIATED ✓';
    btn.style.color = '#ef4444';

    // Shake the HUD panel
    const hud = btn.closest('.hud-scanline');
    if (hud) {
      hud.classList.add('shake');
      hud.addEventListener('animationend', () => hud.classList.remove('shake'), { once: true });
    }

    setTimeout(() => {
      btn.textContent = 'Emergency Abort _';
      btn.style.color = '';
    }, 3_000);
  });
})();

(function initExplore() {
  const btn = document.getElementById('explore-btn');
  if (!btn) return;

  const messages = [
    'SCANNING TERRAIN…',
    'DEPLOYING SENSORS…',
    'MAPPING SURFACE…',
    'EXPLORE SURFACE',
  ];
  let step = 0;
  let running = false;

  btn.addEventListener('click', () => {
    if (running) return;
    running = true;
    step = 0;

    const original = btn.innerHTML;
    const cycle = setInterval(() => {
      btn.innerHTML = messages[step] +
        '<span class="material-symbols-outlined align-middle ml-2 text-primary">travel_explore</span>';
      step++;
      if (step >= messages.length) {
        clearInterval(cycle);
        running = false;
        btn.innerHTML = original;
      }
    }, 700);
  });
})();


(function initColony() {
  const btn = document.getElementById('colony-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    btn.textContent = 'COLONY ESTABLISHED ✓';
    btn.disabled = true;
    btn.style.background = '#16a34a';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.textContent = 'ESTABLISH COLONY';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 3_000);
  });
})();

(function initFAB() {
  const btn    = document.getElementById('fab-btn');
  const scroller = document.getElementById('main-scroll');
  if (!btn || !scroller) return;

  btn.addEventListener('click', () => {
    scroller.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


(function initSolCounter() {
  const el = document.getElementById('sol-counter');
  if (!el) return;

  let sol = 1;

  setInterval(() => {
    sol++;
    el.textContent = `SOL ${String(sol).padStart(3, '0')}`;
  }, 5_000);
})();
