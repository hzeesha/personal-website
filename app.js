const isMobileOrTablet =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 1024;

const particlesConfig = isMobileOrTablet
  ? {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: { enable: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false, speed: 3, size_min: 0.3, sync: false }
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
          speed: 2.5,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 600 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false, mode: "bubble" },
          onclick: { enable: true, mode: "repulse" },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 220, size: 5, duration: 1.2, opacity: 1, speed: 2 },
          repulse: { distance: 180, duration: 0.35 },
          push: { particles_nb: 3 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: false
    }
  : {
      particles: {
        number: { value: 140, density: { enable: true, value_area: 800 } },
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
          speed: 4,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 600 }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "bubble" },
          onclick: { enable: true, mode: "repulse" },
          resize: true
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 250, size: 6, duration: 2, opacity: 1, speed: 3 },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    };

particlesJS("particles-js", particlesConfig);

function getParticlesInstance() {
  return window.pJSDom && window.pJSDom.length ? window.pJSDom[0].pJS : null;
}

function setMousePos(pJS, x, y) {
  const ratio = pJS.tmp && pJS.tmp.retina ? pJS.canvas.pxratio : 1;
  pJS.interactivity.mouse.pos_x = x * ratio;
  pJS.interactivity.mouse.pos_y = y * ratio;
  pJS.interactivity.status = "mousemove";
}

function triggerRepulse(pJS) {
  pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
  pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
  pJS.interactivity.mouse.click_time = new Date().getTime();
  pJS.tmp.repulse_clicking = true;
  pJS.tmp.repulse_count = 0;
  pJS.tmp.repulse_finish = false;
  setTimeout(() => {
    const p2 = getParticlesInstance();
    if (p2) p2.tmp.repulse_clicking = false;
  }, (pJS.interactivity.modes.repulse.duration || 0.4) * 1000);
}

let lastMoveTs = 0;
const moveThrottleMs = 16;

function handleMove(x, y) {
  const now = performance.now ? performance.now() : Date.now();
  if (now - lastMoveTs < moveThrottleMs) return;
  lastMoveTs = now;
  const pJS = getParticlesInstance();
  if (!pJS) return;
  setMousePos(pJS, x, y);
}

if ("PointerEvent" in window) {
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
      handleMove(e.clientX, e.clientY);
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
} else {
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
      handleMove(t.clientX, t.clientY);
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
}