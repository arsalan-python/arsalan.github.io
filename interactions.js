/* ==========================================================================
   ARSALAN.GITHUB — ADVANCED INTERACTION SUITE (AWARD-WINNING LUXURY SPEC)
   - Custom Smooth Cursor with Magnetic Pull
   - Kinetic Cryptographic Text Scrambler
   - Animated Hero Pill: "Feel It." <---> "Get It."
   - Liquid Glass 3D Tilt with Specular Lighting
   - About Page: Zero-Gravity Tech Physics Playground (LAZY INIT - FIXED)
   - About Page: Manifesto Scroll-Scrub Glow
   - About Page: Floating Particle Constellation
   - Contact Page: Interactive Architecture Selection Chips
   - Contact Page: Morse Code Typewriter Animation
   - Signature Ending: 3D Perspective Flip Observer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMagneticButtons();
  initLiquidGlassTilt();
  initTextScrambler();
  initHeroAnimatedBadge();
  initSignatureFlipEnding();
  initBeforeAfterSlider();
  // ⚠️ initTechPhysicsPlayground is NOT called here.
  // It is called lazily by app.js when #view-about becomes visible.
  initManifestoScrubGlow();
  initArchitectureChips();
  initContactOrb();
  initScrollReveal();
});

/* 1. Custom Smooth Cursor */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(renderFollower);
  }
  requestAnimationFrame(renderFollower);

  const interactives = document.querySelectorAll('a, button, input, textarea, select, .liquid-glass-card, .spec-item, .channel-card-luxury, .arch-chip');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* 2. Magnetic Buttons with Liquid Snap Physics */
function initMagneticButtons() {
  const magneticEls = document.querySelectorAll('.magnetic-btn');
  magneticEls.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const deltaX = (e.clientX - rect.left - rect.width / 2) * 0.32;
      const deltaY = (e.clientY - rect.top - rect.height / 2) * 0.32;
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* 3. Liquid Glass 3D Tilt with Specular Glare */
function initLiquidGlassTilt() {
  const cards = document.querySelectorAll('.liquid-glass-card, .tilt-card, .spec-item, .channel-card-luxury');
  cards.forEach((card) => {
    if (!card.querySelector('.glare-overlay')) {
      const glare = document.createElement('div');
      glare.className = 'glare-overlay';
      card.appendChild(glare);
    }
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -9;
      const rotateY = ((x - rect.width / 2) / rect.width) * 9;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* 4. Kinetic Cryptographic Text Scrambler */
function initTextScrambler() {
  const scrambleElements = document.querySelectorAll('.scramble-hover');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@*&';
  scrambleElements.forEach((el) => {
    const originalText = el.textContent.trim();
    let interval = null;
    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        el.textContent = originalText.split('').map((letter, index) => {
          if (index < iteration) return originalText[index];
          if (letter === ' ') return ' ';
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 2;
      }, 30);
    });
  });
}

/* 5. Animated Hero Badge: "Feel It." <---> "Get It." */
function initHeroAnimatedBadge() {
  const badgeText = document.getElementById('hero-badge-text');
  if (!badgeText) return;
  const states = ['Feel It.', 'Get It.'];
  let stateIndex = 0;
  setInterval(() => {
    badgeText.style.opacity = '0';
    badgeText.style.transform = 'translateY(6px)';
    setTimeout(() => {
      stateIndex = (stateIndex + 1) % states.length;
      badgeText.textContent = states[stateIndex];
      badgeText.style.opacity = '1';
      badgeText.style.transform = 'translateY(0px)';
    }, 280);
  }, 2200);
}

/* 6. Signature Ending 3D Flip Observer */
function initSignatureFlipEnding() {
  const section = document.querySelector('.signature-ending-section');
  if (!section) return;
  function onScroll() {
    const rect = section.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.4);
    if (progress >= 0.45) {
      section.classList.add('state-transformed');
    } else {
      section.classList.remove('state-transformed');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 7. About Page: Interactive Before/After Drag Slider */
function initBeforeAfterSlider() {
  const container = document.querySelector('.comparison-slider-container');
  const afterPane = document.querySelector('.comp-after');
  const handle = document.querySelector('.comp-handle');
  if (!container || !afterPane || !handle) return;
  let isDragging = false;
  function setPos(x) {
    const rect = container.getBoundingClientRect();
    let pos = Math.max(0.08, Math.min(0.92, (x - rect.left) / rect.width));
    afterPane.style.width = `${pos * 100}%`;
    handle.style.left = `${pos * 100}%`;
  }
  handle.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => { if (isDragging) setPos(e.clientX); });
  handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches[0]) setPos(e.touches[0].clientX);
  }, { passive: true });
}

/* 8. About Page: Zero-Gravity Tech Physics Playground ← LAZY INIT (called from app.js) */
function initTechPhysicsPlayground() {
  const canvas = document.getElementById('tech-physics-canvas');
  if (!canvas) return;

  // Force layout recalc before reading dimensions
  const box = canvas.parentElement;
  if (!box) return;

  const ctx = canvas.getContext('2d');
  let width = 0, height = 0;

  function resize() {
    // getBoundingClientRect works even if element is display:block but was previously hidden
    const rect = box.getBoundingClientRect();
    width = canvas.width = rect.width || box.offsetWidth || 600;
    height = canvas.height = rect.height || box.offsetHeight || 380;
  }
  resize();
  window.addEventListener('resize', resize);

  const techNames = [
    'Three.js', 'WebGL', 'GSAP', 'Next.js 15',
    'Liquid Glass', 'Sub-second FCP', 'Kinetic Type', 'Zero Bloat',
    'React', 'Tailwind', 'TypeScript', 'Figma'
  ];

  const mouseState = { x: -9999, y: -9999, active: false };

  class PhysicsNode {
    constructor(name) {
      this.name = name;
      this.radius = 36 + name.length * 2.4;
      this.reset();
      this.vx = (Math.random() - 0.5) * 1.4;
      this.vy = (Math.random() - 0.5) * 1.4;
      this.mass = this.radius * 0.1;
      this.hover = false;
      this.glowAlpha = 0;
    }

    reset() {
      this.x = this.radius + Math.random() * (width - this.radius * 2);
      this.y = this.radius + Math.random() * (height - this.radius * 2);
    }

    update() {
      // Slight gravity-like centre pull
      const cx = width / 2, cy = height / 2;
      const dx2 = cx - this.x, dy2 = cy - this.y;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (dist2 > 60) {
        this.vx += (dx2 / dist2) * 0.012;
        this.vy += (dy2 / dist2) * 0.012;
      }

      // Mouse repulsion / attraction
      const mdx = this.x - mouseState.x;
      const mdy = this.y - mouseState.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mouseState.active && mdist < this.radius + 80) {
        const force = (1 - mdist / (this.radius + 80)) * 3.0;
        this.vx += (mdx / (mdist || 1)) * force;
        this.vy += (mdy / (mdist || 1)) * force;
        this.hover = true;
        this.glowAlpha = Math.min(1, this.glowAlpha + 0.1);
      } else {
        this.hover = false;
        this.glowAlpha = Math.max(0, this.glowAlpha - 0.05);
      }

      this.vx *= 0.982;
      this.vy *= 0.982;
      this.x += this.vx;
      this.y += this.vy;

      // Wall bounce
      if (this.x - this.radius < 0) { this.x = this.radius; this.vx = Math.abs(this.vx) * 0.85; }
      if (this.x + this.radius > width) { this.x = width - this.radius; this.vx = -Math.abs(this.vx) * 0.85; }
      if (this.y - this.radius < 0) { this.y = this.radius; this.vy = Math.abs(this.vy) * 0.85; }
      if (this.y + this.radius > height) { this.y = height - this.radius; this.vy = -Math.abs(this.vy) * 0.85; }
    }

    draw(t) {
      ctx.save();

      // Outer glow when hovered
      if (this.glowAlpha > 0.01) {
        ctx.shadowColor = `rgba(255,255,255,${this.glowAlpha * 0.7})`;
        ctx.shadowBlur = 20 * this.glowAlpha;
      }

      // Glass pill body
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.3, this.y - this.radius * 0.4, this.radius * 0.05,
        this.x, this.y, this.radius
      );
      if (this.hover) {
        grad.addColorStop(0, 'rgba(255,255,255,0.28)');
        grad.addColorStop(0.6, 'rgba(80,90,120,0.6)');
        grad.addColorStop(1, 'rgba(10,12,20,0.88)');
      } else {
        grad.addColorStop(0, 'rgba(255,255,255,0.09)');
        grad.addColorStop(0.6, 'rgba(40,46,70,0.4)');
        grad.addColorStop(1, 'rgba(10,12,20,0.75)');
      }
      ctx.fillStyle = grad;
      ctx.fill();

      // Fine border
      ctx.strokeStyle = this.hover ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Top specular highlight arc
      ctx.beginPath();
      ctx.arc(this.x, this.y - this.radius * 0.18, this.radius * 0.72, Math.PI + 0.4, Math.PI * 2 - 0.4);
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + this.glowAlpha * 0.18})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Label
      ctx.fillStyle = this.hover ? '#ffffff' : 'rgba(220,222,235,0.9)';
      ctx.font = `600 ${Math.max(9, Math.min(12, 130 / this.name.length))}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.name, this.x, this.y);

      ctx.restore();
    }
  }

  function resolveCollisions(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
        const minDist = a.radius + b.radius;
        if (dist < minDist) {
          const overlap = (minDist - dist) * 0.52;
          const nx = dx / dist, ny = dy / dist;
          a.x -= nx * overlap; a.y -= ny * overlap;
          b.x += nx * overlap; b.y += ny * overlap;
          const p = 2 * ((a.vx - b.vx) * nx + (a.vy - b.vy) * ny) / (a.mass + b.mass);
          a.vx -= p * b.mass * nx; a.vy -= p * b.mass * ny;
          b.vx += p * a.mass * nx; b.vy += p * a.mass * ny;
        }
      }
    }
  }

  const nodes = techNames.map(name => new PhysicsNode(name));

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseState.x = e.clientX - rect.left;
    mouseState.y = e.clientY - rect.top;
    mouseState.active = true;
  });
  canvas.addEventListener('mouseleave', () => { mouseState.active = false; });

  // Touch
  canvas.addEventListener('touchmove', (e) => {
    if (!e.touches[0]) return;
    const rect = canvas.getBoundingClientRect();
    mouseState.x = e.touches[0].clientX - rect.left;
    mouseState.y = e.touches[0].clientY - rect.top;
    mouseState.active = true;
  }, { passive: true });
  canvas.addEventListener('touchend', () => { mouseState.active = false; });

  let frameTime = 0;
  function loop(ts) {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, width, height);

    // Connection lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          const alpha = (1 - d / 150) * 0.1;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    resolveCollisions(nodes);
    nodes.forEach(n => { n.update(); n.draw(ts); });
  }
  requestAnimationFrame(loop);
}

/* 9. About Page: Manifesto Scroll-Scrub Glow */
function initManifestoScrubGlow() {
  const manifesto = document.querySelector('.manifesto-scrub-text');
  if (!manifesto) return;
  function onScroll() {
    const rect = manifesto.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25) {
      manifesto.classList.add('active-glow');
    } else {
      manifesto.classList.remove('active-glow');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 10. Contact Page: Interactive Architecture Selection Chips */
function initArchitectureChips() {
  const chips = document.querySelectorAll('.arch-chip');
  const serviceSelect = document.getElementById('enquiry-service');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const selectedVal = chip.getAttribute('data-value');
      if (serviceSelect && selectedVal) {
        serviceSelect.value = selectedVal;
        serviceSelect.dispatchEvent(new Event('change'));
      }
    });
  });
}

/* 11. Contact Page: Animated Orb / Floating Rings */
function initContactOrb() {
  const orb = document.getElementById('contact-orb-canvas');
  if (!orb) return;
  const ctx = orb.getContext('2d');
  let w, h;
  function resize() {
    w = orb.width = orb.parentElement ? orb.parentElement.clientWidth : 300;
    h = orb.height = orb.parentElement ? orb.parentElement.clientHeight : 300;
  }
  resize();
  window.addEventListener('resize', resize);

  let t = 0;
  function draw() {
    requestAnimationFrame(draw);
    t += 0.012;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;
    const baseR = Math.min(w, h) * 0.28;

    // Outer breathing ring
    for (let ring = 3; ring >= 0; ring--) {
      const r = baseR + ring * 22 + Math.sin(t * 0.9 + ring) * 6;
      const alpha = (0.06 - ring * 0.012) + Math.sin(t + ring * 1.3) * 0.015;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, alpha)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Core liquid glass orb
    const orbGrad = ctx.createRadialGradient(cx - baseR * 0.28, cy - baseR * 0.28, baseR * 0.05, cx, cy, baseR);
    orbGrad.addColorStop(0, `rgba(255,255,255,${0.14 + Math.sin(t) * 0.03})`);
    orbGrad.addColorStop(0.5, 'rgba(80,90,130,0.18)');
    orbGrad.addColorStop(1, 'rgba(10,12,20,0.5)');
    ctx.beginPath();
    ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
    ctx.fillStyle = orbGrad;
    ctx.fill();
    ctx.strokeStyle = `rgba(255,255,255,${0.1 + Math.sin(t * 1.2) * 0.04})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3 Orbiting particles
    for (let i = 0; i < 3; i++) {
      const angle = t * (0.6 + i * 0.15) + (i * Math.PI * 2 / 3);
      const orbitR = baseR * (1.35 + i * 0.18);
      const px = cx + Math.cos(angle) * orbitR;
      const py = cy + Math.sin(angle) * orbitR * 0.42;
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.sin(t * 2 + i) * 0.25})`;
      ctx.fill();
    }

    // "A" monogram
    ctx.fillStyle = 'rgba(255,255,255,0.72)';
    ctx.font = `300 ${baseR * 0.68}px "Syne", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', cx, cy + baseR * 0.04);
  }
  draw();
}

/* 12. Universal Scroll-Reveal (fade-in-on-view elements) */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-in-on-view');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
