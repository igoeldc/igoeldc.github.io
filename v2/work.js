/**
 * Work page script (work.html only)
 * Geometric network canvas — nodes with proximity connections
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('workCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const NODE_COUNT = isMobile ? 20 : 35;
  const NAV_HEIGHT = isMobile ? 0 : 64;
  const CONNECTION_DIST = 150;
  const MOUSE_RADIUS = 200;

  let width, height;
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // Accent colors (saffron → crimson)
  const colors = [
    { r: 255, g: 153, b: 51 },   // saffron
    { r: 230, g: 90, b: 50 },    // mid
    { r: 220, g: 20, b: 60 },    // crimson
  ];

  class Node {
    constructor() {
      this.x = Math.random() * width;
      this.y = NAV_HEIGHT + Math.random() * (height - NAV_HEIGHT);
      this.baseVx = 0.8 * (Math.random() - 0.5) * (1 + Math.random());
      this.baseVy = 0.8 * (Math.random() - 0.5) * (1 + Math.random());
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.radius = 2 + Math.random() * 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      // Mouse attraction (desktop only) — spring-like: pulls toward cursor but damped
      if (!isMobile) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          // Gentle spring force proportional to distance (not inverse)
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.06;
          this.vx += dx / dist * force;
          this.vy += dy / dist * force;
        }
      }

      // Dampen velocity — stronger damping prevents slingshot
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Re-inject base drift so nodes don't stop
      this.vx += this.baseVx * 0.02;
      this.vy += this.baseVy * 0.02;

      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges (top bounded by nav bar height on desktop, 0 on mobile)
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < NAV_HEIGHT || this.y > height) this.vy *= -1;
      this.x = Math.max(0, Math.min(width, this.x));
      this.y = Math.max(NAV_HEIGHT, Math.min(height, this.y));
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.fill();
    }
  }

  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(new Node());
  }

  // Mouse tracking — listen on document since canvas is behind content
  if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }

  function drawConnections() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.35;
          const ci = nodes[i].color;
          const cj = nodes[j].color;

          const gradient = ctx.createLinearGradient(
            nodes[i].x, nodes[i].y,
            nodes[j].x, nodes[j].y
          );
          gradient.addColorStop(0, `rgba(${ci.r}, ${ci.g}, ${ci.b}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${cj.r}, ${cj.g}, ${cj.b}, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (const node of nodes) {
      node.update();
      node.draw();
    }

    requestAnimationFrame(animate);
  }

  // Lazy-start: only animate when canvas is near viewport
  if (typeof IntersectionObserver !== 'undefined') {
    let running = false;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        animate();
      }
    }, { threshold: 0 });
    observer.observe(canvas);
  } else {
    animate();
  }
});
