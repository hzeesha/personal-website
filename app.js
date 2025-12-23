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
  return window.pJSDom && window.pJSDom.length && window.pJSDom[0] && window.pJSDom[0].pJS
    ? window.pJSDom[0].pJS
    : null;
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

function triggerRepulse(pJS) {
  const now = Date.now();
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

let rafPending = false;
let latestX = null;
let latestY = null;

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

function attachHandlers() {
  const onPointerDown = (e) => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    setMousePos(pJS, e.clientX, e.clientY);
    triggerRepulse(pJS);
  };

  const onPointerMove = (e) => {
    scheduleMoveUpdate(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    clearMouse(pJS);
  };

  const onTouchStart = (e) => {
    const pJS = getParticlesInstance();
    if (!pJS || !e.touches || !e.touches.length) return;
    const t = e.touches[0];
    setMousePos(pJS, t.clientX, t.clientY);
    triggerRepulse(pJS);
  };

  const onTouchMove = (e) => {
    if (!e.touches || !e.touches.length) return;
    const t = e.touches[0];
    scheduleMoveUpdate(t.clientX, t.clientY);
  };

  const onTouchEnd = () => {
    const pJS = getParticlesInstance();
    if (!pJS) return;
    clearMouse(pJS);
  };

  window.removeEventListener("pointerdown", onPointerDown);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  window.removeEventListener("touchstart", onTouchStart);
  window.removeEventListener("touchmove", onTouchMove);
  window.removeEventListener("touchend", onTouchEnd);

  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
}

window.addEventListener("load", () => {
  setTimeout(attachHandlers, 0);
});

window.addEventListener("pageshow", () => {
  setTimeout(attachHandlers, 0);
});
