/**
 * Main script for the portfolio website
 * Handles theme toggle, math animations, menu, and typewriter effect
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // THEME TOGGLE
  // ===========================
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // ===========================
  // HERO SECTION - MATH ANIMATIONS
  // ===========================
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Math symbols to float
  const mathSymbols = [
    // Original symbols
    '∫', '∑', 'π', '∞', '∂', 'λ', 'α', 'β', 'γ', 'δ', 'θ', 'μ', 'σ', 'φ', 'ω', '√', '∇', '≈', '≡', '∈', '∪', '∩', '⊂', '∀', '∃', 'ℝ', 'ℂ', 'ℕ', 'ℤ',
    // Tier 1: Greek letters & common operators
    'ε', 'ρ', 'τ', 'Δ', 'Σ', 'Π', 'Λ', '⊗', '⊕', '≤', '≥', '≠', '∅', '⇒', 'ℚ',
    // Tier 2: Additional Greek & special symbols
    'ξ', 'ψ', 'Ω', 'Γ', 'ζ', '∝', '⊆', '∬', '∮', 'ℵ',
    // Tier 3: Advanced symbols (excluding ℏ)
    'κ', 'η', '±', '∧', '∨', '¬', '⇔'
  ];

  // Floating symbols array
  const floatingSymbols = [];

  // Brownian motion paths
  const brownianPaths = [];

  // Brownian motion variance parameters (adjust these to control spread)
  const BM_VARIANCE_BASE = 10;    // Base step size
  const BM_VARIANCE_RANGE = 25;   // Additional random range

  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const BM_SPEED_MULTIPLIER = isMobile ? 0.5 : 1; // Faster on mobile (fewer steps = faster completion)

  // Symbol class
  class FloatingSymbol {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 50;
      this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      this.speed = 0.3 + Math.random() * 0.5;
      this.opacity = 0;
      this.rotation = 0;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.size = 20 + Math.random() * 20;
      this.maxOpacity = 0.3 + Math.random() * 0.3;
    }

    update() {
      this.y -= this.speed;
      this.rotation += this.rotationSpeed;

      // Fade in
      if (this.y > canvas.height - 200 && this.opacity < this.maxOpacity) {
        this.opacity += 0.01;
      }
      // Fade out
      if (this.y < 100) {
        this.opacity -= 0.01;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.font = `${this.size}px "Times New Roman", serif`;
      ctx.fillStyle = `rgba(255, 153, 51, ${this.opacity})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.symbol, 0, 0);
      ctx.restore();
    }

    isDead() {
      return this.y < -50 || this.opacity <= 0;
    }
  }

  // 1D Brownian Motion class (LTR only)
  class BrownianMotion {
    constructor() {
      this.points = [];

      // Starting position - center of screen
      this.startX = 0;
      this.endX = canvas.width;
      this.y = canvas.height / 2; // Start at center

      this.currentX = this.startX;
      this.currentStep = 0;
      // Fewer steps = faster completion on mobile
      this.totalSteps = Math.floor((400 + Math.random() * 200) / BM_SPEED_MULTIPLIER);
      this.opacity = 0;
      this.maxOpacity = 0.2 + Math.random() * 0.3; // Variable opacity (lower for cloud effect)
      this.age = 0;
      this.fadeInDuration = 40;
      this.fadeOutStart = this.totalSteps + 100;
      this.maxAge = this.totalSteps + 200;

      // Brownian motion parameters
      this.stepSize = BM_VARIANCE_BASE + Math.random() * BM_VARIANCE_RANGE; // Random step size for variation

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

  // Add floating symbols periodically
  setInterval(() => {
    if (floatingSymbols.length < 15) {
      floatingSymbols.push(new FloatingSymbol());
    }
  }, 800);

  // Add Brownian motion paths periodically to maintain ~25 paths
  setInterval(() => {
    if (brownianPaths.length < 25) {
      brownianPaths.push(new BrownianMotion());
    }
  }, 400); // Faster generation to maintain steady count

  // Initial cloud of Brownian motion paths
  // for (let i = 0; i < 25; i++) {
  //   brownianPaths.push(new BrownianMotion());
  // }

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

    // Update and draw floating symbols
    for (let i = floatingSymbols.length - 1; i >= 0; i--) {
      floatingSymbols[i].update();
      floatingSymbols[i].draw();

      if (floatingSymbols[i].isDead()) {
        floatingSymbols.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // ===========================
  // TYPEWRITER EFFECT
  // ===========================
  const initTyped = () => {
    const typewriterElement = document.querySelector('#typewriter');
    if (window.Typed && typewriterElement) {
      new Typed('#typewriter', {
        strings: [
          "Hello, I'm Ishaan",
          "I'm a Mathematician",
          "I'm a Problem Solver",
          "I'm a Researcher",
          "I'm a Linguist"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 75,
        showCursor: true,
        cursorChar: '_',
      });
    }
  };

  // ===========================
  // MOBILE MENU & ACTIVE SECTIONS
  // ===========================
  const initMenu = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (menuIcon && menu) {
      menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        menu.classList.toggle('active');
      });

      // Close menu when clicking a link
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          menuIcon.classList.remove('active');
          menu.classList.remove('active');
        });
      });

      // Close menu when clicking backdrop
      menu.addEventListener('click', (e) => {
        if (e.target === menu) {
          menuIcon.classList.remove('active');
          menu.classList.remove('active');
        }
      });

      // Close menu with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
          menuIcon.classList.remove('active');
          menu.classList.remove('active');
        }
      });
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section, header, footer');
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-80px 0px -60%'
    };

    let currentActiveSection = null;

    const sectionObserver = new IntersectionObserver((entries) => {
      // Find all currently intersecting sections
      const intersectingSections = entries.filter(entry => entry.isIntersecting);

      if (intersectingSections.length > 0) {
        // Get the most visible section (highest intersection ratio)
        const mostVisible = intersectingSections.reduce((prev, current) => {
          return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
        });

        const id = mostVisible.target.id;

        // Only update if the active section has changed
        if (currentActiveSection !== id) {
          currentActiveSection = id;

          // Remove active from all links
          navLinks.forEach(link => link.classList.remove('active-section'));

          // Add active to the most visible section's link
          const correspondingLink = document.querySelector(`.menu a[href="#${id}"]`);
          if (correspondingLink) {
            correspondingLink.classList.add('active-section');
          }
        }
      }
    }, observerOptions);

    sections.forEach(section => {
      if (section.id) {
        sectionObserver.observe(section);
      }
    });
  };

  // ===========================
  // SCROLL ANIMATIONS (Lightweight)
  // ===========================
  const initScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe sections and cards
    const elementsToAnimate = document.querySelectorAll('.project-item, .course-category, .info-box, .skill-category-card, .timeline-item');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  };

  // Add fade-in class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ===========================
  // BACK TO TOP BUTTON
  // ===========================
  const initBackToTop = () => {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    // Scroll to top on click
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // ===========================
  // INITIALIZE ALL
  // ===========================
  initTyped();
  initMenu();
  initScrollAnimations();
  initBackToTop();
});