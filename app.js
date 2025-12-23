// app.js

particlesJS("particles-js", {
  particles: {
    number: { value: 160, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: false }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: true,
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
      // NOTE: size was 0; setting to 6 makes the interaction actually visible
      bubble: { distance: 250, size: 6, duration: 2, opacity: 1, speed: 3 },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});

/* ------------------------------
   Mobile/iPad touch + pointer support
   ------------------------------ */

function getParticlesInstance() {
  return window.pJSDom && window.pJSDom.length ? window.pJSDom[0].pJS : null;
}

function setMousePos(pJS, x, y) {
  const ratio = (pJS.tmp && pJS.tmp.retina) ? pJS.canvas.pxratio : 1;
  pJS.interactivity.mouse.pos_x = x * ratio;
  pJS.interactivity.mouse.pos_y = y * ratio;
  pJS.interactivity.status = "mousemove";
}

function triggerRepulse(pJS) {
  // simulate particles.js click positions so repulse works reliably
  pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
  pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
  pJS.interactivity.mouse.click_time = new Date().getTime();

  // particles.js internal repulse flags
  pJS.tmp.repulse_clicking = true;
  pJS.tmp.repulse_count = 0;
  pJS.tmp.repulse_finish = false;

  setTimeout(() => {
    const p2 = getParticlesInstance();
    if (p2) p2.tmp.repulse_clicking = false;
  }, (pJS.interactivity.modes.repulse.duration || 0.4) * 1000);
}

// Touch events (works on iOS/Android)
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
    const pJS = getParticlesInstance();
    if (!pJS || !e.touches || !e.touches.length) return;

    const t = e.touches[0];
    setMousePos(pJS, t.clientX, t.clientY);
  },
  { passive: true }
);

window.addEventListener(
  "touchend",
  () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;

    pJS.interactivity.mouse.pos_x = null;
    pJS.interactivity.mouse.pos_y = null;
    pJS.interactivity.status = "mouseleave";
  },
  { passive: true }
);

// Pointer events (more reliable on iPadOS + modern browsers)
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
    const pJS = getParticlesInstance();
    if (!pJS) return;

    setMousePos(pJS, e.clientX, e.clientY);
  },
  { passive: true }
);

window.addEventListener(
  "pointerup",
  () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;

    pJS.interactivity.mouse.pos_x = null;
    pJS.interactivity.mouse.pos_y = null;
    pJS.interactivity.status = "mouseleave";
  },
  { passive: true }
);
