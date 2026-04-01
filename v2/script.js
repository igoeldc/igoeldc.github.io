/**
 * Landing page script (index.html only)
 * Handles hero canvas (Brownian motion) and GSAP hero animations
 * Shared functionality (theme, nav, menu) is in shared.js
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // HERO SECTION - MATH ANIMATIONS
  // ===========================
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Brownian motion paths
  const brownianPaths = [];

  // Brownian motion variance parameters (adjust these to control spread)
  const BM_VARIANCE_BASE = 10;    // Base step size
  const BM_VARIANCE_RANGE = 25;   // Additional random range

  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const BM_SPEED_MULTIPLIER = isMobile ? 0.5 : 1;

  // Box-Muller transform: returns a standard normal sample
  function boxMuller() {
    let u1 = Math.random();
    let u2 = Math.random();
    // Avoid log(0)
    while (u1 === 0) u1 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  // 1D Brownian Motion class (LTR only)
  class BrownianMotion {
    constructor() {
      this.points = [];

      // Starting position — normally distributed around center
      this.startX = 0;
      this.endX = canvas.width;
      const mean = canvas.height / 2;
      const stdDev = canvas.height * 0.15;
      this.y = mean + boxMuller() * stdDev;
      // Clamp to [5%, 95%] of canvas height
      this.y = Math.max(canvas.height * 0.05, Math.min(canvas.height * 0.95, this.y));

      this.currentX = this.startX;
      this.currentStep = 0;
      // Fewer steps = faster completion on mobile
      this.totalSteps = Math.floor((400 + Math.random() * 200) / BM_SPEED_MULTIPLIER);
      this.opacity = 0;
      this.maxOpacity = 0.2 + Math.random() * 0.3;
      this.age = 0;
      this.fadeInDuration = 40;
      this.fadeOutStart = this.totalSteps + 100;
      this.maxAge = this.totalSteps + 200;

      // Brownian motion parameters
      this.stepSize = BM_VARIANCE_BASE + Math.random() * BM_VARIANCE_RANGE;

      // Add initial point
      this.points.push({ x: this.currentX, y: this.y });
    }

    update() {
      this.age++;

      // Fade in
      if (this.age < this.fadeInDuration) {
        this.opacity = (this.age / this.fadeInDuration) * this.maxOpacity;
      } else if (this.age > this.fadeOutStart) {
        // Fade out
        const fadeProgress = (this.age - this.fadeOutStart) / (this.maxAge - this.fadeOutStart);
        this.opacity = this.maxOpacity * (1 - fadeProgress);
      }

      // Generate path if not complete
      if (this.currentStep < this.totalSteps) {
        // Calculate progress (0 to 1)
        const progress = this.currentStep / this.totalSteps;

        // Deterministic x-position (LTR)
        const targetX = this.startX + (this.endX - this.startX) * progress;

        // Regular Brownian motion: random walk in y-direction
        const randomStep = (Math.random() - 0.5) * this.stepSize;
        this.y += randomStep;

        // Keep within reasonable bounds
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

      // LTR gradient
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

  // Add Brownian motion paths periodically to maintain ~25 paths
  setInterval(() => {
    if (brownianPaths.length < 25) {
      brownianPaths.push(new BrownianMotion());
    }
  }, 400);

  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw Brownian paths
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
  // GSAP HERO TEXT ANIMATION
  // ===========================
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const heroWords = document.querySelectorAll('.hero-word');
    const heroRole = document.querySelector('.hero-role');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // If reduced motion, show everything immediately and skip animations
    if (reducedMotion) {
      heroWords.forEach(w => { w.style.opacity = '1'; w.style.transform = 'none'; });
      if (heroSubtitle) { heroSubtitle.style.opacity = '1'; heroSubtitle.style.transform = 'none'; }
      if (heroRole) { heroRole.style.opacity = '1'; heroRole.textContent = 'Mathematician'; }
      return;
    }

    // Staggered word reveal for "Hello, I'm Ishaan"
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl.fromTo(heroWords,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, delay: 0.3 }
    );

    // Subtitle reveal
    introTl.fromTo(heroSubtitle,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    );

    // Role cycling with crossfade
    const roles = ['Mathematician', 'Problem Solver', 'Researcher', 'Linguist'];
    let roleIndex = 0;

    const showRole = () => {
      if (!heroRole) return;
      heroRole.textContent = roles[roleIndex];

      gsap.fromTo(heroRole,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => {
            gsap.to(heroRole, {
              opacity: 0, y: -20,
              duration: 0.4,
              delay: 2,
              ease: 'power2.in',
              onComplete: () => {
                roleIndex = (roleIndex + 1) % roles.length;
                showRole();
              }
            });
          }
        }
      );
    };

    // Start role cycling after intro finishes
    introTl.call(showRole);

    // ===========================
    // HERO SCROLL PIN + PARALLAX FADE
    // ===========================
    const heroEl = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (heroEl && heroContent) {
      // Wait for intro animation to finish before enabling scroll-driven fade
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
          // Text fades out and moves up faster (parallax)
          gsap.set(heroContent, {
            opacity: 1 - progress * 1.5,
            y: -progress * 120
          });
        }
      });
    }
  }

});
