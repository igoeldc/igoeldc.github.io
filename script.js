/**
 * Landing page script — Lemma
 * Hero canvas (Brownian motion) + GSAP hero animations
 */

document.addEventListener('DOMContentLoaded', () => {

  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Brownian motion paths
  const brownianPaths = [];
  const BM_VARIANCE_BASE = 10;
  const BM_VARIANCE_RANGE = 25;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const BM_SPEED_MULTIPLIER = isMobile ? 0.5 : 1;

  // Box-Muller transform
  function boxMuller() {
    let u1 = Math.random();
    let u2 = Math.random();
    while (u1 === 0) u1 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  class BrownianMotion {
    constructor() {
      this.points = [];
      this.startX = 0;
      this.endX = canvas.width;
      const mean = canvas.height / 2;
      const stdDev = canvas.height * 0.15;
      this.y = mean + boxMuller() * stdDev;
      this.y = Math.max(canvas.height * 0.05, Math.min(canvas.height * 0.95, this.y));

      this.currentX = this.startX;
      this.currentStep = 0;
      this.totalSteps = Math.floor((400 + Math.random() * 200) / BM_SPEED_MULTIPLIER);
      this.opacity = 0;
      this.maxOpacity = 0.2 + Math.random() * 0.3;
      this.age = 0;
      this.fadeInDuration = 40;
      this.fadeOutStart = this.totalSteps + 100;
      this.maxAge = this.totalSteps + 200;
      this.stepSize = BM_VARIANCE_BASE + Math.random() * BM_VARIANCE_RANGE;
      this.points.push({ x: this.currentX, y: this.y });
    }

    update() {
      this.age++;

      if (this.age < this.fadeInDuration) {
        this.opacity = (this.age / this.fadeInDuration) * this.maxOpacity;
      } else if (this.age > this.fadeOutStart) {
        const fadeProgress = (this.age - this.fadeOutStart) / (this.maxAge - this.fadeOutStart);
        this.opacity = this.maxOpacity * (1 - fadeProgress);
      }

      if (this.currentStep < this.totalSteps) {
        const progress = this.currentStep / this.totalSteps;
        const targetX = this.startX + (this.endX - this.startX) * progress;
        const randomStep = (Math.random() - 0.5) * this.stepSize;
        this.y += randomStep;
        this.y = Math.max(canvas.height * 0.1, Math.min(canvas.height * 0.9, this.y));
        this.currentX = targetX;
        this.points.push({ x: this.currentX, y: this.y });
        this.currentStep++;
      }
    }

    draw() {
      if (this.points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      const gradient = ctx.createLinearGradient(
        this.startX, canvas.height / 2,
        this.endX, canvas.height / 2
      );
      gradient.addColorStop(0, `rgba(255, 153, 51, ${this.opacity})`);
      gradient.addColorStop(1, `rgba(220, 20, 60, ${this.opacity})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    isDead() {
      return this.opacity <= 0 && this.age > this.maxAge;
    }
  }

  setInterval(() => {
    if (brownianPaths.length < 25) {
      brownianPaths.push(new BrownianMotion());
    }
  }, 400);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = brownianPaths.length - 1; i >= 0; i--) {
      brownianPaths[i].update();
      brownianPaths[i].draw();
      if (brownianPaths[i].isDead()) {
        brownianPaths.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  if (!prefersReducedMotion) animate();

  // ===========================
  // GSAP HERO ANIMATION
  // ===========================
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroEpigraph = document.querySelector('.lem-epigraph');
    const heroCoord = document.querySelector('.hero-coord');

    if (reducedMotion) {
      if (heroTitle) { heroTitle.style.opacity = '1'; heroTitle.style.transform = 'none'; }
      if (heroSubtitle) { heroSubtitle.style.opacity = '1'; heroSubtitle.style.transform = 'none'; }
      if (heroEpigraph) { heroEpigraph.style.opacity = '1'; }
      if (heroCoord) { heroCoord.style.opacity = '1'; }
      return;
    }

    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Epigraph fade in
    if (heroEpigraph) {
      introTl.fromTo(heroEpigraph,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.2 }
      );
    }

    // Title reveal
    if (heroTitle) {
      introTl.fromTo(heroTitle,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.2'
      );
    }

    // Subtitle reveal
    if (heroSubtitle) {
      introTl.fromTo(heroSubtitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );
    }

    // Coordinate block fade in
    if (heroCoord) {
      introTl.fromTo(heroCoord,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.3'
      );
    }

    // ===========================
    // HERO SCROLL PIN + PARALLAX FADE
    // ===========================
    const heroEl = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (heroEl && heroContent) {
      let scrollEnabled = false;
      introTl.then(() => { scrollEnabled = true; });

      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: '+=50%',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!scrollEnabled) return;
          const progress = self.progress;
          gsap.set(heroContent, {
            opacity: 1 - progress * 1.5,
            y: -progress * 120
          });
        }
      });
    }
  }

});
