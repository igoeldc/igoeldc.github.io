/**
 * Shared JS — Lemma Design System
 * Theme toggle, mobile menu, spotlight, epigraph, GSAP scroll
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
    // probability and stochastics
    'def. let Ω denote the space of all possible paths',
    'lemma the probability of the impossible event is zero',
    'prop. a simple symmetric random walk on ℤ² is recurrent',
    'def. a martingale is a fair game in expectation',
    'prop. independent increments need not imply independent paths',
    'thm. expectation is linear, even when independence is absent',
    'cor. zero covariance does not imply independence',
    'prop. recurrence is a property of the path, not a single step',
    'thm. every finite irreducible Markov chain has a unique stationary distribution',
    
    // analysis and topology
    'thm. every continuous function on [a, b] attains its maximum and minimum',
    'lemma every convergent sequence is bounded',
    'prop. differentiability implies continuity',
    'thm. every bounded monotone sequence converges',
    'prop. a continuous image of a compact set is compact',
    'thm. every Cauchy sequence in a complete space converges',
    'def. a set is compact if every open cover has a finite subcover',
    
    // discrete math
    'def. a graph is bipartite iff it has no odd cycles',
    'thm. a tree with n vertices has n - 1 edges',
    'thm. every planar graph can be colored with at most four colors',
    'cor. every nonempty finite poset has a maximal element',
    'def. a matching is a set of pairwise nonincident edges',
    'thm. every connected graph contains a spanning tree',
    'principle if n + 1 objects occupy n boxes, at least one box holds at least two objects',
    'prop. there are infinitely many prime numbers',
    'thm. every prime greater than 3 is congruent to ±1 mod 6',
    
    // optimization
    'def. a convex function lies below its secant lines',
    'prop. every local minimum of a convex function is global',
    'prop. the feasible region of a linear program is convex',
    'def. a feasible point satisfies every constraint',
    'thm. a differentiable convex function lies above every tangent plane',
    'cor. strict convexity permits at most one minimizer',
    'lemma complementary slackness links primal and dual solutions',
    
    // remarks
    'remark: almost surely is not the same as surely',
    'remark: not all that converges is summable',
    'remark: pointwise convergence need not preserve continuity',
    'remark: almost everywhere is not everywhere',
    'remark: local degree constraints shape global structure',
    'remark: duality provides bounds on optimal values',
    'remark: a stationary point need not be a minimum or maximum',
    'remark: measure zero does not mean empty',
    'remark: connected is not the same as path-connected',
    'remark: deterministic does not mean predictable',
    'remark: existence does not imply uniqueness',
    'remark: truth and provability are different notions',
    'remark: straightness depends on the space',
    'remark: dimension counts freedom, not size',
    'remark: finite-dimensional intuition does not always survive',
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

    // 7. Contact/footer reveal
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

  document.querySelectorAll('.timeline-dot').forEach((dot, index, dots) => {
    dot.style.setProperty('--dot-progress', `${index / Math.max(dots.length - 1, 1) * 100}%`);
  });

  // Show timeline scrollbars only while scrolling, without changing layout.
  document.querySelectorAll('.timeline-container, .timeline-items').forEach(scroller => {
    let hideScrollbar;
    scroller.addEventListener('scroll', () => {
      scroller.classList.add('is-scrolling');
      clearTimeout(hideScrollbar);
      hideScrollbar = setTimeout(() => scroller.classList.remove('is-scrolling'), 800);
    }, { passive: true });
  });

  initGSAPScrollAnimations();


});
