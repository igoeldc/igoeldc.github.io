/**
 * Shared JS — Lemma Design System
 * Theme toggle, mobile menu, spotlight, epigraph, GSAP scroll, card tilt
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===========================
  // THEME TOGGLE
  // ===========================
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const htmlElement = document.documentElement;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  function toggleTheme() {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    if (themeToggle) themeToggle.textContent = icon;
    if (mobileThemeToggle) mobileThemeToggle.textContent = icon;
  }

  // ===========================
  // MOBILE MENU (hamburger drawer)
  // ===========================
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // ===========================
  // ACTIVE PAGE HIGHLIGHT
  // ===========================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allPageLinks = document.querySelectorAll('.nav-links a[href], .mobile-pill-link[href]');
  allPageLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active-section');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active-section');
    }
  });

  // ===========================
  // MOUSE-FOLLOWING SPOTLIGHT (desktop only)
  // ===========================
  const glow = document.getElementById('lemGlow');
  const isMobile = window.matchMedia('(max-width: 1024px)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (glow && !isMobile && !prefersReducedMotion) {
    // Start centered off-screen
    glow.style.left = '-350px';
    glow.style.top = '-350px';

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  } else if (glow && isMobile) {
    glow.style.display = 'none';
  }

  // ===========================
  // RANDOM MATH EPIGRAPH
  // ===========================
  const epigraphs = [
    'def. \u2014 let \u03A9 denote the space of all possible paths',
    'axiom \u2014 every continuous function on [a, b] attains its bounds',
    'lemma \u2014 the probability of the impossible event is zero',
    'prop. \u2014 a random walk on \u2124\u00B2 is recurrent',
    'cor. \u2014 the eigenvalues of a symmetric matrix are real',
    'thm \u2014 if \u2207f = 0 everywhere, then f is constant',
    'def. \u2014 a martingale is a fair game in expectation',
    'remark \u2014 not all that converges is summable',
    'postulate \u2014 between any two points there exists a geodesic',
  ];

  const epigraphEl = document.getElementById('lemEpigraph');
  if (epigraphEl) {
    epigraphEl.textContent = epigraphs[Math.floor(Math.random() * epigraphs.length)];
  }

  // ===========================
  // GSAP SCROLL ANIMATIONS
  // ===========================
  const initGSAPScrollAnimations = () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (prefersReducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    // 1. Staggered reveals — lem-cards containers
    const revealGroups = [
      { parent: '.lem-cards', children: '.lem-card' },
      { parent: '.education-container', children: '.lem-card' },
      { parent: '.courses-grid', children: '.lem-card' },
      { parent: '.skills-container', children: '.lem-card' },
    ];

    revealGroups.forEach(({ parent, children }) => {
      document.querySelectorAll(parent).forEach(container => {
        const items = container.querySelectorAll(children);
        if (items.length === 0) return;

        gsap.set(items, { opacity: 0, y: 60 });

        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out'
            });
          }
        });
      });
    });

    // 2. Clip-path text reveal for section headings
    document.querySelectorAll('.lem-section-head h2').forEach(h2 => {
      gsap.set(h2, { clipPath: 'inset(0 100% 0 0)' });

      ScrollTrigger.create({
        trigger: h2,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(h2, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.8,
            ease: 'power3.out'
          });
        }
      });
    });

    // 3. Theorem annotation fade-in (lem-def under headings)
    document.querySelectorAll('.lem-def').forEach(def => {
      gsap.set(def, { opacity: 0, x: -20 });

      ScrollTrigger.create({
        trigger: def,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(def, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.3,
            ease: 'power3.out'
          });
        }
      });
    });

    // 4. Page header reveal (Work + Academics pages)
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      const h1 = pageHeader.querySelector('h1');
      const sub = pageHeader.querySelector('.page-subtitle') || pageHeader.querySelector('.lem-def');
      if (h1) {
        gsap.fromTo(h1,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        );
      }
      if (sub) {
        gsap.fromTo(sub,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
        );
      }
    }

    // 5. About narrative text reveal
    const aboutNarrative = document.querySelector('.about-narrative');
    if (aboutNarrative) {
      const aboutParagraphs = aboutNarrative.querySelectorAll('p');
      if (aboutParagraphs.length > 0) {
        gsap.set(aboutParagraphs, { opacity: 0, y: 40 });
        ScrollTrigger.create({
          trigger: aboutNarrative,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(aboutParagraphs, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: 'power3.out'
            });
          }
        });
      }
    }

    // 6. Timeline (Work page)
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const timelineLine = document.querySelector('.timeline-line');
    const timelineItemsContainer = document.querySelector('.timeline-items');

    if (timelineDots.length > 1 && timelineLine && timelineItemsContainer) {
      const positionLine = () => {
        const containerRect = timelineItemsContainer.getBoundingClientRect();
        const firstDot = timelineDots[0];
        const lastDot = timelineDots[timelineDots.length - 1];
        const firstRect = firstDot.getBoundingClientRect();
        const lastRect = lastDot.getBoundingClientRect();

        const firstCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
        const lastCenterX = lastRect.left + lastRect.width / 2 - containerRect.left;
        const dotCenterY = firstRect.top + firstRect.height / 2 - containerRect.top;

        timelineLine.style.left = `${firstCenterX}px`;
        timelineLine.style.width = `${lastCenterX - firstCenterX}px`;
        timelineLine.style.top = `${dotCenterY}px`;
      };

      positionLine();
      window.addEventListener('resize', positionLine);

      const timelineItems = document.querySelectorAll('.timeline-item');
      gsap.set(timelineItems, { opacity: 0 });
      gsap.set(timelineLine, { opacity: 0 });

      const timelineContainer = document.querySelector('.timeline-container');
      if (timelineContainer) {
        ScrollTrigger.create({
          trigger: timelineContainer,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(timelineLine, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            tl.to(timelineItems, {
              opacity: 1,
              duration: 0.5,
              stagger: 0.12,
              ease: 'power3.out'
            }, '-=0.2');
          }
        });
      }
    }

    // 7. Margin notes stagger fade-in
    const marginNotes = document.querySelectorAll('.lem-margin-note');
    if (marginNotes.length > 0) {
      gsap.set(marginNotes, { opacity: 0, x: 20 });
      gsap.to(marginNotes, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.3,
        delay: 1.5,
        ease: 'power3.out'
      });
    }

    // 8. Contact/footer reveal
    const footer = document.querySelector('#contact');
    if (footer) {
      gsap.set(footer.children, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: footer,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(footer.children, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out'
          });
        }
      });
    }
  };

  initGSAPScrollAnimations();

  // ===========================
  // 3D CARD TILT (desktop only)
  // ===========================
  const initCardTilt = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.lem-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  };

  initCardTilt();

});
