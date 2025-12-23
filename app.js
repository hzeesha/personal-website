particlesJS("particles-js", {
  particles: {
    number: { value: 120, density: { enable: true, value_area: 900 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: { value: 0.9, random: true, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: { enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 }
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: { enable: true, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 200, size: 4, duration: 0.35, opacity: 1, speed: 3 },
      repulse: { distance: 220, duration: 0.35 },
      push: { particles_nb: 3 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

function getParticlesInstance() {
  return window.pJSDom && window.pJSDom.length ? window.pJSDom[0].pJS : null;
}

function setMousePos(pJS, x, y) {
  const ratio = pJS.tmp && pJS.tmp.retina ? pJS.canvas.pxratio : 1;
  pJS.interactivity.mouse.pos_x = x * ratio;
  pJS.interactivity.mouse.pos_y = y * ratio;
  pJS.interactivity.status = "mousemove";
}

function clearMouse(pJS) {
  pJS.interactivity.mouse.pos_x = null;
  pJS.interactivity.mouse.pos_y = null;
  pJS.interactivity.status = "mouseleave";
}

let rafPending = false;
let latestX = null;
let latestY = null;
let lastRepulseAt = 0;
const REPULSE_COOLDOWN_MS = 220;

function scheduleMoveUpdate(x, y) {
  latestX = x;
  latestY = y;
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    const pJS = getParticlesInstance();
    if (!pJS || latestX == null || latestY == null) return;
    setMousePos(pJS, latestX, latestY);
  });
}

function triggerRepulse(pJS) {
  const now = Date.now();
  if (now - lastRepulseAt < REPULSE_COOLDOWN_MS) return;
  lastRepulseAt = now;

  pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
  pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
  pJS.interactivity.mouse.click_time = now;

  pJS.tmp.repulse_clicking = true;
  pJS.tmp.repulse_count = 0;
  pJS.tmp.repulse_finish = false;

  setTimeout(() => {
    const p2 = getParticlesInstance();
    if (p2) p2.tmp.repulse_clicking = false;
  }, (pJS.interactivity.modes.repulse.duration || 0.35) * 1000);
}

window.addEventListener(
  "pointerdown",
  (e) => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    setMousePos(pJS, e.clientX, e.clientY);
    triggerRepulse(pJS);
  },
  { passive: true }
);

window.addEventListener(
  "pointermove",
  (e) => {
    scheduleMoveUpdate(e.clientX, e.clientY);
  },
  { passive: true }
);

window.addEventListener(
  "pointerup",
  () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    clearMouse(pJS);
  },
  { passive: true }
);

window.addEventListener(
  "touchstart",
  (e) => {
    const pJS = getParticlesInstance();
    if (!pJS || !e.touches || !e.touches.length) return;
    const t = e.touches[0];
    setMousePos(pJS, t.clientX, t.clientY);
    triggerRepulse(pJS);
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (e) => {
    if (!e.touches || !e.touches.length) return;
    const t = e.touches[0];
    scheduleMoveUpdate(t.clientX, t.clientY);
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    clearMouse(pJS);
  },
  { passive: true }
);

window.addEventListener(
  "click",
  (e) => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    setMousePos(pJS, e.clientX, e.clientY);
    triggerRepulse(pJS);
  },
  { passive: true }
);
